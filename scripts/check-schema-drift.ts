/**
 * Vergleicht prisma/schema.prisma mit den tatsächlichen Spalten der Turso-DB.
 * Meldet fehlende Spalten und kann sie optional per ALTER TABLE ergänzen.
 *
 *   Bericht:   npx tsx --env-file=.env scripts/check-schema-drift.ts
 *   Anwenden:  npx tsx --env-file=.env scripts/check-schema-drift.ts --apply
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const SCALARS = new Set([
  "Int", "String", "Boolean", "DateTime", "Float", "BigInt", "Decimal", "Bytes", "Json",
]);
const SQLITE_TYPE: Record<string, string> = {
  Int: "INTEGER", BigInt: "INTEGER", String: "TEXT", Boolean: "BOOLEAN",
  DateTime: "DATETIME", Float: "REAL", Decimal: "DECIMAL", Bytes: "BLOB", Json: "JSONB",
};

type Column = { name: string; type: string; optional: boolean; defaultSql: string | null; isPk: boolean; isAutoinc: boolean };
type Model = { name: string; columns: Column[] };

function parseDefault(line: string, scalar: string): string | null {
  const m = line.match(/@default\(([^)]*)\)/);
  if (!m) return null;
  const raw = m[1].trim();
  if (raw === "autoincrement()" || raw === "now()" || raw === "uuid()" || raw === "cuid()") {
    // Werte werden von Prisma/DB erzeugt – für ADD COLUMN now() => CURRENT_TIMESTAMP
    return raw === "now()" ? "CURRENT_TIMESTAMP" : null;
  }
  if (scalar === "Boolean") return raw === "true" ? "1" : "0";
  if (scalar === "String") return `'${raw.replace(/^"|"$/g, "")}'`;
  return raw; // Zahlen
}

function parseSchema(): Model[] {
  const text = readFileSync(join(process.cwd(), "prisma", "schema.prisma"), "utf-8");
  const models: Model[] = [];
  const modelRe = /model\s+(\w+)\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = modelRe.exec(text))) {
    const name = m[1];
    const body = m[2];
    const columns: Column[] = [];
    for (const rawLine of body.split("\n")) {
      const line = rawLine.replace(/\/\/.*$/, "").trim();
      if (!line || line.startsWith("@@")) continue;
      const parts = line.split(/\s+/);
      if (parts.length < 2) continue;
      const fieldName = parts[0];
      let fieldType = parts[1];
      const optional = fieldType.endsWith("?");
      const isList = fieldType.endsWith("[]");
      fieldType = fieldType.replace(/[?\[\]]/g, "");
      if (isList) continue; // Relation
      if (!SCALARS.has(fieldType)) continue; // Relation / Enum o.ä.
      columns.push({
        name: fieldName,
        type: SQLITE_TYPE[fieldType],
        optional,
        defaultSql: parseDefault(line, fieldType),
        isPk: /@id\b/.test(line),
        isAutoinc: /@default\(autoincrement\(\)\)/.test(line),
      });
    }
    models.push({ name, columns });
  }
  return models;
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL / TURSO_AUTH_TOKEN nicht gesetzt.");
  }
  const apply = process.argv.includes("--apply");
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const models = parseSchema();
  const missing: { table: string; column: Column }[] = [];
  const missingTables: Model[] = [];

  for (const model of models) {
    const info = await db.execute(`PRAGMA table_info("${model.name}")`);
    if (info.rows.length === 0) {
      missingTables.push(model);
      continue;
    }
    const existing = new Set(info.rows.map((r) => String(r.name)));
    for (const col of model.columns) {
      if (!existing.has(col.name)) missing.push({ table: model.name, column: col });
    }
  }

  if (missingTables.length) {
    console.log("⚠️  Komplett fehlende Tabellen:");
    for (const t of missingTables) console.log("   - " + t.name);
    if (apply) {
      console.log("\n→ Erstelle fehlende Tabellen (ohne FKs/Indizes – Best-Effort)…");
      for (const t of missingTables) {
        const defs = t.columns.map((c) => {
          let d = `"${c.name}" ${c.type}`;
          if (c.isPk) d += " NOT NULL PRIMARY KEY" + (c.isAutoinc ? " AUTOINCREMENT" : "");
          else if (!c.optional) d += " NOT NULL" + (c.defaultSql ? ` DEFAULT ${c.defaultSql}` : "");
          else if (c.defaultSql) d += ` DEFAULT ${c.defaultSql}`;
          return d;
        });
        const sql = `CREATE TABLE IF NOT EXISTS "${t.name}" (${defs.join(", ")})`;
        try {
          await db.execute(sql);
          console.log(`   ✓ Tabelle ${t.name}`);
        } catch (e) {
          console.log(`   ✗ Tabelle ${t.name}: ${(e as Error).message}`);
        }
      }
    } else {
      console.log("   (mit --apply werden sie als Best-Effort-Tabellen angelegt)");
    }
  }

  if (missing.length === 0) {
    if (!missingTables.length)
      console.log("✅ Keine fehlenden Spalten – Schema und Turso-DB sind synchron.");
  } else {
    console.log(`\n${missing.length} fehlende Spalte(n):`);
    for (const { table, column } of missing) {
      console.log(`   - ${table}.${column.name} (${column.type}${column.optional ? ", NULL" : ""})`);
    }

    if (apply) {
      console.log("\n→ Wende ALTER TABLE an …");
      for (const { table, column } of missing) {
        let sql = `ALTER TABLE "${table}" ADD COLUMN "${column.name}" ${column.type}`;
        if (!column.optional) {
          const def = column.defaultSql ?? (column.type === "TEXT" ? "''" : "0");
          sql += ` NOT NULL DEFAULT ${def}`;
        } else if (column.defaultSql) {
          sql += ` DEFAULT ${column.defaultSql}`;
        }
        try {
          await db.execute(sql);
          console.log(`   ✓ ${table}.${column.name}`);
        } catch (e) {
          console.log(`   ✗ ${table}.${column.name}: ${(e as Error).message}`);
        }
      }
      console.log("Fertig.");
    } else {
      console.log("\nMit --apply ausführen, um die Spalten hinzuzufügen.");
    }
  }
}

main();
