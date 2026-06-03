import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Liga-Rekorde & Statistiken für eine Saison. */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const seasonId = parseInt(new URL(req.url).searchParams.get("seasonId") ?? "1");

  const teams = await prisma.team.findMany({
    where: { user: { isAdmin: false } },
    select: { id: true, name: true },
  });
  const teamName = new Map(teams.map((t) => [t.id, t.name]));

  const matches = await prisma.match.findMany({
    where: { seasonId, played: true },
    include: { gameweek: { select: { id: true, number: true } } },
  });

  if (matches.length === 0)
    return NextResponse.json({ hasData: false });

  let totalGoals = 0;
  for (const m of matches) totalGoals += (m.homePoints ?? 0) + (m.awayPoints ?? 0);

  // ── Match-basierte Rekorde ──
  let biggestWin: { gw: number; winner: string; loser: string; a: number; b: number; margin: number } | null = null;
  let highestMatch: { gw: number; home: string; away: string; a: number; b: number; total: number } | null = null;
  let mostGoalsTeamGw: { gw: number; team: string; goals: number } | null = null;

  // pro Spieltag Tore summieren
  const gwGoals = new Map<number, number>();
  // pro Team Aggregat
  const agg = new Map<number, { scored: number; conceded: number; draws: number }>();
  for (const t of teams) agg.set(t.id, { scored: 0, conceded: 0, draws: 0 });

  for (const m of matches) {
    const hp = m.homePoints ?? 0, ap = m.awayPoints ?? 0;
    const gn = m.gameweek.number;
    const home = teamName.get(m.homeTeamId) ?? "?";
    const away = teamName.get(m.awayTeamId) ?? "?";

    gwGoals.set(gn, (gwGoals.get(gn) ?? 0) + hp + ap);

    const a = agg.get(m.homeTeamId), b = agg.get(m.awayTeamId);
    if (a) { a.scored += hp; a.conceded += ap; if (hp === ap) a.draws++; }
    if (b) { b.scored += ap; b.conceded += hp; if (hp === ap) b.draws++; }

    // höchster Sieg
    const margin = Math.abs(hp - ap);
    if (margin > 0 && (!biggestWin || margin > biggestWin.margin)) {
      biggestWin = hp > ap
        ? { gw: gn, winner: home, loser: away, a: hp, b: ap, margin }
        : { gw: gn, winner: away, loser: home, a: ap, b: hp, margin };
    }
    // torreichstes Spiel
    const total = hp + ap;
    if (!highestMatch || total > highestMatch.total)
      highestMatch = { gw: gn, home, away, a: hp, b: ap, total };
    // meiste Tore eines Teams in einem Spiel
    if (!mostGoalsTeamGw || hp > mostGoalsTeamGw.goals)
      mostGoalsTeamGw = { gw: gn, team: home, goals: hp };
    if (!mostGoalsTeamGw || ap > mostGoalsTeamGw.goals)
      mostGoalsTeamGw = { gw: gn, team: away, goals: ap };
  }

  // torreichster Spieltag
  let highestGw: { gw: number; total: number } | null = null;
  for (const [gw, total] of gwGoals) {
    if (!highestGw || total > highestGw.total) highestGw = { gw, total };
  }

  // beste Offensive / beste Defensive / meiste Remis
  let bestAttack: { team: string; goals: number } | null = null;
  let bestDefense: { team: string; conceded: number } | null = null;
  let mostDraws: { team: string; draws: number } | null = null;
  for (const [tid, s] of agg) {
    const name = teamName.get(tid) ?? "?";
    if (!bestAttack || s.scored > bestAttack.goals) bestAttack = { team: name, goals: s.scored };
    if (!bestDefense || s.conceded < bestDefense.conceded) bestDefense = { team: name, conceded: s.conceded };
    if (!mostDraws || s.draws > mostDraws.draws) mostDraws = { team: name, draws: s.draws };
  }

  // ── Serien (längste Siegesserie / ungeschlagen) ──
  // pro Team chronologische Ergebnisfolge
  const seq = new Map<number, { gw: number; res: "W" | "D" | "L" }[]>();
  for (const t of teams) seq.set(t.id, []);
  const sortedMatches = [...matches].sort((a, b) => a.gameweek.number - b.gameweek.number);
  for (const m of sortedMatches) {
    const hp = m.homePoints ?? 0, ap = m.awayPoints ?? 0;
    const hr = hp > ap ? "W" : hp < ap ? "L" : "D";
    const ar = ap > hp ? "W" : ap < hp ? "L" : "D";
    seq.get(m.homeTeamId)?.push({ gw: m.gameweek.number, res: hr });
    seq.get(m.awayTeamId)?.push({ gw: m.gameweek.number, res: ar });
  }
  let longestWin: { team: string; length: number } | null = null;
  let longestUnbeaten: { team: string; length: number } | null = null;
  for (const [tid, results] of seq) {
    const name = teamName.get(tid) ?? "?";
    let w = 0, wMax = 0, u = 0, uMax = 0;
    for (const r of results) {
      w = r.res === "W" ? w + 1 : 0;
      u = r.res !== "L" ? u + 1 : 0;
      if (w > wMax) wMax = w;
      if (u > uMax) uMax = u;
    }
    if (wMax > 0 && (!longestWin || wMax > longestWin.length)) longestWin = { team: name, length: wMax };
    if (uMax > 0 && (!longestUnbeaten || uMax > longestUnbeaten.length)) longestUnbeaten = { team: name, length: uMax };
  }

  // ── Kapitäns-Rekorde (nur wo Lineup + Punkte vorhanden) ──
  let bestCaptain: { gw: number; team: string; player: string; points: number } | null = null;
  let worstCaptain: { gw: number; team: string; player: string; points: number } | null = null;

  const playedGwIds = [...new Set(matches.map((m) => m.gameweekId))];
  const gwNumById = new Map(matches.map((m) => [m.gameweekId, m.gameweek.number]));
  const lineups = await prisma.lineup.findMany({
    where: { gameweekId: { in: playedGwIds }, teamId: { in: teams.map((t) => t.id) } },
    include: { slots: { where: { isCaptain: true } } },
  });
  if (lineups.length > 0) {
    const wp = await prisma.weeklyPoints.findMany({
      where: { gameweekId: { in: playedGwIds } },
      select: { fplPlayerId: true, gameweekId: true, points: true },
    });
    const wpMap = new Map<string, number>();
    for (const r of wp) wpMap.set(`${r.fplPlayerId}_${r.gameweekId}`, r.points);

    const captainIds = [...new Set(lineups.flatMap((l) => l.slots.map((s) => s.fplPlayerId)))];
    const players = await prisma.fplPlayer.findMany({
      where: { id: { in: captainIds } },
      select: { id: true, webName: true },
    });
    const pName = new Map(players.map((p) => [p.id, p.webName]));

    for (const l of lineups) {
      const cap = l.slots[0];
      if (!cap) continue;
      const pts = wpMap.get(`${cap.fplPlayerId}_${l.gameweekId}`);
      if (pts === undefined) continue; // keine Punkte für diesen GW
      const entry = {
        gw: gwNumById.get(l.gameweekId) ?? 0,
        team: teamName.get(l.teamId) ?? "?",
        player: pName.get(cap.fplPlayerId) ?? "?",
        points: pts,
      };
      if (!bestCaptain || pts > bestCaptain.points) bestCaptain = entry;
      if (!worstCaptain || pts < worstCaptain.points) worstCaptain = entry;
    }
  }

  return NextResponse.json({
    hasData: true,
    totalGoals,
    totalMatches: matches.length,
    records: {
      biggestWin, highestMatch, mostGoalsTeamGw, highestGw,
      bestAttack, bestDefense, mostDraws,
      longestWin, longestUnbeaten,
      bestCaptain, worstCaptain,
    },
  });
}
