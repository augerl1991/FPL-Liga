"use client";
import { useEffect, useRef, useState } from "react";
import { SEASONS } from "@/lib/prev-season-data";

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
  // Neueste Saison mit Daten als Standard; fallback: letzte im Array
  const defaultSeasonIdx = (() => {
    const last = [...SEASONS].reverse().findIndex((s) => s.data.length > 0);
    return last >= 0 ? SEASONS.length - 1 - last : SEASONS.length - 1;
  })();
  const [seasonIdx, setSeasonIdx] = useState(defaultSeasonIdx);
  const [historyGW, setHistoryGW] = useState(1);
  const historyRef = useRef<HTMLDivElement>(null);
  const seasonRef = useRef<HTMLButtonElement>(null);

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

  /* Scroll to selected season tab */
  useEffect(() => {
    seasonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [seasonIdx]);

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
    const season = SEASONS[seasonIdx];
    const gwData = season.data.find((g) => g.gw === historyGW);
    const hasData = season.data.length > 0;

    function selectSeason(idx: number) {
      setSeasonIdx(idx);
      setHistoryGW(1);
    }

    return (
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#00ff87]">Liga-Historie</h1>
          <p className="text-xs text-gray-500 mt-0.5">Ergebnisse aller Saisonen</p>
        </div>

        {/* Saison-Tabs */}
        <div className="overflow-x-auto pb-2 mb-5 no-scrollbar">
          <div className="flex gap-1.5 w-max">
            {SEASONS.map((s, i) => {
              const active = i === seasonIdx;
              return (
                <button
                  key={s.label}
                  ref={active ? seasonRef : null}
                  onClick={() => selectSeason(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    active
                      ? "bg-[#00ff87] text-black"
                      : s.data.length > 0
                      ? "glass text-white hover:bg-[#0f3460]"
                      : "glass text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spieltag-Tabs (nur wenn Daten vorhanden) */}
        {!hasData ? (
          <div className="glass rounded-xl px-6 py-12 text-center text-gray-500">
            <div className="text-4xl mb-3">📂</div>
            <p className="font-semibold text-gray-400">Keine Daten für {season.label}</p>
            <p className="text-sm mt-1">Die Ergebnisse dieser Saison wurden noch nicht eingetragen.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto pb-2 mb-6 no-scrollbar">
              <div className="flex gap-1.5 w-max">
                {season.data.map(({ gw }) => {
                  const gwMatches = season.data.find((g) => g.gw === gw)?.matches ?? [];
                  const allDone = gwMatches.every((m) => m.hs !== null && m.as !== null);
                  const isCurrent = gw === historyGW;
                  return (
                    <div key={gw} ref={isCurrent ? historyRef : null}>
                      <button
                        onClick={() => setHistoryGW(gw)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                          isCurrent ? "bg-[#04f5ff] text-black"
                            : allDone ? "glass text-gray-400"
                            : "glass hover:bg-[#0f3460] text-white"
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
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <span className="font-semibold text-white">
                    {season.label} · Spieltag {historyGW}
                  </span>
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
          </>
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
                          : allDone ? "glass text-gray-400"
                          : "glass hover:bg-[#0f3460] text-white"
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
            <div className="glass rounded-xl overflow-hidden">
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
