import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchBootstrap, positionFromType } from "@/lib/fpl-api";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin" }, { status: 403 });

  const { seasonName } = await req.json();
  if (!seasonName?.trim())
    return NextResponse.json({ error: "Saisonname fehlt" }, { status: 400 });

  // 1. Alte Saison deaktivieren
  await prisma.season.updateMany({ where: { active: true }, data: { active: false } });

  // 2. Neue Saison anlegen (oder vorhandene reaktivieren)
  let season = await prisma.season.findFirst({ where: { name: seasonName.trim() } });
  if (season) {
    season = await prisma.season.update({ where: { id: season.id }, data: { active: true } });
  } else {
    season = await prisma.season.create({ data: { name: seasonName.trim(), active: true } });
  }

  // 3. Vereinsname-Lock zurücksetzen → jeder kann seinen Vereinsnamen einmal neu wählen
  await prisma.team.updateMany({ data: { nameChangedSeason: null } });

  // 4. Alle Kader leeren → Auktion startet bei 0
  const deleted = await prisma.squadPlayer.deleteMany({});

  // 5. AuctionResults leeren
  await prisma.auctionResult.deleteMany({});

  // 6. FPL Spielerdaten frisch von der API holen
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
        firstName: el.first_name,
        lastName: el.second_name,
        position: positionFromType(el.element_type),
        teamName: teamMap.get(el.team) ?? "",
        price: el.now_cost,
        totalPoints: el.total_points,
        updatedAt: new Date(),
      },
    });
    upserted++;
  }

  return NextResponse.json({
    ok: true,
    seasonId: season.id,
    seasonName: season.name,
    squadPlayersDeleted: deleted.count,
    playersUpdated: upserted,
  });
}
