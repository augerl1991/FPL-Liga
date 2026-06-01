import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const gameweekId = parseInt(searchParams.get("gameweekId") ?? "0");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { team: true },
  });
  if (!user?.team) return NextResponse.json({ error: "Kein Team" }, { status: 404 });

  const lineup = await prisma.lineup.findUnique({
    where: { teamId_gameweekId: { teamId: user.team.id, gameweekId } },
    include: { slots: { include: { fplPlayer: true }, orderBy: { position: "asc" } } },
  });

  if (lineup) return NextResponse.json(lineup);

  // Noch keine Aufstellung für diesen Spieltag → die des letzten Spieltags
  // als Vorlage übernehmen (carry-over), damit der Spieler nur noch anpassen muss.
  const gw = await prisma.gameweek.findUnique({ where: { id: gameweekId } });
  if (gw) {
    const prevLineup = await prisma.lineup.findFirst({
      where: {
        teamId: user.team.id,
        gameweek: { seasonId: gw.seasonId, number: { lt: gw.number } },
      },
      orderBy: { gameweek: { number: "desc" } },
      include: { slots: { include: { fplPlayer: true }, orderBy: { position: "asc" } } },
    });
    if (prevLineup) {
      return NextResponse.json({
        ...prevLineup,
        id: null,
        gameweekId,
        carriedOver: true,
        slots: prevLineup.slots.map((s) => ({
          fplPlayerId: s.fplPlayerId,
          position: s.position,
          isCaptain: s.isCaptain,
          isViceCaptain: s.isViceCaptain,
          fplPlayer: s.fplPlayer,
        })),
      });
    }
  }

  return NextResponse.json(null);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { gameweekId, slots } = await req.json();
  // slots: [{ fplPlayerId, position (1-18), isCaptain, isViceCaptain }]

  if (!gameweekId || !Array.isArray(slots))
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });

  // Grundstruktur der Slots prüfen
  for (const s of slots) {
    if (
      typeof s?.fplPlayerId !== "number" ||
      typeof s?.position !== "number" ||
      !Number.isInteger(s.position) ||
      s.position < 1 ||
      s.position > 18
    )
      return NextResponse.json({ error: "Ungültiger Slot (Position muss 1–18 sein)" }, { status: 400 });
  }

  const starters = slots.filter((s) => s.position <= 11);
  const bench = slots.filter((s) => s.position > 11);
  if (starters.length !== 11)
    return NextResponse.json({ error: "Genau 11 Starter benötigt" }, { status: 400 });
  if (bench.length > 7)
    return NextResponse.json({ error: "Maximal 7 Bankspieler erlaubt" }, { status: 400 });

  // Keine doppelten Spieler, keine doppelten Positionen
  const playerIds = slots.map((s) => s.fplPlayerId);
  if (new Set(playerIds).size !== playerIds.length)
    return NextResponse.json({ error: "Ein Spieler darf nur einmal aufgestellt werden" }, { status: 400 });
  const positions = slots.map((s) => s.position);
  if (new Set(positions).size !== positions.length)
    return NextResponse.json({ error: "Doppelte Aufstellungs-Positionen" }, { status: 400 });

  // Kapitän / Vize prüfen (genau 1 Kapitän, max. 1 Vize, beide unter den Startern, nicht identisch)
  const captains = starters.filter((s) => s.isCaptain);
  const vices = starters.filter((s) => s.isViceCaptain);
  if (slots.filter((s) => s.isCaptain).length !== 1 || captains.length !== 1)
    return NextResponse.json({ error: "Genau 1 Kapitän (in der Startelf) benötigt" }, { status: 400 });
  if (slots.filter((s) => s.isViceCaptain).length > 1 || vices.length > 1)
    return NextResponse.json({ error: "Maximal 1 Vize-Kapitän erlaubt" }, { status: 400 });
  if (vices.length === 1 && captains[0].fplPlayerId === vices[0].fplPlayerId)
    return NextResponse.json({ error: "Kapitän und Vize müssen verschiedene Spieler sein" }, { status: 400 });

  // Deadline prüfen
  const deadlineCheck = await prisma.gameweekDeadline.findFirst({
    where: {
      gameweekId,
      deadline: { gt: new Date() },
    },
    orderBy: { deadline: "asc" },
  });
  if (!deadlineCheck)
    return NextResponse.json({ error: "Deadline abgelaufen" }, { status: 403 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { team: { include: { squadPlayers: { include: { fplPlayer: true } } } } },
  });
  if (!user?.team) return NextResponse.json({ error: "Kein Team" }, { status: 404 });

  const posById = new Map(user.team.squadPlayers.map((s) => [s.fplPlayerId, s.fplPlayer.position]));
  for (const slot of slots) {
    if (!posById.has(slot.fplPlayerId))
      return NextResponse.json({ error: `Spieler ${slot.fplPlayerId} nicht im Kader` }, { status: 400 });
  }

  // Formation der Startelf prüfen (genau 1 Torwart + gültige DEF/MID/FWD-Verteilung)
  const VALID_FORMATIONS = new Set([
    "3-4-3", "3-5-2", "4-3-3", "4-4-2", "4-5-1", "5-2-3", "5-3-2", "5-4-1",
  ]);
  const cnt: Record<string, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  for (const s of starters) {
    const pos = posById.get(s.fplPlayerId)!;
    cnt[pos] = (cnt[pos] ?? 0) + 1;
  }
  if (cnt.GK !== 1)
    return NextResponse.json({ error: "Genau 1 Torwart in der Startelf benötigt" }, { status: 400 });
  const formation = `${cnt.DEF}-${cnt.MID}-${cnt.FWD}`;
  if (!VALID_FORMATIONS.has(formation))
    return NextResponse.json({ error: `Ungültige Formation: ${formation}` }, { status: 400 });

  // Aufstellung speichern (upsert)
  const lineup = await prisma.lineup.upsert({
    where: { teamId_gameweekId: { teamId: user.team.id, gameweekId } },
    create: {
      teamId: user.team.id,
      gameweekId,
      slots: {
        create: slots.map((s: { fplPlayerId: number; position: number; isCaptain: boolean; isViceCaptain: boolean }) => ({
          fplPlayerId: s.fplPlayerId,
          position: s.position,
          isCaptain: s.isCaptain ?? false,
          isViceCaptain: s.isViceCaptain ?? false,
        })),
      },
    },
    update: {
      submittedAt: new Date(),
      slots: {
        deleteMany: {},
        create: slots.map((s: { fplPlayerId: number; position: number; isCaptain: boolean; isViceCaptain: boolean }) => ({
          fplPlayerId: s.fplPlayerId,
          position: s.position,
          isCaptain: s.isCaptain ?? false,
          isViceCaptain: s.isViceCaptain ?? false,
        })),
      },
    },
  });

  return NextResponse.json({ ok: true, lineupId: lineup.id });
}
