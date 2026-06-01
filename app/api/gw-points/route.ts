import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const FPL = "https://fantasy.premierleague.com/api";

/** Liefert Live-Punkte aller FPL-Spieler für einen Spieltag.
 *  GET /api/gw-points?gw=N
 *  Response: { points: Record<number, number> }  (fplPlayerId → Punkte)
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const gw = parseInt(new URL(req.url).searchParams.get("gw") ?? "0");
  if (!gw) return NextResponse.json({ error: "gw erforderlich" }, { status: 400 });

  const res = await fetch(`${FPL}/event/${gw}/live/`, { cache: "no-store" });
  if (!res.ok)
    return NextResponse.json({ error: "FPL API nicht erreichbar" }, { status: 502 });

  const data = await res.json();
  const points: Record<number, number> = {};
  for (const el of data.elements ?? []) {
    // Alle Spieler mit mehr als 0 Minuten oder Punkten aufnehmen
    if ((el.stats?.minutes ?? 0) > 0 || (el.stats?.total_points ?? 0) !== 0) {
      points[el.id] = el.stats.total_points ?? 0;
    }
  }

  return NextResponse.json({ points });
}
