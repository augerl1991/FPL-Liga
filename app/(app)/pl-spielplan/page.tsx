"use client";
import { useEffect, useRef, useState } from "react";
import { PREV_SEASON, PREV_SEASON_NAME } from "@/lib/prev-season-data";

/* ── Live-FPL-Typen ── */
type Fixture = {
  id: number; gameweek: number | null; kickoff: string | null;
  homeTeam: string; awayTeam: string;
  homeScore: number | null; awayScore: number | null;
  finished: boolean; started: boolean;
};

function formatKickoff(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "–", time: "–" };
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("de-AT", { weekday: "short", day: "2-digit", month: "2-digit" }),
    time: d.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function PLSpielplanSeite() {
  const [plMode, setPlMode] = useState<"history" | "live" | null>(null);

  /* ── History-State ── */
  const [historyGW, setHistoryGW] = useState(1);
  const historyRef = useRef<HTMLDivElement>(null);

  /* ── Live-State ── */
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [liveGWs, setLiveGWs] = useState<number[]>([]);
  const [selectedGW, setSelectedGW] = useState<number | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState("");
  const liveRef = useRef<HTMLDivElement>(null);

  /* Modus laden */
  useEffect(() => {
    fetch("/api/admin/config?key=plMode")
      .then((r) => r.json())
      .then((d) => setPlMode(d.value === "live" ? "live" : "history"));
  }, []);

  /* Live-Daten laden wenn Modus = live */
  useEffect(() => {
    if (plMode !== "live") return;
    setLiveLoading(true);
    fetch("/api/pl-fixtures")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setLiveError(d.error); setLiveLoading(false); return; }
        setFixtures(d.fixtures);
        setLiveGWs(d.gameweeks);
        const current = d.gameweeks.find((gw: number) =>
          d.fixtures.some((f: Fixture) => f.gameweek === gw && !f.finished)
        ) ?? d.gameweeks[d.gameweeks.length - 1];
        setSelectedGW(current ?? null);
        setLiveLoading(false);
      })
      .catch(() => { setLiveError("FPL API nicht erreichbar"); setLiveLoading(false); });
  }, [plMode]);

  /* Scroll to current GW */
  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [historyGW]);
  useEffect(() => {
    liveRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedGW]);

  if (plMode === null) return <p className="text-gray-400 text-center py-16">Lädt…</p>;

  /* ══════════════════════════════════════════
     HISTORY MODE
  ══════════════════════════════════════════ */
  if (plMode === "history") {
    const gwData = PREV_SEASON.find((g) => g.gw === historyGW);
    return (
      <div>
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-[#00ff87]">Liga-Spielplan {PREV_SEASON_NAME}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Ergebnisse der vergangenen Saison</p>
        </div>

        <div className="overflow-x-auto pb-2 mb-6">
          <div className="flex gap-1.5 w-max">
            {PREV_SEASON.map(({ gw }) => {
              const gwMatches = PREV_SEASON.find((g) => g.gw === gw)?.matches ?? [];
              const allDone = gwMatches.every((m) => m.hs !== null && m.as !== null);
              const isCurrent = gw === historyGW;
              return (
                <div key={gw} ref={isCurrent ? historyRef : null}>
                  <button
                    onClick={() => setHistoryGW(gw)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                      isCurrent ? "bg-[#00ff87] text-black"
                        : allDone ? "bg-[#16213e] text-gray-400"
                        : "bg-[#16213e] hover:bg-[#0f3460] text-white"
                    }`}
                  >
                    GW {gw}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {gwData && (
          <div className="bg-[#16213e] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-white">Spieltag {historyGW}</span>
              <span className="text-xs text-gray-400">
                {gwData.matches.filter((m) => m.hs !== null && m.as !== null).length} / {gwData.matches.length} gespielt
              </span>
            </div>
            <div>
              {gwData.matches.map((m, i) => {
                const finished = m.hs !== null && m.as !== null;
                const homeWin = finished && m.hs! > m.as!;
                const awayWin = finished && m.as! > m.hs!;
                return (
                  <div key={i} className="flex items-center px-4 py-3 border-b border-gray-800 last:border-0">
                    <div className="flex-1 text-right">
                      <span className={`text-sm font-semibold ${homeWin ? "text-[#00ff87]" : finished ? "text-white" : "text-gray-400"}`}>
                        {m.home}
                      </span>
                    </div>
                    <div className="mx-4 min-w-[64px] text-center">
                      {finished
                        ? <span className="text-lg font-bold text-[#00ff87]">{m.hs} : {m.as}</span>
                        : <span className="text-xs text-gray-500">vs</span>}
                    </div>
                    <div className="flex-1 text-left">
                      <span className={`text-sm font-semibold ${awayWin ? "text-[#00ff87]" : finished ? "text-white" : "text-gray-400"}`}>
                        {m.away}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════
     LIVE MODE (FPL API)
  ══════════════════════════════════════════ */
  const shown = fixtures.filter((f) => f.gameweek === selectedGW);
  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#00ff87]">Premier League Spielplan</h1>
          <p className="text-xs text-gray-500 mt-0.5">Daten via FPL API</p>
        </div>
      </div>

      {liveLoading && <p className="text-gray-400 text-center py-16">Lädt…</p>}
      {liveError && <p className="text-red-400 text-center py-8">{liveError}</p>}

      {!liveLoading && !liveError && (
        <>
          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex gap-1.5 w-max">
              {liveGWs.map((gw) => {
                const gwFixtures = fixtures.filter((f) => f.gameweek === gw);
                const allDone = gwFixtures.every((f) => f.finished);
                const isCurrent = gw === selectedGW;
                return (
                  <div key={gw} ref={isCurrent ? liveRef : null}>
                    <button
                      onClick={() => setSelectedGW(gw)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                        isCurrent ? "bg-[#00ff87] text-black"
                          : allDone ? "bg-[#16213e] text-gray-400"
                          : "bg-[#16213e] hover:bg-[#0f3460] text-white"
                      }`}
                    >
                      GW {gw}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedGW !== null && (
            <div className="bg-[#16213e] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <span className="font-semibold text-white">Spieltag {selectedGW}</span>
                <span className="text-xs text-gray-400">
                  {shown.filter((f) => f.finished).length} / {shown.length} gespielt
                </span>
              </div>
              {shown.length === 0 ? (
                <p className="px-4 py-8 text-center text-gray-500 text-sm">Keine Spiele vorhanden</p>
              ) : (
                <div>
                  {shown.map((f) => {
                    const { date, time } = formatKickoff(f.kickoff);
                    return (
                      <div key={f.id} className={`flex items-center px-4 py-3 border-b border-gray-800 last:border-0 ${f.started && !f.finished ? "bg-green-900/20" : ""}`}>
                        <div className="w-24 shrink-0 text-xs text-gray-400 text-center">
                          <div>{date}</div>
                          <div className="text-gray-500">{time}</div>
                        </div>
                        <div className="flex-1 text-right">
                          <span className={`text-sm font-semibold ${f.finished ? "text-white" : "text-gray-300"}`}>{f.homeTeam}</span>
                        </div>
                        <div className="mx-4 min-w-[56px] text-center">
                          {f.finished
                            ? <span className="text-lg font-bold text-[#00ff87]">{f.homeScore} : {f.awayScore}</span>
                            : f.started
                            ? <span className="text-sm font-bold text-green-400 animate-pulse">Live</span>
                            : <span className="text-xs text-gray-500">vs</span>}
                        </div>
                        <div className="flex-1 text-left">
                          <span className={`text-sm font-semibold ${f.finished ? "text-white" : "text-gray-300"}`}>{f.awayTeam}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
