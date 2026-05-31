import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  // Saison anlegen
  await client.execute(`
    INSERT OR IGNORE INTO Season (id, name, active, createdAt)
    VALUES (1, '2025/26', 1, datetime('now'))
  `);
  console.log("✓ Saison 2025/26 angelegt");

  // Admin prüfen
  const existing = await client.execute(`SELECT id FROM User WHERE username = 'admin'`);
  if (existing.rows.length > 0) {
    console.log("⏭ Admin existiert bereits");
  } else {
    const passwordHash = await bcrypt.hash("admin123", 10);
    await client.execute({
      sql: `INSERT INTO User (username, passwordHash, isAdmin, createdAt) VALUES (?, ?, 1, datetime('now'))`,
      args: ["admin", passwordHash],
    });
    const userRow = await client.execute(`SELECT id FROM User WHERE username = 'admin'`);
    const userId = userRow.rows[0].id;
    await client.execute({
      sql: `INSERT INTO Team (name, userId) VALUES ('Admin Team', ?)`,
      args: [userId],
    });
    console.log("✓ Admin angelegt: admin / admin123");
  }

  console.log("\n✅ Turso Seed fertig!");
  client.close();
}

main().catch(console.error);
