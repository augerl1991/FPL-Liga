import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchGameweekPoints } from "@/lib/fpl-api";

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

  // Punkte pro Team berechnen (Starter-Punkte + Kapitän x2)
  const lineups = await prisma.lineup.findMany({
    where: { gameweekId },
    include: {
      slots: { include: { fplPlayer: true } },
      team: true,
    },
  });

  const teamPoints = new Map<number, number>();
  for (const lineup of lineups) {
    let total = 0;
    for (const slot of lineup.slots) {
      if (slot.position > 11) continue; // Bank
      const pts = fplPoints.get(slot.fplPlayerId) ?? 0;
      total += slot.isCaptain ? pts * 2 : pts;
    }
    teamPoints.set(lineup.teamId, total);
  }

  // H2H-Matches aktualisieren
  const matches = await prisma.match.findMany({ where: { gameweekId } });
  for (const match of matches) {
    const homePoints = teamPoints.get(match.homeTeamId) ?? 0;
    const awayPoints = teamPoints.get(match.awayTeamId) ?? 0;
    await prisma.match.update({
      where: { id: match.id },
      data: { homePoints, awayPoints, played: true },
    });
  }

  return NextResponse.json({ ok: true, teamsUpdated: teamPoints.size });
}
