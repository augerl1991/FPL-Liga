import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchGameweekPoints } from "@/lib/fpl-api";
import { pointsToGoals } from "@/lib/scoring";

/**
 * Mergt Punkte eines Nachtragsspiels in den richtigen Liga-Spieltag.
 *
 * Body:
 *   ligaGwNumber   – Unsere Spieltagnummer, die aufgefüllt wird (z.B. 31)
 *   fplGwNumber    – Der FPL-Spieltag, in dem die Nachtragspartie gelaufen ist (z.B. 36)
 *   plTeams        – Array der PL-Teamnamen (exakt wie in FplPlayer.teamName), z.B. ["Arsenal","Chelsea"]
 *
 * Was passiert:
 *   1. FPL-Punkte für fplGwNumber holen
 *   2. Nur Spieler, deren teamName in plTeams ist, berücksichtigen
 *   3. Ihre Punkte zu vorhandenen WeeklyPoints für ligaGwNumber ADDIEREN (nicht ersetzen)
 *   4. H2H-Ergebnis für ligaGwNumber neu berechnen
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { ligaGwNumber, fplGwNumber, plTeams } = await req.json() as {
    ligaGwNumber: number;
    fplGwNumber: number;
    plTeams: string[];
  };

  if (!ligaGwNumber || !fplGwNumber || !Array.isArray(plTeams) || plTeams.length === 0)
    return NextResponse.json({ error: "ligaGwNumber, fplGwNumber und plTeams erforderlich" }, { status: 400 });

  // Aktive Saison + Liga-Spieltag bestimmen
  const season = await prisma.season.findFirst({ where: { active: true } });
  if (!season) return NextResponse.json({ error: "Keine aktive Saison" }, { status: 404 });

  const ligaGw = await prisma.gameweek.findFirst({
    where: { seasonId: season.id, number: ligaGwNumber },
  });
  if (!ligaGw) return NextResponse.json({ error: `Liga-Spieltag ${ligaGwNumber} nicht gefunden` }, { status: 404 });

  // FPL-Punkte für den Quell-Spieltag holen
  let fplPoints: Map<number, number>;
  try {
    fplPoints = await fetchGameweekPoints(fplGwNumber);
  } catch (e) {
    return NextResponse.json({ error: `FPL GW ${fplGwNumber} nicht verfügbar: ${(e as Error).message}` }, { status: 502 });
  }

  // Alle FPL-Spieler, die zu einem der angegebenen PL-Teams gehören
  const normalizedTeams = plTeams.map((t) => t.trim().toLowerCase());
  const affectedPlayers = await prisma.fplPlayer.findMany({
    where: { teamName: { in: plTeams } },
    select: { id: true, teamName: true },
  });

  // Fallback: case-insensitive Suche, falls Schreibweise leicht abweicht
  const allPlayers = affectedPlayers.length > 0
    ? affectedPlayers
    : await prisma.fplPlayer.findMany({
        select: { id: true, teamName: true },
      }).then((all) => all.filter((p) => normalizedTeams.includes(p.teamName.toLowerCase())));

  if (allPlayers.length === 0)
    return NextResponse.json({
      error: `Keine Spieler für Teams ${plTeams.join(", ")} gefunden. Verfügbare Teamnamen über /api/players prüfen.`,
    }, { status: 404 });

  // Punkte mergen (addieren zu bestehenden GW-Punkten)
  let merged = 0;
  for (const player of allPlayers) {
    const addPts = fplPoints.get(player.id) ?? 0;
    if (addPts === 0) continue; // Spieler nicht eingesetzt → überspringen

    const existing = await prisma.weeklyPoints.findUnique({
      where: { fplPlayerId_gameweekId: { fplPlayerId: player.id, gameweekId: ligaGw.id } },
    });
    await prisma.weeklyPoints.upsert({
      where: { fplPlayerId_gameweekId: { fplPlayerId: player.id, gameweekId: ligaGw.id } },
      create: { fplPlayerId: player.id, gameweekId: ligaGw.id, points: addPts },
      update: { points: (existing?.points ?? 0) + addPts },
    });
    merged++;
  }

  // H2H-Matches für ligaGwNumber neu berechnen
  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    select: { id: true },
  });

  const teamRawPoints = new Map<number, number>();

  for (const team of teams) {
    let lineup = await prisma.lineup.findUnique({
      where: { teamId_gameweekId: { teamId: team.id, gameweekId: ligaGw.id } },
      include: { slots: true },
    });
    if (!lineup) {
      lineup = await prisma.lineup.findFirst({
        where: { teamId: team.id, gameweek: { number: { lt: ligaGwNumber } } },
        orderBy: { gameweek: { number: "desc" } },
        include: { slots: true },
      });
    }
    if (!lineup) continue;

    // Alle WeeklyPoints für diesen GW neu laden (inkl. gerade gemergter Werte)
    const gwPoints = await prisma.weeklyPoints.findMany({
      where: { gameweekId: ligaGw.id },
      select: { fplPlayerId: true, points: true },
    });
    const pointsMap = new Map(gwPoints.map((p) => [p.fplPlayerId, p.points]));

    let total = 0;
    for (const slot of lineup.slots) {
      if (slot.position > 11) continue;
      const pts = pointsMap.get(slot.fplPlayerId) ?? 0;
      total += slot.isCaptain ? pts * 2 : pts;
    }
    teamRawPoints.set(team.id, total);
  }

  const matches = await prisma.match.findMany({ where: { gameweekId: ligaGw.id } });
  const results: { matchId: number; homeGoals: number; awayGoals: number }[] = [];

  for (const match of matches) {
    const homeRaw = teamRawPoints.get(match.homeTeamId) ?? 0;
    const awayRaw = teamRawPoints.get(match.awayTeamId) ?? 0;
    await prisma.match.update({
      where: { id: match.id },
      data: {
        homePoints: pointsToGoals(homeRaw),
        awayPoints: pointsToGoals(awayRaw),
        played: true,
      },
    });
    results.push({ matchId: match.id, homeGoals: pointsToGoals(homeRaw), awayGoals: pointsToGoals(awayRaw) });
  }

  return NextResponse.json({
    ok: true,
    mergedPlayers: merged,
    affectedPlayerCount: allPlayers.length,
    plTeams,
    ligaGwNumber,
    fplGwNumber,
    matchResults: results,
  });
}
