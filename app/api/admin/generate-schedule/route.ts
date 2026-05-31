import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSchedule } from "@/lib/schedule";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { seasonId } = await req.json();
  const season = await prisma.season.findUnique({ where: { id: seasonId } });
  if (!season) return NextResponse.json({ error: "Saison nicht gefunden" }, { status: 404 });

  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    orderBy: { sortOrder: "asc" },
  });
  if (teams.length !== 10)
    return NextResponse.json({ error: `${teams.length} Teams gefunden, 10 benötigt` }, { status: 400 });

  // Spieltage anlegen
  const gameweeks = await Promise.all(
    Array.from({ length: 38 }, (_, i) =>
      prisma.gameweek.upsert({
        where: { seasonId_number: { seasonId, number: i + 1 } },
        create: { seasonId, number: i + 1 },
        update: {},
      })
    )
  );

  const gwMap = new Map(gameweeks.map((g) => [g.number, g.id]));
  const schedule = generateSchedule(teams.map((t) => t.id));

  // Alte Matches löschen und neu erstellen
  await prisma.match.deleteMany({ where: { seasonId } });

  await prisma.match.createMany({
    data: schedule.map((s) => ({
      seasonId,
      gameweekId: gwMap.get(s.gw)!,
      homeTeamId: s.home,
      awayTeamId: s.away,
    })),
  });

  return NextResponse.json({ ok: true, matches: schedule.length });
}
