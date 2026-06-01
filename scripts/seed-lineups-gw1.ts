/**
 * seed-lineups-gw1.ts
 *
 * Legt für JEDES Team eine Beispiel-Aufstellung für Spieltag 1 an.
 * Formation 4-4-2 (1 GK, 4 DEF, 4 MID, 2 FWD), Bank = beste übrige 7 Spieler
 * (inkl. Ersatztorwart falls vorhanden). Kapitän/Vize = punktbeste Starter.
 *
 * Usage: npx tsx --env-file=.env scripts/seed-lineups-gw1.ts
 */
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

type P = { id: number; pos: string; pts: number; name: string };

function nowSql() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

// Formation: GK 1, DEF 4, MID 4, FWD 2
const NEED: Record<string, number> = { GK: 1, DEF: 4, MID: 4, FWD: 2 };

async function main() {
  console.log("🚀 Beispiel-Aufstellungen für Spieltag 1 …\n");

  const season = await client.execute(`SELECT id FROM Season WHERE active = 1 LIMIT 1`);
  const seasonId = season.rows[0]?.id as number;
  const gwRes = await client.execute({
    sql: `SELECT id FROM Gameweek WHERE seasonId = ? AND number = 1 LIMIT 1`,
    args: [seasonId],
  });
  const gameweekId = gwRes.rows[0]?.id as number;
  if (!gameweekId) { console.error("❌ Kein Spieltag 1 gefunden."); client.close(); process.exit(1); }

  const teams = await client.execute(`
    SELECT t.id as teamId, u.username
    FROM Team t JOIN User u ON t.userId = u.id
    WHERE u.isAdmin = 0
    ORDER BY t.sortOrder
  `);

  for (const tr of teams.rows) {
    const teamId = tr.teamId as number;
    const username = tr.username as string;

    // Kader, punktbeste zuerst
    const sq = await client.execute({
      sql: `SELECT fp.id as id, fp.position as pos, fp.totalPoints as pts, fp.webName as name
            FROM SquadPlayer sp JOIN FplPlayer fp ON fp.id = sp.fplPlayerId
            WHERE sp.teamId = ?
            ORDER BY fp.totalPoints DESC, fp.price DESC`,
      args: [teamId],
    });
    const players: P[] = sq.rows.map(r => ({
      id: r.id as number, pos: r.pos as string, pts: Number(r.pts), name: r.name as string,
    }));

    const byPos: Record<string, P[]> = { GK: [], DEF: [], MID: [], FWD: [] };
    for (const p of players) (byPos[p.pos] ??= []).push(p);

    // Starter nach Formation wählen
    const starters: P[] = [];
    let ok = true;
    for (const pos of ["GK", "DEF", "MID", "FWD"]) {
      const need = NEED[pos];
      const avail = byPos[pos] ?? [];
      if (avail.length < need) { ok = false; console.warn(`⚠️  ${username}: zu wenige ${pos} (${avail.length}/${need})`); }
      starters.push(...avail.slice(0, need));
    }
    if (!ok || starters.length < 11) { console.warn(`⏭  ${username} übersprungen (Formation nicht erfüllbar)`); continue; }

    // Bank: beste übrigen, Ersatz-GK zuerst
    const starterIds = new Set(starters.map(p => p.id));
    const rest = players.filter(p => !starterIds.has(p.id));
    const benchGk = rest.filter(p => p.pos === "GK");
    const benchOut = rest.filter(p => p.pos !== "GK");
    const bench = [...benchGk.slice(0, 1), ...benchOut].slice(0, 7);
    if (bench.length < 7) { console.warn(`⚠️  ${username}: nur ${bench.length} Bankspieler verfügbar`); }

    // Kapitän / Vize = punktbeste Starter
    const ranked = [...starters].sort((a, b) => b.pts - a.pts);
    const captainId = ranked[0]?.id;
    const viceId = ranked[1]?.id;

    // Vorhandene Aufstellung für GW1 löschen
    const existing = await client.execute({
      sql: `SELECT id FROM Lineup WHERE teamId = ? AND gameweekId = ?`,
      args: [teamId, gameweekId],
    });
    for (const e of existing.rows) {
      await client.execute({ sql: `DELETE FROM LineupSlot WHERE lineupId = ?`, args: [e.id as number] });
      await client.execute({ sql: `DELETE FROM Lineup WHERE id = ?`, args: [e.id as number] });
    }

    // Lineup anlegen
    const ins = await client.execute({
      sql: `INSERT INTO Lineup (teamId, gameweekId, submittedAt) VALUES (?, ?, ?)`,
      args: [teamId, gameweekId, nowSql()],
    });
    const lineupId = Number(ins.lastInsertRowid);

    // Slots: Starter 1-11, Bank 12-18
    const all = [...starters, ...bench];
    let position = 1;
    for (const p of all) {
      await client.execute({
        sql: `INSERT INTO LineupSlot (lineupId, fplPlayerId, position, isCaptain, isViceCaptain) VALUES (?, ?, ?, ?, ?)`,
        args: [lineupId, p.id, position, p.id === captainId ? 1 : 0, p.id === viceId ? 1 : 0],
      });
      position++;
    }

    const capName = starters.find(p => p.id === captainId)?.name;
    console.log(`✓ ${username}: 4-4-2, ${all.length} Spieler, Kapitän ${capName}`);
  }

  console.log("\n✅ Fertig.");
  client.close();
}

main().catch(e => { console.error(e); process.exit(1); });
