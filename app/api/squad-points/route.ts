import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/squad-points?count=5          → eigener Kader, letzte N Spieltage
 * GET /api/squad-points?teamId=X&count=1 → beliebiges Team (nur Admin), letzte N Spieltage
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const teamIdParam = searchParams.get("teamId");
  const count = Math.min(5, Math.max(1, parseInt(searchParams.get("count") ?? "5")));

  let squadIds: number[];

  if (teamIdParam) {
    // Anderes Team abrufen – nur Admin
    if (!session.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamIdParam) },
      include: { squadPlayers: true },
    });
    if (!team) return NextResponse.json({ error: "Team nicht gefunden" }, { status: 404 });
    squadIds = team.squadPlayers.map((s) => s.fplPlayerId);
  } else {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { team: { include: { squadPlayers: true } } },
    });
    if (!user?.team) return NextResponse.json({ error: "Kein Team" }, { status: 404 });
    squadIds = user.team.squadPlayers.map((s) => s.fplPlayerId);
  }

  // Anker = zuletzt GESPIELTER Spieltag
  const latest = await prisma.gameweek.findFirst({
    where: { weeklyPoints: { some: {} } },
    orderBy: { number: "desc" },
    select: { seasonId: true, number: true },
  });

  if (!latest) return NextResponse.json({ gameweeks: [], points: {} });

  const gameweeks = await prisma.gameweek.findMany({
    where: {
      seasonId: latest.seasonId,
      number: { gte: latest.number - (count - 1), lte: latest.number },
    },
    select: { id: true, number: true },
    orderBy: { number: "asc" },
  });

  if (squadIds.length === 0 || gameweeks.length === 0)
    return NextResponse.json({ gameweeks, points: {}, totals: {} });

  // Punkte für das Fenster (letzte N GWs)
  const rows = await prisma.weeklyPoints.findMany({
    where: {
      fplPlayerId: { in: squadIds },
      gameweekId: { in: gameweeks.map((g) => g.id) },
    },
    select: { fplPlayerId: true, gameweekId: true, points: true },
  });

  const points: Record<number, Record<number, number>> = {};
  for (const r of rows) {
    (points[r.fplPlayerId] ??= {})[r.gameweekId] = r.points;
  }

  // Gesamtpunkte = Summe ALLER gespielten GWs in der Liga-DB (nicht FPL totalPoints)
  const allRows = await prisma.weeklyPoints.findMany({
    where: { fplPlayerId: { in: squadIds } },
    select: { fplPlayerId: true, points: true },
  });
  const totals: Record<number, number> = {};
  for (const r of allRows) {
    totals[r.fplPlayerId] = (totals[r.fplPlayerId] ?? 0) + r.points;
  }

  return NextResponse.json({ gameweeks, points, totals });
}
