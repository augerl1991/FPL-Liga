import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Generiert einen Banter-Spieltagsbericht aus den Ergebnissen (ohne KI, template-basiert). */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const gameweekId = parseInt(new URL(req.url).searchParams.get("gameweekId") ?? "0");
  if (!gameweekId) return NextResponse.json({ error: "gameweekId fehlt" }, { status: 400 });

  const gw = await prisma.gameweek.findUnique({ where: { id: gameweekId } });
  if (!gw) return NextResponse.json({ error: "Spieltag nicht gefunden" }, { status: 404 });

  const matches = await prisma.match.findMany({
    where: { gameweekId, played: true },
    include: {
      homeTeam: { select: { name: true } },
      awayTeam: { select: { name: true } },
    },
  });

  if (matches.length === 0)
    return NextResponse.json({ gw: gw.number, lines: [], text: "", empty: true });

  // deterministische Variante je nach GW (gleicher Bericht bei jedem Aufruf)
  const pick = <T,>(arr: T[], salt: number) => arr[(gw.number + salt) % arr.length];

  const lines: string[] = [];
  lines.push(`📅 Spieltag ${gw.number} – Bericht`);

  let totalGoals = 0;
  const teamGoals = new Map<string, number>();
  let biggest: { winner: string; loser: string; a: number; b: number; margin: number } | null = null;
  const matchLines: string[] = [];

  matches.forEach((m, idx) => {
    const home = m.homeTeam.name, away = m.awayTeam.name;
    const hp = m.homePoints ?? 0, ap = m.awayPoints ?? 0;
    totalGoals += hp + ap;
    teamGoals.set(home, (teamGoals.get(home) ?? 0) + hp);
    teamGoals.set(away, (teamGoals.get(away) ?? 0) + ap);

    const margin = Math.abs(hp - ap);
    if (hp !== ap && (!biggest || margin > biggest.margin)) {
      biggest = hp > ap
        ? { winner: home, loser: away, a: hp, b: ap, margin }
        : { winner: away, loser: home, a: ap, b: hp, margin };
    }

    if (hp === ap) {
      if (hp === 0) {
        matchLines.push(pick([
          `😴 ${home} und ${away} trennen sich torlos.`,
          `🥱 Nullnummer zwischen ${home} und ${away}.`,
          `🧱 ${home} – ${away} endet 0:0, Abwehrschlachten pur.`,
        ], idx));
      } else {
        matchLines.push(pick([
          `🤝 ${hp}:${ap} – ${home} und ${away} teilen die Punkte.`,
          `⚖️ Gerechtes ${hp}:${ap} zwischen ${home} und ${away}.`,
          `🤝 ${home} und ${away} kommen nicht über ein ${hp}:${ap} hinaus.`,
        ], idx));
      }
    } else {
      const w = hp > ap ? home : away;
      const l = hp > ap ? away : home;
      const ws = Math.max(hp, ap), ls = Math.min(hp, ap);
      if (margin >= 3) {
        matchLines.push(pick([
          `💥 ${w} überrollt ${l} mit ${ws}:${ls}!`,
          `🚜 ${w} pflügt über ${l} drüber – ${ws}:${ls}.`,
          `🔥 Schützenfest: ${w} zerlegt ${l} ${ws}:${ls}.`,
        ], idx));
      } else {
        matchLines.push(pick([
          `✅ ${w} schlägt ${l} mit ${ws}:${ls}.`,
          `👏 Knapper Sieg für ${w} gegen ${l} (${ws}:${ls}).`,
          `🎯 ${w} setzt sich ${ws}:${ls} gegen ${l} durch.`,
        ], idx));
      }
    }
  });

  // Torfabrik des Tages
  let topTeam: { team: string; goals: number } | null = null;
  for (const [team, goals] of teamGoals) {
    if (!topTeam || goals > topTeam.goals) topTeam = { team, goals };
  }

  lines.push(`⚽ ${totalGoals} Tore in ${matches.length} ${matches.length === 1 ? "Spiel" : "Spielen"}.`);
  lines.push("");
  lines.push(...matchLines);
  lines.push("");
  if (topTeam && topTeam.goals > 0)
    lines.push(`🔥 Torfabrik des Tages: ${topTeam.team} mit ${topTeam.goals} ${topTeam.goals === 1 ? "Tor" : "Toren"}.`);
  if (biggest) {
    const b = biggest as { winner: string; loser: string; a: number; b: number; margin: number };
    lines.push(`💪 Deutlichste Ansage: ${b.winner} vs ${b.loser} (${b.a}:${b.b}).`);
  }

  const text = lines.join("\n");
  return NextResponse.json({ gw: gw.number, lines, text });
}
