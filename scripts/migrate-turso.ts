import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  const sql = readFileSync(
    join(process.cwd(), "prisma/migrations/20260531155701_init/migration.sql"),
    "utf-8"
  );

  // Statements aufteilen und einzeln ausführen
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Führe ${statements.length} SQL-Statements aus...`);

  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log("✓", stmt.slice(0, 60).replace(/\n/g, " "));
    } catch (err: any) {
      if (err.message?.includes("already exists")) {
        console.log("⏭ Tabelle existiert bereits:", stmt.slice(0, 40));
      } else {
        throw err;
      }
    }
  }

  console.log("\n✅ Turso Datenbank erfolgreich migriert!");
  client.close();
}

main().catch(console.error);
