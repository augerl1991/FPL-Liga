import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Aktuelle Reihenfolge holen
export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const teams = await prisma.team.findMany({
    orderBy: { sortOrder: "asc" },
    include: { user: { select: { username: true } } },
  });
  return NextResponse.json(teams);
}

// POST: Reihenfolge speichern
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { order } = await req.json();
  // order: [{ id: number, sortOrder: number }]
  if (!Array.isArray(order)) return NextResponse.json({ error: "Ungültig" }, { status: 400 });

  for (const item of order) {
    await prisma.team.update({
      where: { id: item.id },
      data: { sortOrder: item.sortOrder },
    });
  }

  return NextResponse.json({ ok: true });
}
