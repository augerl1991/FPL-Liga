import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const FPL = "https://fantasy.premierleague.com/api";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const event = searchParams.get("event"); // optional: GW-Filter

  try {
    // Teams + Fixtures parallel holen
    const [bootstrapRes, fixturesRes] = await Promise.all([
      fetch(`${FPL}/bootstrap-static/`, { next: { revalidate: 3600 } }),
      fetch(`${FPL}/fixtures/${event ? `?event=${event}` : ""}`, { next: { revalidate: 300 } }),
    ]);

    if (!bootstrapRes.ok || !fixturesRes.ok)
      throw new Error("FPL API nicht erreichbar");

    const bootstrap = await bootstrapRes.json();
    const fixtures = await fixturesRes.json();

    // Team-ID → Name
    const teamMap: Record<number, string> = {};
    for (const t of bootstrap.teams) teamMap[t.id] = t.name;

    // Fixtures aufbereiten
    const result = fixtures.map((f: {
      id: number; event: number | null; kickoff_time: string | null;
      team_h: number; team_a: number;
      team_h_score: number | null; team_a_score: number | null;
      finished: boolean; started: boolean;
    }) => ({
      id: f.id,
      gameweek: f.event,
      kickoff: f.kickoff_time,
      homeTeam: teamMap[f.team_h] ?? `Team ${f.team_h}`,
      awayTeam: teamMap[f.team_a] ?? `Team ${f.team_a}`,
      homeScore: f.team_h_score,
      awayScore: f.team_a_score,
      finished: f.finished,
      started: f.started,
    }));

    // Spieltage ermitteln
    const gwNumbers = [...new Set(result.map((f: { gameweek: number }) => f.gameweek).filter(Boolean))].sort((a, b) => (a as number) - (b as number));

    return NextResponse.json({ fixtures: result, gameweeks: gwNumbers });
  } catch {
    return NextResponse.json({ error: "FPL API nicht erreichbar" }, { status: 503 });
  }
}
