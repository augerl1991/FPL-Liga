/**
 * seed-fpl.ts
 *
 * Fetches all players from the official FPL API and imports them into Turso.
 * Run this before seed-squads.ts.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/seed-fpl.ts
 */

import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

function positionFromType(type: number): string {
  return ({ 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" } as Record<number, string>)[type] ?? "UNK";
}

async function main() {
  console.log("🚀 Fetching FPL players from API...\n");

  const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
  if (!res.ok) throw new Error("FPL API nicht erreichbar");
  const bootstrap = await res.json();

  const teamMap = new Map<number, string>(bootstrap.teams.map((t: { id: number; name: string }) => [t.id, t.name]));

  console.log(`Found ${bootstrap.elements.length} players in FPL API`);

  let upserted = 0;
  let errors = 0;

  for (const el of bootstrap.elements) {
    const position = positionFromType(el.element_type);
    const teamName = teamMap.get(el.team) ?? "";

    try {
      await client.execute({
        sql: `INSERT INTO FplPlayer (id, webName, firstName, lastName, position, teamName, price, totalPoints, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
              ON CONFLICT(id) DO UPDATE SET
                webName = excluded.webName,
                price = excluded.price,
                totalPoints = excluded.totalPoints,
                teamName = excluded.teamName,
                updatedAt = datetime('now')`,
        args: [el.id, el.web_name, el.first_name, el.second_name, position, teamName, el.now_cost, el.total_points],
      });
      upserted++;
    } catch (err: unknown) {
      console.error(`Error upserting player ${el.web_name}:`, err);
      errors++;
    }
  }

  console.log(`\n✓ Upserted: ${upserted} players`);
  if (errors > 0) console.log(`❌ Errors: ${errors}`);
  console.log("\n✅ FPL sync complete!");
  client.close();
}

main().catch(console.error);
