import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PREV_SEASON } from "@/lib/prev-season-data";

/**
 * Positionen der historischen Teams (abgeleitet aus GW1, Berger-Muster 1v10, 2v9, 3v8, 4v7, 5v6).
 * Position 1–10 entspricht sortOrder 1–10 der aktuellen Teams.
 */
const HIST_POS: Record<string, number> = {
  "St.Peter Rattlesnakes": 1,
  "FC Elfmeterwappler":    2,
  "Galactik Football":     3,
  "Scarlett Johannson":    4,
  "Augerl FC":             5,
  "Iwobi Wan-Kenobi":      6,
  "FC Salaha-DEF":         7,
  "Reinildojul":           8,
  "1 FC DIXX":             9,
  "FC Handkantenschlag":   10,
};

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { seasonId } = await req.json();
  const season = await prisma.season.findUnique({ where: { id: seasonId } });
  if (!season) return NextResponse.json({ error: "Saison nicht gefunden" }, { status: 404 });

  // Aktuelle Teams nach sortOrder (1–10) laden
  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    orderBy: { sortOrder: "asc" },
  });
  if (teams.length !== 10)
    return NextResponse.json({ error: `${teams.length} Teams gefunden, 10 benötigt` }, { status: 400 });

  // Position (1–10) → aktueller teamId
  const posToTeamId: Record<number, number> = {};
  teams.forEach((t, i) => { posToTeamId[i + 1] = t.id; });

  // Gameweeks anlegen (1–38)
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

  // Gespielte GW-IDs ermitteln – diese Spieltage NICHT anfassen
  const playedMatches = await prisma.match.findMany({
    where: { seasonId, played: true },
    select: { gameweekId: true },
  });
  const playedGwIds = new Set(playedMatches.map((m) => m.gameweekId));

  // Alle Matches aus nicht-gespielten GWs löschen (inkl. allfälliger Duplikate)
  await prisma.match.deleteMany({
    where: { seasonId, gameweekId: { notIn: [...playedGwIds] } },
  });

  // Neue Matches aus historischen Paarungen erstellen
  const matchData: { seasonId: number; gameweekId: number; homeTeamId: number; awayTeamId: number }[] = [];
  const warnings: string[] = [];

  for (const gw of PREV_SEASON) {
    const gwId = gwMap.get(gw.gw);
    if (!gwId) continue;

    // GW bereits (teilweise) gespielt → überspringen
    if (playedGwIds.has(gwId)) continue;

    for (const match of gw.matches) {
      const homePos = HIST_POS[match.home];
      const awayPos = HIST_POS[match.away];

      if (!homePos || !awayPos) {
        warnings.push(`GW${gw.gw}: Unbekanntes Team – "${match.home}" oder "${match.away}"`);
        continue;
      }

      matchData.push({
        seasonId,
        gameweekId: gwId,
        homeTeamId: posToTeamId[homePos],
        awayTeamId: posToTeamId[awayPos],
      });
    }
  }

  await prisma.match.createMany({ data: matchData });

  return NextResponse.json({
    ok: true,
    matchesCreated: matchData.length,
    playedGwsSkipped: playedGwIds.size,
    warnings,
  });
}
