import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { name } = await req.json();
  if (!name || name.trim().length < 2)
    return NextResponse.json({ error: "Vereinsname mindestens 2 Zeichen" }, { status: 400 });
  if (name.trim().length > 40)
    return NextResponse.json({ error: "Vereinsname maximal 40 Zeichen" }, { status: 400 });

  const team = await prisma.team.findFirst({
    where: { userId: session.userId },
  });
  if (!team) return NextResponse.json({ error: "Kein Team gefunden" }, { status: 404 });

  // Aktive Saison ermitteln
  const season = await prisma.season.findFirst({ where: { active: true } });
  const currentSeasonId = season?.id ?? null;

  // Prüfen ob bereits diese Saison geändert
  if (currentSeasonId && team.nameChangedSeason === currentSeasonId) {
    return NextResponse.json(
      { error: "Vereinsname kann nur einmal pro Saison geändert werden" },
      { status: 409 }
    );
  }

  const updated = await prisma.team.update({
    where: { id: team.id },
    data: {
      name: name.trim(),
      nameChangedSeason: currentSeasonId,
    },
  });

  return NextResponse.json({ ok: true, name: updated.name });
}
