import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const FPL = "https://fantasy.premierleague.com/api";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });
  const gameweekId = parseInt(new URL(req.url).searchParams.get("gameweekId") ?? "0");
  if (!gameweekId) return NextResponse.json({ error: "gameweekId fehlt" }, { status: 400 });
  const rows = await prisma.gameweekDeadline.findMany({
    where: { gameweekId },
    orderBy: { deadline: "asc" },
  });
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const body = await req.json();

  // Auto-generate from PL fixtures
  if (body.autoGenerate) {
    const { gameweekId, fplGwNumber } = body;
    if (!gameweekId || !fplGwNumber)
      return NextResponse.json({ error: "gameweekId + fplGwNumber erforderlich" }, { status: 400 });

    const [bootstrapRes, fixturesRes] = await Promise.all([
      fetch(`${FPL}/bootstrap-static/`, { cache: "no-store" }),
      fetch(`${FPL}/fixtures/?event=${fplGwNumber}`, { cache: "no-store" }),
    ]);
    if (!bootstrapRes.ok || !fixturesRes.ok)
      return NextResponse.json({ error: "FPL API nicht erreichbar" }, { status: 502 });

    const bootstrap = await bootstrapRes.json();
    const fixtures: { kickoff_time: string | null }[] = await fixturesRes.json();
    const teamMap: Record<number, string> = {};
    for (const t of bootstrap.teams) teamMap[t.id] = t.name;

    // Fixtures mit Kickoff-Zeit filtern + nach UTC-Datum gruppieren
    const byDay = new Map<string, Date[]>();
    for (const f of fixtures) {
      if (!f.kickoff_time) continue;
      const ko = new Date(f.kickoff_time);
      const day = ko.toISOString().slice(0, 10); // YYYY-MM-DD UTC
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day)!.push(ko);
    }

    if (byDay.size === 0)
      return NextResponse.json({ error: "Keine Fixtures mit Kickoff-Zeit gefunden" }, { status: 404 });

    // Deadlines: 1 Minute vor dem frühesten Kick-off des Tages
    const days = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b));
    const created: { label: string; deadline: Date }[] = [];

    for (const [, kickoffs] of days) {
      kickoffs.sort((a, b) => a.getTime() - b.getTime());
      const firstKo = kickoffs[0];
      const deadline = new Date(firstKo.getTime() - 60_000); // -1 Minute
      const label = firstKo.toLocaleDateString("de-AT", {
        weekday: "short", day: "2-digit", month: "2-digit", timeZone: "Europe/Vienna",
      });
      created.push({ label, deadline });
    }

    // Bestehende Deadlines für diesen GW löschen und neue anlegen
    await prisma.gameweekDeadline.deleteMany({ where: { gameweekId } });
    await prisma.gameweekDeadline.createMany({
      data: created.map((d) => ({ gameweekId, label: d.label, deadline: d.deadline })),
    });

    return NextResponse.json({ ok: true, created: created.length, deadlines: created });
  }

  // Manuell hinzufügen
  const { gameweekId, deadline, label } = body;
  if (!gameweekId || !deadline || !label)
    return NextResponse.json({ error: "gameweekId, deadline, label erforderlich" }, { status: 400 });

  const row = await prisma.gameweekDeadline.create({
    data: { gameweekId, deadline: new Date(deadline), label },
  });
  return NextResponse.json(row);
}
