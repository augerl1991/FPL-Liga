import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const seasonId = parseInt(searchParams.get("seasonId") ?? "0");
  if (!seasonId) return NextResponse.json({ error: "seasonId fehlt" }, { status: 400 });

  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    include: { user: true },
    orderBy: { sortOrder: "asc" },
  });

  const matches = await prisma.match.findMany({
    where: { seasonId, played: true },
    include: { gameweek: { select: { id: true, number: true } } },
  });

  // H2H-Statistiken
  const stats = new Map(
    teams.map((t) => [
      t.id,
      { teamId: t.id, teamName: t.name, username: t.user.username,
        W: 0, D: 0, L: 0, pts: 0, scored: 0, conceded: 0, fplPoints: 0 },
    ])
  );

  for (const m of matches) {
    const home = stats.get(m.homeTeamId);
    const away = stats.get(m.awayTeamId);
    if (!home || !away) continue;
    const hp = m.homePoints ?? 0;
    const ap = m.awayPoints ?? 0;

    home.scored += hp;
    home.conceded += ap;
    away.scored += ap;
    away.conceded += hp;

    if (hp > ap) { home.W++; home.pts += 3; away.L++; }
    else if (hp < ap) { away.W++; away.pts += 3; home.L++; }
    else { home.D++; away.D++; home.pts += 1; away.pts += 1; }
  }

  // Gesamt-FPL-Punkte pro Team über alle gespielten Spieltage
  // Alle gespielten Gameweek-IDs (eindeutig)
  const playedGwIds = [...new Set(matches.map((m) => m.gameweekId))];

  if (playedGwIds.length > 0) {
    // Alle WeeklyPoints für diese Spieltage auf einmal laden
    const weeklyPoints = await prisma.weeklyPoints.findMany({
      where: { gameweekId: { in: playedGwIds } },
      select: { fplPlayerId: true, gameweekId: true, points: true },
    });
    const wpMap = new Map<string, number>();
    for (const wp of weeklyPoints) wpMap.set(`${wp.fplPlayerId}_${wp.gameweekId}`, wp.points);

    // Alle Lineups für diese Spieltage
    const lineups = await prisma.lineup.findMany({
      where: { gameweekId: { in: playedGwIds }, teamId: { in: teams.map((t) => t.id) } },
      include: { slots: true },
    });
    const lineupIndex = new Map<string, typeof lineups[0]>();
    for (const l of lineups) lineupIndex.set(`${l.teamId}_${l.gameweekId}`, l);

    // Spieltage sortiert (für Rollover)
    const gwsSorted = matches
      .map((m) => ({ id: m.gameweekId, number: m.gameweek.number }))
      .filter((g, i, arr) => arr.findIndex((x) => x.id === g.id) === i)
      .sort((a, b) => a.number - b.number);

    for (const team of teams) {
      const stat = stats.get(team.id)!;
      let lastLineup: typeof lineups[0] | null = null;

      for (const gw of gwsSorted) {
        const lineup = lineupIndex.get(`${team.id}_${gw.id}`) ?? null;
        const used = lineup ?? lastLineup; // Rollover
        if (lineup) lastLineup = lineup;
        if (!used) continue;

        for (const slot of used.slots) {
          if (slot.position > 11) continue;
          const pts = wpMap.get(`${slot.fplPlayerId}_${gw.id}`) ?? 0;
          stat.fplPoints += slot.isCaptain ? pts * 2 : pts;
        }
      }
    }
  }

  const table = [...stats.values()].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    // 1. Tiebreaker: geschossene Tore
    if (b.scored !== a.scored) return b.scored - a.scored;
    // 2. Tiebreaker: Tordifferenz
    const gdB = b.scored - b.conceded;
    const gdA = a.scored - a.conceded;
    return gdB - gdA;
  });

  return NextResponse.json(table);
}
