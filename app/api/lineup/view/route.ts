import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const teamId = parseInt(searchParams.get("teamId") ?? "0");
  const gameweekId = parseInt(searchParams.get("gameweekId") ?? "0");

  if (!teamId || !gameweekId)
    return NextResponse.json({ error: "teamId und gameweekId benötigt" }, { status: 400 });

  const [team, gameweek] = await Promise.all([
    prisma.team.findUnique({ where: { id: teamId }, select: { name: true } }),
    prisma.gameweek.findUnique({ where: { id: gameweekId }, select: { number: true } }),
  ]);

  if (!team) return NextResponse.json({ error: "Team nicht gefunden" }, { status: 404 });

  // 1. Lineup für diesen Spieltag suchen
  let lineup = await prisma.lineup.findUnique({
    where: { teamId_gameweekId: { teamId, gameweekId } },
    include: {
      slots: { orderBy: { position: "asc" }, include: { fplPlayer: true } },
      gameweek: { select: { number: true } },
    },
  });

  let isRollover = false;
  let rolloverFromGw: number | null = null;

  // 2. Kein Lineup → letztes abgegebenes nehmen (niedrigste GW-Nummer vor aktuellem)
  if (!lineup && gameweek) {
    const previous = await prisma.lineup.findFirst({
      where: {
        teamId,
        gameweek: { number: { lt: gameweek.number } },
      },
      orderBy: { gameweek: { number: "desc" } },
      include: {
        slots: { orderBy: { position: "asc" }, include: { fplPlayer: true } },
        gameweek: { select: { number: true } },
      },
    });

    if (previous) {
      lineup = previous;
      isRollover = true;
      rolloverFromGw = previous.gameweek.number;
    }
  }

  if (!lineup) {
    return NextResponse.json({
      teamName: team.name,
      gameweekNumber: gameweek?.number ?? null,
      lineup: null,
    });
  }

  // 3. Punkte immer aus dem angefragten Spieltag holen (nicht aus dem Rollover-GW)
  const playerIds = lineup.slots.map((s) => s.fplPlayerId);
  const weeklyPoints = await prisma.weeklyPoints.findMany({
    where: { gameweekId, fplPlayerId: { in: playerIds } },
    select: { fplPlayerId: true, points: true },
  });
  const pointsMap = new Map(weeklyPoints.map((wp) => [wp.fplPlayerId, wp.points]));

  return NextResponse.json({
    teamName: team.name,
    gameweekNumber: gameweek?.number ?? null,
    isRollover,
    rolloverFromGw,
    lineup: {
      submittedAt: lineup.submittedAt,
      slots: lineup.slots.map((s) => ({
        position: s.position,
        isCaptain: s.isCaptain,
        isViceCaptain: s.isViceCaptain,
        fplPlayer: {
          id: s.fplPlayer.id,
          webName: s.fplPlayer.webName,
          teamName: s.fplPlayer.teamName,
          position: s.fplPlayer.position,
          points: pointsMap.get(s.fplPlayerId) ?? null,
        },
      })),
    },
  });
}
