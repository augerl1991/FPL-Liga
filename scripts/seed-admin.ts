import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { username: "admin" } });
  if (existing) { console.log("Admin existiert bereits"); return; }

  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      username: "admin",
      passwordHash,
      isAdmin: true,
      team: { create: { name: "Admin Team" } },
    },
  });

  // Saison anlegen
  await prisma.season.upsert({
    where: { id: 1 },
    create: { id: 1, name: "2025/26", active: true },
    update: {},
  });

  console.log("✓ Admin angelegt: admin / admin123");
  console.log("✓ Saison 2025/26 angelegt");
}

main().finally(() => prisma.$disconnect());
