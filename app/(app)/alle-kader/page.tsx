"use client";
import { useEffect, useState } from "react";

type Team = { id: number; name: string; sortOrder: number };
type SquadPlayer = {
  id: number;
  boughtFor: number;
  fplPlayer: { webName: string; teamName: string; position: string; totalPoints: number };
};

const COLS = [
  { pos: "GK",  label: "Torhüter",   max: 3, border: "border-yellow-500", badge: "bg-yellow-600" },
  { pos: "DEF", label: "Abwehr",     max: 8, border: "border-blue-500",   badge: "bg-blue-600"   },
  { pos: "MID", label: "Mittelfeld", max: 8, border: "border-green-500",  badge: "bg-green-600"  },
  { pos: "FWD", label: "Sturm",      max: 6, border: "border-red-500",    badge: "bg-red-600"    },
];

export default function AlleKaderSeite() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [idx, setIdx] = useState(0);
  const [squad, setSquad] = useState<SquadPlayer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setTeams(d));
  }, []);

  useEffect(() => {
    if (teams.length === 0) return;
    const team = teams[idx];
    setLoading(true);
    fetch(`/api/auction?teamId=${team.id}`)
      .then((r) => r.json())
      .then((d) => { setSquad(d.squad ?? []); setLoading(false); });
  }, [teams, idx]);

  const byPos: Record<string, SquadPlayer[]> = { GK: [], DEF: [], MID: [], FWD: [] };
  for (const sp of squad) byPos[sp.fplPlayer.position]?.push(sp);

  const totalSpent = squad.reduce((s, p) => s + p.boughtFor, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-6">Alle Kader</h1>

      {teams.length === 0 ? (
        <p className="text-gray-500">Keine Teams gefunden.</p>
      ) : (
        <>
          {/* Team-Navigation */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="px-3 py-2 bg-[#16213e] rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-xl leading-none"
            >
              ‹
            </button>

            <div className="flex gap-2 flex-wrap">
              {teams.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIdx(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    i === idx
                      ? "bg-[#00ff87] text-black"
                      : "bg-[#16213e] hover:bg-[#0f3460] text-white"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIdx((i) => Math.min(teams.length - 1, i + 1))}
              disabled={idx === teams.length - 1}
              className="px-3 py-2 bg-[#16213e] rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-xl leading-none"
            >
              ›
            </button>
          </div>

          {/* Budget-Übersicht */}
          {!loading && (
            <div className="flex gap-4 mb-4 text-sm">
              <span className="text-gray-400">
                Spieler: <span className="text-white font-bold">{squad.length}/25</span>
              </span>
              <span className="text-gray-400">
                Ausgegeben: <span className="text-yellow-400 font-bold">{totalSpent} Mio</span>
              </span>
              <span className="text-gray-400">
                Restbudget: <span className="text-[#00ff87] font-bold">{560 - totalSpent} Mio</span>
              </span>
            </div>
          )}

          {/* 4-Spalten Kader */}
          {loading ? (
            <p className="text-gray-400 text-sm py-8 text-center">Lädt…</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {COLS.map(({ pos, label, max, border, badge }) => (
                <div key={pos} className={`bg-[#16213e] rounded-xl border-t-2 ${border} overflow-hidden`}>
                  {/* Spalten-Header */}
                  <div className="px-3 py-2 flex items-center justify-between border-b border-gray-700">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge}`}>{pos}</span>
                    <span className="text-xs text-gray-300 font-medium">{label}</span>
                    <span className="text-xs text-gray-500">{byPos[pos].length}/{max}</span>
                  </div>

                  {/* Spieler */}
                  <div className="p-2 space-y-1.5 min-h-[100px]">
                    {byPos[pos].length === 0 ? (
                      <p className="text-xs text-gray-600 text-center pt-6">–</p>
                    ) : (
                      byPos[pos].map((sp) => (
                        <div
                          key={sp.id}
                          className="flex items-center justify-between px-2 py-1.5 bg-[#0f3460] rounded"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-white truncate leading-tight">
                              {sp.fplPlayer.webName}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate">
                              {sp.fplPlayer.teamName}
                            </div>
                          </div>
                          <span className="text-yellow-400 font-bold text-xs ml-2 shrink-0">
                            {sp.boughtFor}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
