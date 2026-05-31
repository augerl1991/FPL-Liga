import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const BUDGET = 560; // Mio
const SQUAD_LIMITS = { GK: 3, DEF: 8, MID: 8, FWD: 6 };
const SQUAD_TOTAL = 25;

// Aktuellen Kader + Budget eines Teams
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const teamId = parseInt(searchParams.get("teamId") ?? "0") || undefined;
  const targetId = teamId ?? (await getMyTeamId(session.userId));
  if (!targetId) return NextResponse.json({ error: "Kein Team" }, { status: 404 });

  const squad = await prisma.squadPlayer.findMany({
    where: { teamId: targetId },
    include: { fplPlayer: true },
  });

  const spent = squad.reduce((s, p) => s + p.boughtFor, 0);
  const budget = BUDGET - spent;
  const counts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  for (const p of squad) {
    const pos = p.fplPlayer.position as keyof typeof counts;
    if (pos in counts) counts[pos]++;
  }

  return NextResponse.json({ squad, budget, counts, limits: SQUAD_LIMITS, total: SQUAD_TOTAL });
}

// Admin: Spieler einem Team zuweisen (nach Auktion)
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { teamId, fplPlayerId, price } = await req.json();

  // Doppel-Check: Spieler bereits vergeben?
  const existing = await prisma.auctionResult.findUnique({ where: { fplPlayerId } });
  if (existing)
    return NextResponse.json({ error: "Spieler bereits versteigert" }, { status: 409 });

  // Kadercheck
  const squad = await prisma.squadPlayer.findMany({
    where: { teamId },
    include: { fplPlayer: true },
  });
  const spent = squad.reduce((s, p) => s + p.boughtFor, 0);
  if (spent + price > BUDGET)
    return NextResponse.json({ error: "Budget überschritten" }, { status: 400 });

  const player = await prisma.fplPlayer.findUnique({ where: { id: fplPlayerId } });
  if (!player) return NextResponse.json({ error: "Spieler nicht gefunden" }, { status: 404 });

  const pos = player.position as keyof typeof SQUAD_LIMITS;
  const posCount = squad.filter((s) => s.fplPlayer.position === pos).length;
  if (posCount >= SQUAD_LIMITS[pos])
    return NextResponse.json({ error: `${pos} Limit (${SQUAD_LIMITS[pos]}) erreicht` }, { status: 400 });

  if (squad.length >= SQUAD_TOTAL)
    return NextResponse.json({ error: "Kader voll (25 Spieler)" }, { status: 400 });

  // Transaktion: SquadPlayer + AuctionResult
  await prisma.$transaction([
    prisma.squadPlayer.create({ data: { teamId, fplPlayerId, boughtFor: price } }),
    prisma.auctionResult.create({ data: { fplPlayerId, teamId, finalPrice: price } }),
  ]);

  return NextResponse.json({ ok: true });
}

async function getMyTeamId(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { team: true } });
  return user?.team?.id;
}
