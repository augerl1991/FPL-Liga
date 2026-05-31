import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const seasonId = parseInt(searchParams.get("seasonId") ?? "1");

  const gameweeks = await prisma.gameweek.findMany({
    where: { seasonId },
    orderBy: { number: "asc" },
    include: {
      matches: {
        include: {
          homeTeam: { select: { name: true } },
          awayTeam: { select: { name: true } },
        },
      },
    },
  });

  return NextResponse.json(gameweeks);
}
