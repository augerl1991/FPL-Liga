"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SEASONS, SEASON_WINNERS } from "@/lib/prev-season-data";

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
  const defaultSeasonIdx = (() => {
    const last = [...SEASONS].reverse().findIndex((s) => s.data.length > 0);
    return last >= 0 ? SEASONS.length - 1 - last : SEASONS.length - 1;
  })();
  const [historyView, setHistoryView] = useState<"spielplan" | "gewinner">("spielplan");
  const [seasonIdx, setSeasonIdx] = useState(defaultSeasonIdx);
  const [seasonSubView, setSeasonSubView] = useState<"schedule" | "table">("schedule");
  const [historyGW, setHistoryGW] = useState(1);
  const historyRef = useRef<HTMLDivElement>(null);
  const seasonRef = useRef<HTMLButtonElement>(null);
  // Hover-Bild für Gewinnertafel: { season, x, y }
  const [hoverImg, setHoverImg] = useState<{ src: string; x: number; y: number } | null>(null);

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

  /* ── Tabelle aus Spieldaten berechnen ── */
  type Standing = {
    team: string; played: number; won: number; drawn: number; lost: number;
    gf: number; ga: number; gd: number; pts: number;
  };
  function calcTable(data: typeof SEASONS[0]["data"]): Standing[] {
    const map = new Map<string, Standing>();
    const get = (name: string) => {
      if (!map.has(name))
        map.set(name, { team: name, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 });
      return map.get(name)!;
    };
    for (const gw of data) {
      for (const m of gw.matches) {
        if (m.hs === null || m.as === null) continue;
        const h = get(m.home), a = get(m.away);
        h.played++; h.gf += m.hs; h.ga += m.as; h.gd = h.gf - h.ga;
        a.played++; a.gf += m.as; a.ga += m.hs; a.gd = a.gf - a.ga;
        if (m.hs > m.as) { h.won++; h.pts += 3; a.lost++; }
        else if (m.hs < m.as) { a.won++; a.pts += 3; h.lost++; }
        else { h.drawn++; h.pts++; a.drawn++; a.pts++; }
      }
    }
    return [...map.values()].sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  }

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
      setSeasonSubView("schedule");
    }

    return (
      <div>
        {/* Hover-Bild (fixed, folgt der Maus) */}
        {hoverImg && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{ left: hoverImg.x + 20, top: hoverImg.y - 10 }}
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#00ff87]/40"
              style={{ width: 280, height: 210 }}>
              <Image
                src={hoverImg.src}
                alt="Pokalübergabe"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#00ff87]">Liga-Historie</h1>
          <p className="text-xs text-gray-500 mt-0.5">Ergebnisse &amp; Gewinner aller Saisonen</p>
        </div>

        {/* View-Toggle: Spielplan | Gewinnertafel */}
        <div className="flex gap-2 mb-5">
          {(["spielplan", "gewinner"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setHistoryView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                historyView === v ? "bg-[#00ff87] text-black" : "glass-soft text-gray-300 hover:text-white"
              }`}
            >
              {v === "spielplan" ? "📅 Spielplan" : "🏆 Gewinnertafel"}
            </button>
          ))}
        </div>

        {/* ── GEWINNERTAFEL ── */}
        {historyView === "gewinner" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700">
              <span className="font-semibold text-white">Saisonsieger</span>
              <span className="text-xs text-gray-500 ml-2">Hover über den Sieger für das Foto</span>
            </div>
            {[...SEASON_WINNERS].reverse().map((w) => (
              <div
                key={w.season}
                className="flex items-center gap-4 px-4 py-3 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors"
              >
                <span className="text-sm text-gray-500 w-16 shrink-0">{w.season}</span>
                {w.image ? (
                  <span
                    className="text-sm font-semibold text-[#00ff87] cursor-default flex items-center gap-1.5"
                    onMouseMove={(e) => setHoverImg({ src: w.image!, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHoverImg(null)}
                  >
                    🏆 {w.winner}
                    <span className="text-[10px] text-gray-500 font-normal">(Foto)</span>
                  </span>
                ) : (
                  <span className={`text-sm font-semibold ${w.winner === "–" ? "text-gray-600" : "text-white"}`}>
                    {w.winner === "–" ? <span className="italic text-gray-600">noch nicht eingetragen</span> : <>🏆 {w.winner}</>}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── SPIELPLAN ── */}
        {historyView === "spielplan" && (
          <>
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

            {!hasData ? (
              <div className="glass rounded-xl px-6 py-12 text-center">
                <div className="text-4xl mb-3">📂</div>
                <p className="font-semibold text-gray-400">Keine Daten für {season.label}</p>
                <p className="text-sm mt-1 text-gray-600">Die Ergebnisse dieser Saison wurden noch nicht eingetragen.</p>
              </div>
            ) : (
              <>
                {/* Sub-View Toggle: Spielplan | Tabelle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSeasonSubView("schedule")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      seasonSubView === "schedule" ? "bg-[#04f5ff] text-black" : "glass-soft text-gray-400 hover:text-white"
                    }`}
                  >
                    Spielplan
                  </button>
                  <button
                    onClick={() => setSeasonSubView("table")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      seasonSubView === "table" ? "bg-[#04f5ff] text-black" : "glass-soft text-gray-400 hover:text-white"
                    }`}
                  >
                    Tabelle
                  </button>
                </div>

                {/* ── TABELLE ── */}
                {seasonSubView === "table" && (() => {
                  const rows = calcTable(season.data);
                  if (rows.length === 0)
                    return <p className="text-gray-500 text-sm py-4">Noch keine gespielten Spiele.</p>;
                  return (
                    <div className="glass rounded-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                        <span className="font-semibold text-white">Tabelle {season.label}</span>
                        <span className="text-xs text-gray-500">{rows[0].played} GW gespielt</span>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700">
                            <th className="px-4 py-2 text-left w-6">#</th>
                            <th className="px-4 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-center">Sp</th>
                            <th className="px-2 py-2 text-center">S</th>
                            <th className="px-2 py-2 text-center">U</th>
                            <th className="px-2 py-2 text-center">N</th>
                            <th className="px-2 py-2 text-center">Tore</th>
                            <th className="px-2 py-2 text-center">Diff</th>
                            <th className="px-4 py-2 text-center font-bold text-white">Pkt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <tr key={r.team} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                              <td className="px-4 py-2.5 text-gray-500 text-xs">{i + 1}</td>
                              <td className="px-4 py-2.5 font-semibold text-white">{r.team}</td>
                              <td className="px-2 py-2.5 text-center text-gray-400">{r.played}</td>
                              <td className="px-2 py-2.5 text-center text-[#00ff87]">{r.won}</td>
                              <td className="px-2 py-2.5 text-center text-gray-400">{r.drawn}</td>
                              <td className="px-2 py-2.5 text-center text-red-400">{r.lost}</td>
                              <td className="px-2 py-2.5 text-center text-gray-300">{r.gf}:{r.ga}</td>
                              <td className={`px-2 py-2.5 text-center ${r.gd > 0 ? "text-[#00ff87]" : r.gd < 0 ? "text-red-400" : "text-gray-400"}`}>
                                {r.gd > 0 ? "+" : ""}{r.gd}
                              </td>
                              <td className="px-4 py-2.5 text-center font-bold text-white">{r.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

                {/* ── SPIELPLAN (GW-Tabs + Matches) ── */}
                {seasonSubView === "schedule" && <>
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
                      <span className="font-semibold text-white">{season.label} · Spieltag {historyGW}</span>
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
                </>}
              </>
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
