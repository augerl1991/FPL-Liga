"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";

type Team = { id: number; name: string; sortOrder: number };
type SquadPlayer = {
  id: number;
  boughtFor: number;
  fplPlayer: { id: number; webName: string; teamName: string; position: string; totalPoints: number };
};
type GwPoints = { gameweeks: { id: number; number: number }[]; points: Record<number, Record<number, number>> };

const COLS = [
  { pos: "GK",  label: "Torhüter",   max: 3, border: "border-yellow-500", badge: "bg-yellow-600" },
  { pos: "DEF", label: "Abwehr",     max: 8, border: "border-blue-500",   badge: "bg-blue-600"   },
  { pos: "MID", label: "Mittelfeld", max: 8, border: "border-green-500",  badge: "bg-green-600"  },
  { pos: "FWD", label: "Sturm",      max: 6, border: "border-red-500",    badge: "bg-red-600"    },
];

export default function AlleKaderSeite() {
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;

  const [teams, setTeams]     = useState<Team[]>([]);
  const [idx, setIdx]         = useState(0);
  const [squad, setSquad]     = useState<SquadPlayer[]>([]);
  const [gwData, setGwData]   = useState<GwPoints | null>(null);
  const [loading, setLoading] = useState(false);

  // Admin-gesteuerte Sichtbarkeit
  const [showPrice,   setShowPrice]   = useState(true);
  const [showTotal,   setShowTotal]   = useState(true);
  const [showLastGw,  setShowLastGw]  = useState(true);
  const [savingCol,   setSavingCol]   = useState<string | null>(null);

  // Config laden
  useEffect(() => {
    Promise.all([
      fetch("/api/admin/config?key=alleKaderPrice").then(r => r.json()),
      fetch("/api/admin/config?key=alleKaderTotal").then(r => r.json()),
      fetch("/api/admin/config?key=alleKaderLastGw").then(r => r.json()),
    ]).then(([p, t, g]) => {
      setShowPrice(p.value !== "0");
      setShowTotal(t.value !== "0");
      setShowLastGw(g.value !== "0");
    }).catch(() => {});
  }, []);

  // Teams laden
  useEffect(() => {
    fetch("/api/teams")
      .then(r => r.json())
      .then(d => Array.isArray(d) && setTeams(d));
  }, []);

  // Kader + letzte GW-Punkte laden wenn Team wechselt
  useEffect(() => {
    if (teams.length === 0) return;
    const team = teams[idx];
    setLoading(true);
    setGwData(null);
    fetch(`/api/auction?teamId=${team.id}`)
      .then(r => r.json())
      .then(d => {
        setSquad(d.squad ?? []);
        setLoading(false);
        // Letzte GW-Punkte für dieses Team (1 Spieltag)
        fetch(`/api/squad-points?teamId=${team.id}&count=1`)
          .then(r => r.json())
          .then(gw => gw.gameweeks && setGwData(gw))
          .catch(() => {});
      });
  }, [teams, idx]);

  async function toggleCol(key: string, currentVal: boolean, setter: (v: boolean) => void) {
    setSavingCol(key);
    const newVal = !currentVal;
    setter(newVal);
    await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: newVal ? "1" : "0" }),
    });
    setSavingCol(null);
  }

  const byPos: Record<string, SquadPlayer[]> = { GK: [], DEF: [], MID: [], FWD: [] };
  for (const sp of squad) byPos[sp.fplPlayer.position]?.push(sp);

  const totalSpent = squad.reduce((s, p) => s + p.boughtFor, 0);

  // Letzter Spieltag aus GW-Daten
  const lastGw = gwData?.gameweeks?.[0] ?? null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#00ff87]">Alle Kader</h1>

        {/* Admin-Spalten-Toggle */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mr-1">Spalten:</span>
            {[
              { key: "alleKaderPrice",  label: "Preis",       val: showPrice,  set: setShowPrice  },
              { key: "alleKaderTotal",  label: "Ges.-Pkt",    val: showTotal,  set: setShowTotal  },
              { key: "alleKaderLastGw", label: lastGw ? `GW${lastGw.number}` : "Letzter GW", val: showLastGw, set: setShowLastGw },
            ].map(({ key, label, val, set }) => (
              <button
                key={key}
                onClick={() => toggleCol(key, val, set)}
                disabled={savingCol === key}
                title={val ? `${label} ausblenden` : `${label} einblenden`}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                  val
                    ? "bg-[#00ff87]/15 text-[#00ff87] ring-1 ring-[#00ff87]/30"
                    : "glass-soft text-gray-500 line-through"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {teams.length === 0 ? (
        <p className="text-gray-500">Keine Teams gefunden.</p>
      ) : (
        <>
          {/* Team-Navigation */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
              className="px-3 py-2 glass rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-xl leading-none">
              ‹
            </button>
            <div className="flex gap-2 flex-wrap">
              {teams.map((t, i) => (
                <button key={t.id} onClick={() => setIdx(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    i === idx ? "bg-[#00ff87] text-black" : "glass hover:bg-[#0f3460] text-white"
                  }`}>
                  {t.name}
                </button>
              ))}
            </div>
            <button onClick={() => setIdx(i => Math.min(teams.length - 1, i + 1))} disabled={idx === teams.length - 1}
              className="px-3 py-2 glass rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-xl leading-none">
              ›
            </button>
          </div>

          {/* Budget-Übersicht */}
          {!loading && (
            <div className="flex gap-4 mb-4 text-sm flex-wrap">
              <span className="text-gray-400">Spieler: <span className="text-white font-bold">{squad.length}/25</span></span>
              {showPrice && (
                <>
                  <span className="text-gray-400">Ausgegeben: <span className="text-yellow-400 font-bold">{totalSpent} Mio</span></span>
                  <span className="text-gray-400">Restbudget: <span className="text-[#00ff87] font-bold">{560 - totalSpent} Mio</span></span>
                </>
              )}
              {showTotal && (
                <span className="text-gray-400">
                  Gesamtpunkte: <span className="text-[#00ff87] font-bold">
                    {squad.reduce((s, p) => s + p.fplPlayer.totalPoints, 0)}
                  </span>
                </span>
              )}
            </div>
          )}

          {/* 4-Spalten Kader */}
          {loading ? (
            <p className="text-gray-400 text-sm py-8 text-center">Lädt…</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {COLS.map(({ pos, label, max, border, badge }) => (
                <div key={pos} className={`glass rounded-xl border-t-2 ${border} overflow-hidden`}>
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
                      byPos[pos].map(sp => {
                        const lastGwPts = lastGw
                          ? (gwData?.points?.[sp.fplPlayer.id]?.[lastGw.id] ?? null)
                          : null;
                        return (
                          <div key={sp.id} className="px-2 py-1.5 bg-[#0f3460] rounded">
                            <div className="flex items-start justify-between gap-1 mb-0.5">
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-white truncate leading-tight">
                                  {sp.fplPlayer.webName}
                                </div>
                                <div className="text-[10px] text-gray-400 truncate">
                                  {sp.fplPlayer.teamName}
                                </div>
                              </div>
                            </div>
                            {/* Werte-Zeile */}
                            {(showPrice || showTotal || showLastGw) && (
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {showPrice && (
                                  <span className="text-[9px] font-bold text-yellow-400 bg-yellow-900/30 px-1.5 py-0.5 rounded">
                                    💰{sp.boughtFor}
                                  </span>
                                )}
                                {showTotal && (
                                  <span className="text-[9px] font-bold text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded">
                                    ⭐{sp.fplPlayer.totalPoints}
                                  </span>
                                )}
                                {showLastGw && lastGwPts !== null && (
                                  <span className="text-[9px] font-bold text-cyan-400 bg-cyan-900/30 px-1.5 py-0.5 rounded">
                                    GW{lastGw!.number}:{lastGwPts}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
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
