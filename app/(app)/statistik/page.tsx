"use client";
import { useEffect, useState } from "react";

type Stats = {
  hasData: boolean;
  totalGoals?: number;
  totalMatches?: number;
  records?: {
    biggestWin: { gw: number; winner: string; loser: string; a: number; b: number } | null;
    highestMatch: { gw: number; home: string; away: string; a: number; b: number; total: number } | null;
    mostGoalsTeamGw: { gw: number; team: string; goals: number } | null;
    highestGw: { gw: number; total: number } | null;
    bestAttack: { team: string; goals: number } | null;
    bestDefense: { team: string; conceded: number } | null;
    mostDraws: { team: string; draws: number } | null;
    longestWin: { team: string; length: number } | null;
    longestUnbeaten: { team: string; length: number } | null;
    bestCaptain: { gw: number; team: string; player: string; points: number } | null;
    worstCaptain: { gw: number; team: string; player: string; points: number } | null;
  };
};

function Card({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{title}</span>
      </div>
      <div className="text-white">{children}</div>
    </div>
  );
}

export default function StatistikSeite() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/statistik?seasonId=1")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ hasData: false }));
  }, []);

  if (!stats) return <p className="text-gray-400 text-center py-16">Lädt…</p>;

  if (!stats.hasData)
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#00ff87] mb-6">Statistiken & Rekorde</h1>
        <div className="glass rounded-xl px-6 py-12 text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="font-semibold text-gray-400">Noch keine Daten</p>
          <p className="text-sm mt-1 text-gray-600">Sobald die ersten Spieltage gespielt sind, erscheinen hier die Rekorde.</p>
        </div>
      </div>
    );

  const r = stats.records!;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-2">Statistiken & Rekorde</h1>
      <p className="text-sm text-gray-400 mb-6">
        {stats.totalGoals} Tore in {stats.totalMatches} Spielen
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {r.biggestWin && (
          <Card icon="💥" title="Höchster Sieg">
            <span className="font-bold">{r.biggestWin.winner}</span>{" "}
            <span className="text-[#00ff87] font-black">{r.biggestWin.a}:{r.biggestWin.b}</span>{" "}
            gegen {r.biggestWin.loser}
            <span className="text-gray-500 text-xs block">Spieltag {r.biggestWin.gw}</span>
          </Card>
        )}
        {r.highestMatch && (
          <Card icon="🎆" title="Torreichstes Spiel">
            {r.highestMatch.home} <span className="text-[#00ff87] font-black">{r.highestMatch.a}:{r.highestMatch.b}</span> {r.highestMatch.away}
            <span className="text-gray-500 text-xs block">{r.highestMatch.total} Tore · Spieltag {r.highestMatch.gw}</span>
          </Card>
        )}
        {r.mostGoalsTeamGw && (
          <Card icon="🚀" title="Meiste Tore (1 Spiel)">
            <span className="font-bold">{r.mostGoalsTeamGw.team}</span> mit{" "}
            <span className="text-[#00ff87] font-black">{r.mostGoalsTeamGw.goals}</span> Toren
            <span className="text-gray-500 text-xs block">Spieltag {r.mostGoalsTeamGw.gw}</span>
          </Card>
        )}
        {r.highestGw && (
          <Card icon="🔥" title="Torreichster Spieltag">
            Spieltag <span className="font-bold">{r.highestGw.gw}</span> mit{" "}
            <span className="text-[#00ff87] font-black">{r.highestGw.total}</span> Toren
          </Card>
        )}
        {r.bestAttack && (
          <Card icon="⚔️" title="Beste Offensive">
            <span className="font-bold">{r.bestAttack.team}</span> ·{" "}
            <span className="text-[#00ff87] font-black">{r.bestAttack.goals}</span> Tore
          </Card>
        )}
        {r.bestDefense && (
          <Card icon="🛡️" title="Beste Defensive">
            <span className="font-bold">{r.bestDefense.team}</span> ·{" "}
            <span className="text-[#00ff87] font-black">{r.bestDefense.conceded}</span> Gegentore
          </Card>
        )}
        {r.longestWin && (
          <Card icon="📈" title="Längste Siegesserie">
            <span className="font-bold">{r.longestWin.team}</span> ·{" "}
            <span className="text-[#00ff87] font-black">{r.longestWin.length}</span> Siege in Folge
          </Card>
        )}
        {r.longestUnbeaten && (
          <Card icon="🧱" title="Längste Serie ungeschlagen">
            <span className="font-bold">{r.longestUnbeaten.team}</span> ·{" "}
            <span className="text-[#00ff87] font-black">{r.longestUnbeaten.length}</span> Spiele
          </Card>
        )}
        {r.mostDraws && (
          <Card icon="🤝" title="Unentschieden-König">
            <span className="font-bold">{r.mostDraws.team}</span> ·{" "}
            <span className="text-[#00ff87] font-black">{r.mostDraws.draws}</span> Remis
          </Card>
        )}
        {r.bestCaptain && (
          <Card icon="👑" title="Beste Kapitänswahl">
            <span className="font-bold">{r.bestCaptain.player}</span> ({r.bestCaptain.team}) ·{" "}
            <span className="text-[#00ff87] font-black">{r.bestCaptain.points}</span> Pkt
            <span className="text-gray-500 text-xs block">Spieltag {r.bestCaptain.gw}</span>
          </Card>
        )}
        {r.worstCaptain && (
          <Card icon="🤡" title="Schlechteste Kapitänswahl">
            <span className="font-bold">{r.worstCaptain.player}</span> ({r.worstCaptain.team}) ·{" "}
            <span className="text-red-400 font-black">{r.worstCaptain.points}</span> Pkt
            <span className="text-gray-500 text-xs block">Spieltag {r.worstCaptain.gw}</span>
          </Card>
        )}
      </div>
    </div>
  );
}
