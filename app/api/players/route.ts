import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position");
  const search = searchParams.get("search");
  const available = searchParams.get("available"); // nur nicht-versteigerte

  const where: Record<string, unknown> = {};
  if (position) where.position = position;
  if (search) {
    where.OR = [
      { webName: { contains: search } },
      { firstName: { contains: search } },
      { lastName: { contains: search } },
    ];
  }
  if (available === "true") {
    where.auctionResult = null;
  }

  const players = await prisma.fplPlayer.findMany({
    where,
    orderBy: { totalPoints: "desc" },
    take: 100,
    include: { auctionResult: true },
  });

  return NextResponse.json(players);
}
