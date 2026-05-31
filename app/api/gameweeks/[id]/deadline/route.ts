import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { id } = await params;
  const gameweekId = parseInt(id);

  // Nächste offene Deadline für diesen Spieltag
  const deadline = await prisma.gameweekDeadline.findFirst({
    where: { gameweekId, deadline: { gt: new Date() } },
    orderBy: { deadline: "asc" },
  });

  return NextResponse.json({ deadline: deadline?.deadline ?? null });
}
