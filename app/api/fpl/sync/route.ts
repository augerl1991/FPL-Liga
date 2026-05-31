import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchBootstrap, positionFromType } from "@/lib/fpl-api";

// Admin-Route: FPL-Spielerdaten in lokale DB laden/aktualisieren
export async function POST() {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const bootstrap = await fetchBootstrap();
  const teamMap = new Map(bootstrap.teams.map((t) => [t.id, t.name]));

  let upserted = 0;
  for (const el of bootstrap.elements) {
    await prisma.fplPlayer.upsert({
      where: { id: el.id },
      create: {
        id: el.id,
        webName: el.web_name,
        firstName: el.first_name,
        lastName: el.second_name,
        position: positionFromType(el.element_type),
        teamName: teamMap.get(el.team) ?? "",
        price: el.now_cost,
        totalPoints: el.total_points,
      },
      update: {
        webName: el.web_name,
        price: el.now_cost,
        totalPoints: el.total_points,
        teamName: teamMap.get(el.team) ?? "",
        updatedAt: new Date(),
      },
    });
    upserted++;
  }

  return NextResponse.json({ ok: true, upserted });
}
