import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Liefert den aktuellen Spieltag = der niedrigste Spieltag, der noch NICHT
 * vollständig gespielt wurde. Sobald alle Matches eines Spieltags played=true
 * sind, gilt der nächste als aktuell.
 */
export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const season = await prisma.season.findFirst({ where: { active: true } });
  if (!season) return NextResponse.json({ current: null, seasonId: null });

  const gameweeks = await prisma.gameweek.findMany({
    where: { seasonId: season.id },
    orderBy: { number: "asc" },
    include: { matches: { select: { played: true } } },
  });

  const isFinished = (gw: (typeof gameweeks)[number]) =>
    gw.matches.length > 0 && gw.matches.every((m) => m.played);

  const current =
    gameweeks.find((gw) => !isFinished(gw)) ?? gameweeks[gameweeks.length - 1] ?? null;

  return NextResponse.json({
    current: current ? { id: current.id, number: current.number } : null,
    seasonId: season.id,
  });
}
