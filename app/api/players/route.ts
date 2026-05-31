import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (position) where.position = position;
  if (search) {
    where.OR = [
      { webName: { contains: search } },
      { firstName: { contains: search } },
      { lastName: { contains: search } },
    ];
  }

  const players = await prisma.fplPlayer.findMany({
    where,
    orderBy: [{ position: "asc" }, { totalPoints: "desc" }],
    include: {
      squadPlayers: {
        take: 1,
        include: { team: true },
      },
    },
  });

  // Flatten: owner-Info direkt auf Spieler-Objekt
  const result = players.map((p) => ({
    id: p.id,
    webName: p.webName,
    firstName: p.firstName,
    lastName: p.lastName,
    position: p.position,
    teamName: p.teamName,
    totalPoints: p.totalPoints,
    owner: p.squadPlayers[0]
      ? { teamId: p.squadPlayers[0].teamId, teamName: p.squadPlayers[0].team.name, boughtFor: p.squadPlayers[0].boughtFor }
      : null,
  }));

  return NextResponse.json(result);
}
