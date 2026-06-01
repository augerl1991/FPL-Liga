import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const DEFAULTS: Record<string, string> = {
  plMode: "history", // "history" | "live"
};

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key) {
    const row = await prisma.siteConfig.findUnique({ where: { key } });
    return NextResponse.json({ key, value: row?.value ?? DEFAULTS[key] ?? null });
  }

  // Return all config
  const rows = await prisma.siteConfig.findMany();
  const config: Record<string, string> = { ...DEFAULTS };
  for (const r of rows) config[r.key] = r.value;
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) return NextResponse.json({ error: "Kein Zugriff" }, { status: 403 });

  const { key, value } = await req.json();
  if (!key || value === undefined) return NextResponse.json({ error: "key + value erforderlich" }, { status: 400 });

  await prisma.siteConfig.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });

  return NextResponse.json({ ok: true, key, value });
}
