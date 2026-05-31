import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// sortOrder 1-10 based on Reihenfolge sheet
const USERS = [
  { username: "enzi",    teamName: "Enzi",    sortOrder: 1 },
  { username: "mimi",    teamName: "Mimi",    sortOrder: 2 },
  { username: "jakob",   teamName: "Jakob",   sortOrder: 3 },
  { username: "zand",    teamName: "Zand",    sortOrder: 4 },
  { username: "felix",   teamName: "Felix",   sortOrder: 5 },
  { username: "kager",   teamName: "Kager",   sortOrder: 6 },
  { username: "gerhard", teamName: "Gerhard", sortOrder: 7 },
  { username: "jul",     teamName: "Jul",     sortOrder: 8 },
  { username: "crepi",   teamName: "Crepi",   sortOrder: 9 },
  { username: "sebi",    teamName: "Sebi",    sortOrder: 10 },
];

const DEFAULT_PASSWORD = "fpl2025";

async function main() {
  console.log("🚀 Seeding 10 FPL Liga Users...\n");

  for (const u of USERS) {
    // Check if user already exists
    const existing = await client.execute({
      sql: `SELECT id FROM User WHERE username = ?`,
      args: [u.username],
    });

    if (existing.rows.length > 0) {
      const userId = existing.rows[0].id as number;
      console.log(`⏭  User '${u.username}' already exists (id=${userId})`);

      // Update team sortOrder if needed
      const teamRow = await client.execute({
        sql: `SELECT id FROM Team WHERE userId = ?`,
        args: [userId],
      });
      if (teamRow.rows.length > 0) {
        await client.execute({
          sql: `UPDATE Team SET sortOrder = ? WHERE userId = ?`,
          args: [u.sortOrder, userId],
        });
        console.log(`   ✓ sortOrder updated to ${u.sortOrder}`);
      }
      continue;
    }

    // Create user
    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    await client.execute({
      sql: `INSERT INTO User (username, passwordHash, isAdmin, createdAt) VALUES (?, ?, 0, datetime('now'))`,
      args: [u.username, passwordHash],
    });

    const userRow = await client.execute({
      sql: `SELECT id FROM User WHERE username = ?`,
      args: [u.username],
    });
    const userId = userRow.rows[0].id as number;

    // Create team
    await client.execute({
      sql: `INSERT INTO Team (name, userId, sortOrder) VALUES (?, ?, ?)`,
      args: [u.teamName, userId, u.sortOrder],
    });

    console.log(`✓ Created: ${u.username} / ${DEFAULT_PASSWORD}  (Team: ${u.teamName}, Pos: ${u.sortOrder})`);
  }

  // Verify
  const teams = await client.execute(
    `SELECT t.name, t.sortOrder, u.username FROM Team t JOIN User u ON t.userId = u.id ORDER BY t.sortOrder`
  );
  console.log("\n📋 Current team order:");
  for (const row of teams.rows) {
    console.log(`  ${row.sortOrder}. ${row.name} (${row.username})`);
  }

  console.log("\n✅ Done! Users created with password: fpl2025");
  client.close();
}

main().catch(console.error);
