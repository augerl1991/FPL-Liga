import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchGameweekPoints } from "@/lib/fpl-api";
import { pointsToGoals } from "@/lib/scoring";

// Admin-Route: Punkte für einen Spieltag eintragen und H2H-Matches berechnen
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { gameweekId } = await req.json();
  if (!gameweekId)
    return NextResponse.json({ error: "gameweekId fehlt" }, { status: 400 });

  const gameweek = await prisma.gameweek.findUnique({ where: { id: gameweekId } });
  if (!gameweek) return NextResponse.json({ error: "Spieltag nicht gefunden" }, { status: 404 });

  const fplPoints = await fetchGameweekPoints(gameweek.number);

  // Punkte pro Spieler in DB speichern
  for (const [fplPlayerId, points] of fplPoints) {
    const exists = await prisma.fplPlayer.findUnique({ where: { id: fplPlayerId } });
    if (!exists) continue;
    await prisma.weeklyPoints.upsert({
      where: { fplPlayerId_gameweekId: { fplPlayerId, gameweekId } },
      create: { fplPlayerId, gameweekId, points },
      update: { points },
    });
  }

  // Rohpunkte pro Team berechnen (Starter + Kapitän ×2)
  // Rollover: kein Lineup → letztes vorheriges Lineup nehmen
  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    select: { id: true },
  });

  const teamRawPoints = new Map<number, number>();

  for (const team of teams) {
    // Lineup für diesen GW
    let lineup = await prisma.lineup.findUnique({
      where: { teamId_gameweekId: { teamId: team.id, gameweekId } },
      include: { slots: true },
    });

    // Fallback: letztes vorheriges Lineup
    if (!lineup) {
      lineup = await prisma.lineup.findFirst({
        where: {
          teamId: team.id,
          gameweek: { number: { lt: gameweek.number } },
        },
        orderBy: { gameweek: { number: "desc" } },
        include: { slots: true },
      });
    }

    if (!lineup) continue;

    let total = 0;
    for (const slot of lineup.slots) {
      if (slot.position > 11) continue; // Bank
      const pts = fplPoints.get(slot.fplPlayerId) ?? 0;
      total += slot.isCaptain ? pts * 2 : pts;
    }
    teamRawPoints.set(team.id, total);
  }

  // Rohpunkte → Tore umrechnen und H2H-Matches speichern
  const matches = await prisma.match.findMany({ where: { gameweekId } });
  const results: { match: number; home: string; away: string; homeGoals: number; awayGoals: number; homeRaw: number; awayRaw: number }[] = [];

  for (const match of matches) {
    const homeRaw = teamRawPoints.get(match.homeTeamId) ?? 0;
    const awayRaw = teamRawPoints.get(match.awayTeamId) ?? 0;
    const homeGoals = pointsToGoals(homeRaw);
    const awayGoals = pointsToGoals(awayRaw);

    await prisma.match.update({
      where: { id: match.id },
      data: { homePoints: homeGoals, awayPoints: awayGoals, played: true },
    });

    results.push({
      match: match.id,
      home: `Team ${match.homeTeamId}`,
      away: `Team ${match.awayTeamId}`,
      homeGoals, awayGoals, homeRaw, awayRaw,
    });
  }

  return NextResponse.json({ ok: true, teamsUpdated: teamRawPoints.size, results });
}
