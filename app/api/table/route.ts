import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const seasonId = parseInt(searchParams.get("seasonId") ?? "0");
  if (!seasonId) return NextResponse.json({ error: "seasonId fehlt" }, { status: 400 });

  const teams = await prisma.team.findMany({ include: { user: true } });
  const matches = await prisma.match.findMany({
    where: { seasonId, played: true },
  });

  const stats = new Map(
    teams.map((t) => [
      t.id,
      { teamId: t.id, teamName: t.name, username: t.user.username, W: 0, D: 0, L: 0, pts: 0, scored: 0, conceded: 0 },
    ])
  );

  for (const m of matches) {
    const home = stats.get(m.homeTeamId)!;
    const away = stats.get(m.awayTeamId)!;
    const hp = m.homePoints ?? 0;
    const ap = m.awayPoints ?? 0;

    home.scored += hp;
    home.conceded += ap;
    away.scored += ap;
    away.conceded += hp;

    if (hp > ap) {
      home.W++;
      home.pts += 3;
      away.L++;
    } else if (hp < ap) {
      away.W++;
      away.pts += 3;
      home.L++;
    } else {
      home.D++;
      away.D++;
      home.pts += 1;
      away.pts += 1;
    }
  }

  const table = [...stats.values()].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    return b.scored - b.conceded - (a.scored - a.conceded);
  });

  return NextResponse.json(table);
}
