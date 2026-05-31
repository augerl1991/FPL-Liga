import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin)
    return NextResponse.json({ error: "Nur Admin kann User anlegen" }, { status: 403 });

  const { username, password, teamName, isAdmin } = await req.json();
  if (!username || !password || !teamName)
    return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing)
    return NextResponse.json({ error: "Username bereits vergeben" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      isAdmin: isAdmin ?? false,
      team: { create: { name: teamName } },
    },
    include: { team: true },
  });

  return NextResponse.json({ id: user.id, username: user.username, teamName: user.team?.name });
}
