import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ matchId: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { matchId } = await params;
  const id = parseInt(matchId);

  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      homeTeam: { select: { id: true, name: true } },
      awayTeam: { select: { id: true, name: true } },
      gameweek: { select: { id: true, number: true } },
    },
  });

  if (!match) return NextResponse.json({ error: "Match nicht gefunden" }, { status: 404 });

  return NextResponse.json({
    id: match.id,
    played: match.played,
    homePoints: match.homePoints,
    awayPoints: match.awayPoints,
    gameweekId: match.gameweekId,
    gameweekNumber: match.gameweek.number,
    home: match.homeTeam,
    away: match.awayTeam,
  });
}
