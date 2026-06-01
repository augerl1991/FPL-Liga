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

  if (!gameweekId || !Array.isArray(slots) || slots.length !== 18)
    return NextResponse.json({ error: "18 Slots benötigt (11 Starter + 7 Bank)" }, { status: 400 });

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
    include: { team: { include: { squadPlayers: true } } },
  });
  if (!user?.team) return NextResponse.json({ error: "Kein Team" }, { status: 404 });

  const squadIds = new Set(user.team.squadPlayers.map((s) => s.fplPlayerId));
  for (const slot of slots) {
    if (!squadIds.has(slot.fplPlayerId))
      return NextResponse.json({ error: `Spieler ${slot.fplPlayerId} nicht im Kader` }, { status: 400 });
  }

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
