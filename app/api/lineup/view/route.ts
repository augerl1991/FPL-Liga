import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Öffentlich (eingeloggt): Aufstellung eines beliebigen Teams für einen Spieltag
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const teamId = parseInt(searchParams.get("teamId") ?? "0");
  const gameweekId = parseInt(searchParams.get("gameweekId") ?? "0");

  if (!teamId || !gameweekId)
    return NextResponse.json({ error: "teamId und gameweekId benötigt" }, { status: 400 });

  const [team, gameweek, lineup] = await Promise.all([
    prisma.team.findUnique({ where: { id: teamId }, select: { name: true } }),
    prisma.gameweek.findUnique({ where: { id: gameweekId }, select: { number: true } }),
    prisma.lineup.findUnique({
      where: { teamId_gameweekId: { teamId, gameweekId } },
      include: {
        slots: {
          orderBy: { position: "asc" },
          include: {
            fplPlayer: {
              include: {
                weeklyPoints: { where: { gameweekId }, select: { points: true } },
              },
            },
          },
        },
      },
    }),
  ]);

  if (!team) return NextResponse.json({ error: "Team nicht gefunden" }, { status: 404 });

  return NextResponse.json({
    teamName: team.name,
    gameweekNumber: gameweek?.number ?? null,
    lineup: lineup
      ? {
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
              points: s.fplPlayer.weeklyPoints[0]?.points ?? null,
            },
          })),
        }
      : null,
  });
}
