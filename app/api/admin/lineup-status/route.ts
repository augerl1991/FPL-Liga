import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  // Aktive Saison
  const season = await prisma.season.findFirst({ where: { active: true } });
  if (!season) return NextResponse.json({ error: "Keine aktive Saison" }, { status: 404 });

  // Alle Spieltage der Saison
  const gameweeks = await prisma.gameweek.findMany({
    where: { seasonId: season.id },
    orderBy: { number: "asc" },
    select: { id: true, number: true },
  });

  // Aktuellen Spieltag bestimmen: höchster GW mit mind. einem gespielten Match
  // Fallback: GW 1
  const lastPlayedMatch = await prisma.match.findFirst({
    where: { seasonId: season.id, played: true },
    orderBy: { gameweek: { number: "desc" } },
    include: { gameweek: { select: { id: true, number: true } } },
  });
  const currentGw = lastPlayedMatch?.gameweek ?? gameweeks[0] ?? null;

  // Alle Teams (ohne Admin)
  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    orderBy: { sortOrder: "asc" },
    include: { user: { select: { username: true } } },
  });

  // Alle Lineups auf einmal laden
  const allLineups = await prisma.lineup.findMany({
    where: { teamId: { in: teams.map((t) => t.id) } },
    include: { gameweek: { select: { number: true } } },
    orderBy: { gameweek: { number: "asc" } },
  });

  // Pro Team aufbereiten
  const result = teams.map((team) => {
    const teamLineups = allLineups.filter((l) => l.teamId === team.id);
    const currentLineup = currentGw
      ? teamLineups.find((l) => l.gameweekId === currentGw.id)
      : null;

    // Historische Einreichungen pro GW
    const history = gameweeks.map((gw) => {
      const l = teamLineups.find((tl) => tl.gameweekId === gw.id);
      return { gwNumber: gw.number, submitted: !!l, submittedAt: l?.submittedAt ?? null };
    });

    return {
      teamId: team.id,
      teamName: team.name,
      username: team.user.username,
      currentGw: currentGw
        ? {
            number: currentGw.number,
            submitted: !!currentLineup,
            submittedAt: currentLineup?.submittedAt ?? null,
          }
        : null,
      totalSubmitted: teamLineups.length,
      totalGameweeks: gameweeks.length,
      history,
    };
  });

  return NextResponse.json({ currentGwNumber: currentGw?.number ?? null, teams: result });
}
