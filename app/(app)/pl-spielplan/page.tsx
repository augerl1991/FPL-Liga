"use client";
import { useEffect, useState, useRef } from "react";

type Fixture = {
  id: number;
  gameweek: number | null;
  kickoff: string | null;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  finished: boolean;
  started: boolean;
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
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [gameweeks, setGameweeks] = useState<number[]>([]);
  const [selectedGW, setSelectedGW] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentGWRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/pl-fixtures")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(d.error); setLoading(false); return; }
        setFixtures(d.fixtures);
        setGameweeks(d.gameweeks);

        // Aktuellen GW bestimmen: erster mit nicht-fertigen Spielen
        const current = d.gameweeks.find((gw: number) =>
          d.fixtures.some((f: Fixture) => f.gameweek === gw && !f.finished)
        ) ?? d.gameweeks[d.gameweeks.length - 1];
        setSelectedGW(current ?? null);
        setLoading(false);
      })
      .catch(() => { setError("FPL API nicht erreichbar"); setLoading(false); });
  }, []);

  // Scroll zum aktuellen GW
  useEffect(() => {
    if (selectedGW !== null) currentGWRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedGW]);

  const shown = fixtures.filter((f) => f.gameweek === selectedGW);

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#00ff87]">Premier League Spielplan</h1>
          <p className="text-xs text-gray-500 mt-0.5">Daten via FPL API · Platzhalter bis neuer Spielplan verfügbar</p>
        </div>
      </div>

      {loading && <p className="text-gray-400 text-center py-16">Lädt…</p>}
      {error && <p className="text-red-400 text-center py-8">{error}</p>}

      {!loading && !error && (
        <>
          {/* GW-Auswahl – horizontal scrollbar */}
          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex gap-1.5 w-max">
              {gameweeks.map((gw) => {
                const gwFixtures = fixtures.filter((f) => f.gameweek === gw);
                const allDone = gwFixtures.every((f) => f.finished);
                const isCurrent = gw === selectedGW;
                return (
                  <div key={gw} ref={isCurrent ? currentGWRef : null}>
                    <button
                      onClick={() => setSelectedGW(gw)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                        isCurrent
                          ? "bg-[#00ff87] text-black"
                          : allDone
                          ? "bg-[#16213e] text-gray-400"
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

          {/* Spiele des gewählten GW */}
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
                      <div
                        key={f.id}
                        className={`flex items-center px-4 py-3 border-b border-gray-800 last:border-0 ${
                          f.started && !f.finished ? "bg-green-900/20" : ""
                        }`}
                      >
                        {/* Datum + Uhrzeit */}
                        <div className="w-24 shrink-0 text-xs text-gray-400 text-center">
                          <div>{date}</div>
                          <div className="text-gray-500">{time}</div>
                        </div>

                        {/* Heimteam */}
                        <div className="flex-1 text-right">
                          <span className={`text-sm font-semibold ${f.finished ? "text-white" : "text-gray-300"}`}>
                            {f.homeTeam}
                          </span>
                        </div>

                        {/* Ergebnis / Status */}
                        <div className="mx-4 min-w-[56px] text-center">
                          {f.finished ? (
                            <span className="text-lg font-bold text-[#00ff87]">
                              {f.homeScore} : {f.awayScore}
                            </span>
                          ) : f.started ? (
                            <span className="text-sm font-bold text-green-400 animate-pulse">Live</span>
                          ) : (
                            <span className="text-xs text-gray-500">vs</span>
                          )}
                        </div>

                        {/* Auswärtsteam */}
                        <div className="flex-1 text-left">
                          <span className={`text-sm font-semibold ${f.finished ? "text-white" : "text-gray-300"}`}>
                            {f.awayTeam}
                          </span>
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
