import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Liefert die Einzel-Punkte der letzten (bis zu 5) gespielten Spieltage
// für jeden Spieler im eigenen Kader.
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { team: { include: { squadPlayers: true } } },
  });
  if (!user?.team) return NextResponse.json({ error: "Kein Team" }, { status: 404 });

  const squadIds = user.team.squadPlayers.map((s) => s.fplPlayerId);

  // Anker = zuletzt GESPIELTER Spieltag (höchste Nummer mit eingetragenen Punkten).
  // Davon ausgehend die letzten bis zu 5 Spieltage als zusammenhängendes Fenster,
  // z.B. zuletzt gespielt = 9  ->  Spieltage 5–9.
  const latest = await prisma.gameweek.findFirst({
    where: { weeklyPoints: { some: {} } },
    orderBy: { number: "desc" },
    select: { seasonId: true, number: true },
  });

  if (!latest) return NextResponse.json({ gameweeks: [], points: {} });

  const gameweeks = await prisma.gameweek.findMany({
    where: {
      seasonId: latest.seasonId,
      number: { gte: latest.number - 4, lte: latest.number },
    },
    select: { id: true, number: true },
    orderBy: { number: "asc" }, // aufsteigend für die Anzeige
  });

  if (squadIds.length === 0 || gameweeks.length === 0)
    return NextResponse.json({ gameweeks, points: {} });

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

  return NextResponse.json({ gameweeks, points });
}
