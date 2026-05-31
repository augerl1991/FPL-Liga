"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Match = { id: number; homeTeamId: number; awayTeamId: number; homePoints: number | null; awayPoints: number | null; played: boolean; homeTeam: { name: string }; awayTeam: { name: string } };
type Gameweek = { id: number; number: number; matches: Match[] };

export default function SpielplanSeite() {
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/spielplan?seasonId=1")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setGameweeks(d);
          // Ersten nicht-gespielten GW aufklappen
          const first = d.find((gw: Gameweek) => gw.matches.some((m) => !m.played));
          if (first) setExpanded(first.id);
        }
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-6">Spielplan</h1>
      <div className="space-y-2">
        {gameweeks.map((gw) => {
          const allPlayed = gw.matches.every((m) => m.played);
          return (
            <div key={gw.id} className="bg-[#16213e] rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === gw.id ? null : gw.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#0f3460] transition-colors"
              >
                <span className="font-semibold">Spieltag {gw.number}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${allPlayed ? "bg-green-800 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                  {allPlayed ? "Gespielt" : "Ausstehend"}
                </span>
              </button>
              {expanded === gw.id && (
                <div className="border-t border-gray-700">
                  {gw.matches.map((m) => (
                    <div key={m.id} className="flex items-center px-4 py-2 border-b border-gray-800 last:border-0">
                      <Link
                        href={`/lineup/${m.homeTeamId}/${gw.id}`}
                        className="flex-1 text-right text-sm hover:text-[#00ff87] transition-colors"
                      >
                        {m.homeTeam.name}
                      </Link>
                      <span className="mx-4 text-center min-w-[60px] font-bold text-[#00ff87]">
                        {m.played ? `${m.homePoints} : ${m.awayPoints}` : "vs"}
                      </span>
                      <Link
                        href={`/lineup/${m.awayTeamId}/${gw.id}`}
                        className="flex-1 text-left text-sm hover:text-[#00ff87] transition-colors"
                      >
                        {m.awayTeam.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
