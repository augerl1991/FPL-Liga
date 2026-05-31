/**
 * seed-squads.ts
 *
 * Imports auction squad data from auction-data.json into Turso.
 * Run AFTER:
 *   1. seed-users.ts (creates users + teams)
 *   2. Admin → FPL Sync (populates FplPlayer table)
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/seed-squads.ts
 */

import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

interface AuctionPlayer {
  username: string;
  webName: string;
  fullName: string;
  position: string;
  bid: number;
}

interface AuctionData {
  reihenfolge: string[];
  players: AuctionPlayer[];
}

async function main() {
  console.log("🚀 Seeding FPL squads from auction data...\n");

  const dataPath = resolve(process.cwd(), "scripts/auction-data.json");
  const auctionData: AuctionData = JSON.parse(readFileSync(dataPath, "utf-8"));

  // Load all teams (username → teamId)
  const teamsResult = await client.execute(
    `SELECT t.id, u.username FROM Team t JOIN User u ON t.userId = u.id`
  );
  const teamMap = new Map<string, number>();
  for (const row of teamsResult.rows) {
    teamMap.set(row.username as string, row.id as number);
  }
  console.log(`Found ${teamMap.size} teams:`, [...teamMap.keys()].join(", "));

  // Load all FPL players (webName → id, also by fullName as fallback)
  const fplResult = await client.execute(
    `SELECT id, webName, firstName, lastName FROM FplPlayer`
  );

  if (fplResult.rows.length === 0) {
    console.error("\n❌ No FPL players found in database!");
    console.error("   Please run FPL Sync from Admin panel first, then re-run this script.");
    client.close();
    process.exit(1);
  }

  console.log(`Found ${fplResult.rows.length} FPL players in DB\n`);

  // Build lookup maps
  const byWebName = new Map<string, number>();
  const byLastName = new Map<string, number>();
  const byFullName = new Map<string, number>();

  for (const row of fplResult.rows) {
    const webName = (row.webName as string).toLowerCase().trim();
    const lastName = (row.lastName as string).toLowerCase().trim();
    const fullName = `${row.firstName} ${row.lastName}`.toLowerCase().trim();
    byWebName.set(webName, row.id as number);
    // Only set if not ambiguous
    if (!byLastName.has(lastName)) byLastName.set(lastName, row.id as number);
    else byLastName.set(lastName, -1); // mark ambiguous
    byFullName.set(fullName, row.id as number);
  }

  let inserted = 0;
  let skipped = 0;
  let notFound = 0;

  for (const p of auctionData.players) {
    const teamId = teamMap.get(p.username);
    if (!teamId) {
      console.warn(`⚠️  Team not found for username: ${p.username}`);
      skipped++;
      continue;
    }

    // Try to find FPL player ID
    const webNameLower = p.webName.toLowerCase().trim();
    let fplPlayerId = byWebName.get(webNameLower);

    // Fallback: last name match (if unambiguous)
    if (!fplPlayerId) {
      const lastNameLower = p.webName.toLowerCase().trim();
      const fallback = byLastName.get(lastNameLower);
      if (fallback && fallback !== -1) fplPlayerId = fallback;
    }

    // Fallback: full name
    if (!fplPlayerId && p.fullName) {
      fplPlayerId = byFullName.get(p.fullName.toLowerCase().trim());
    }

    if (!fplPlayerId) {
      console.warn(`⚠️  Player not found: '${p.webName}' (${p.fullName}) for ${p.username}`);
      notFound++;
      continue;
    }

    // Check for duplicate
    const existing = await client.execute({
      sql: `SELECT id FROM SquadPlayer WHERE teamId = ? AND fplPlayerId = ?`,
      args: [teamId, fplPlayerId],
    });
    if (existing.rows.length > 0) {
      skipped++;
      continue;
    }

    await client.execute({
      sql: `INSERT INTO SquadPlayer (teamId, fplPlayerId, boughtFor) VALUES (?, ?, ?)`,
      args: [teamId, fplPlayerId, p.bid],
    });
    inserted++;
  }

  console.log(`\n📊 Results:`);
  console.log(`  ✓ Inserted: ${inserted}`);
  console.log(`  ⏭  Skipped (already exists): ${skipped}`);
  console.log(`  ❌ Not found: ${notFound}`);

  // Summary per team
  const squadCounts = await client.execute(
    `SELECT u.username, COUNT(sp.id) as cnt FROM Team t JOIN User u ON t.userId = u.id LEFT JOIN SquadPlayer sp ON sp.teamId = t.id GROUP BY t.id ORDER BY t.sortOrder`
  );
  console.log("\n📋 Squad sizes:");
  for (const row of squadCounts.rows) {
    console.log(`  ${row.username}: ${row.cnt} players`);
  }

  console.log("\n✅ Done!");
  client.close();
}

main().catch(console.error);
