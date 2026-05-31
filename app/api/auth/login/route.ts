import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password)
    return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return NextResponse.json({ error: "Ungültige Anmeldedaten" }, { status: 401 });

  const token = await signToken({ userId: user.id, username: user.username, isAdmin: user.isAdmin });
  const res = NextResponse.json({ ok: true, isAdmin: user.isAdmin });
  res.cookies.set("session", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" });
  return res;
}
