import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Nur Admin" }, { status: 403 });
  const { id } = await params;
  await prisma.gameweekDeadline.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
