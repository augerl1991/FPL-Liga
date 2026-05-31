import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Transferfenster-Check
async function getOpenWindow() {
  const now = new Date();
  return prisma.transferWindow.findFirst({
    where: { openFrom: { lte: now }, openUntil: { gte: now } },
  });
}

// Admin: Transferfenster anlegen
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { seasonId, openFrom, openUntil, label } = await req.json();
  const window = await prisma.transferWindow.create({
    data: { seasonId, openFrom: new Date(openFrom), openUntil: new Date(openUntil), label },
  });
  return NextResponse.json(window);
}

// Admin: Transfer durchführen (Spieler von Team zu Team)
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const window = await getOpenWindow();
  if (!window)
    return NextResponse.json({ error: "Kein offenes Transferfenster" }, { status: 403 });

  const { fromTeamId, toTeamId, fplPlayerId, price } = await req.json();

  // Spieler vom alten Kader entfernen
  if (fromTeamId) {
    await prisma.squadPlayer.deleteMany({ where: { teamId: fromTeamId, fplPlayerId } });
    await prisma.auctionResult.updateMany({ where: { fplPlayerId }, data: { teamId: toTeamId } });
  }

  // Spieler zum neuen Kader hinzufügen
  await prisma.squadPlayer.upsert({
    where: { teamId_fplPlayerId: { teamId: toTeamId, fplPlayerId } },
    create: { teamId: toTeamId, fplPlayerId, boughtFor: price },
    update: { boughtFor: price },
  });

  await prisma.transfer.create({
    data: {
      transferWindowId: window.id,
      fromTeamId: fromTeamId ?? null,
      toTeamId,
      fplPlayerId,
      price,
    },
  });

  return NextResponse.json({ ok: true });
}
