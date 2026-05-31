import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json(null);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { team: true },
  });
  if (!user) return NextResponse.json(null);

  return NextResponse.json({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    team: user.team,
  });
}
