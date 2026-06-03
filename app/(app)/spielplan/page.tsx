"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Match = { id: number; homeTeamId: number; awayTeamId: number; homePoints: number | null; awayPoints: number | null; played: boolean; homeTeam: { name: string }; awayTeam: { name: string } };
type Gameweek = { id: number; number: number; matches: Match[] };

function Spielbericht({ gameweekId }: { gameweekId: number }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[] | null>(null);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  function load() {
    if (lines) { setOpen((o) => !o); return; }
    fetch(`/api/spielbericht?gameweekId=${gameweekId}`)
      .then((r) => r.json())
      .then((d) => { setLines(d.lines ?? []); setText(d.text ?? ""); setOpen(true); })
      .catch(() => setLines([]));
  }

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="border-t border-gray-700 bg-[#0a1628]/40">
      <button onClick={load} className="w-full text-left px-4 py-2 text-xs text-[#04f5ff] hover:bg-white/5 transition-colors flex items-center gap-1.5">
        📝 Spieltagsbericht {open ? "▲" : "▼"}
      </button>
      {open && lines && (
        <div className="px-4 pb-3">
          <div className="glass rounded-lg p-3 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
            {lines.length === 0 ? <span className="text-gray-500">Noch keine gespielten Partien.</span> : lines.join("\n")}
          </div>
          {lines.length > 0 && (
            <button onClick={copy} className="mt-2 text-xs glass-soft hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors">
              {copied ? "✓ Kopiert!" : "📋 Für WhatsApp kopieren"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function SpielplanSeite() {
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [pendingGwNrs, setPendingGwNrs] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/spielplan?seasonId=1")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setGameweeks(d);
          const first = d.find((gw: Gameweek) => gw.matches.some((m) => !m.played));
          if (first) setExpanded(first.id);
        }
      });
    fetch("/api/admin/config?key=pendingGwNrs")
      .then((r) => r.json())
      .then((d) => {
        const nrs = (d.value ?? "").split(",").map(Number).filter((n: number) => n > 0);
        setPendingGwNrs(nrs);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-6">Spielplan</h1>
      <div className="space-y-2">
        {gameweeks.map((gw) => {
          const allPlayed = gw.matches.every((m) => m.played);
          const isPending = pendingGwNrs.includes(gw.number);
          return (
            <div key={gw.id} className={`glass rounded-xl overflow-hidden ${isPending ? "ring-1 ring-yellow-400/30" : ""}`}>
              <button
                onClick={() => setExpanded(expanded === gw.id ? null : gw.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#0f3460] transition-colors"
              >
                <span className="font-semibold flex items-center gap-2">
                  Spieltag {gw.number}
                  {isPending && <span title="Nachtragspartie ausstehend" className="text-xs font-normal text-yellow-300 bg-yellow-400/15 px-2 py-0.5 rounded-full ring-1 ring-yellow-400/30">⚠️ Nachtrag ausstehend</span>}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${allPlayed ? "bg-green-800 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                  {allPlayed ? "Gespielt" : "Ausstehend"}
                </span>
              </button>
              {expanded === gw.id && (
                <div className="border-t border-gray-700">
                  {gw.matches.map((m) => (
                    <Link
                      key={m.id}
                      href={`/spiel/${m.id}`}
                      className="flex items-center px-4 py-2 border-b border-gray-800 last:border-0 hover:bg-[#0f3460] transition-colors group"
                    >
                      <span className="flex-1 text-right text-sm group-hover:text-[#00ff87] transition-colors">
                        {m.homeTeam.name}
                      </span>
                      <span className="mx-4 text-center min-w-[60px] font-bold text-[#00ff87]">
                        {m.played ? `${m.homePoints} : ${m.awayPoints}` : "vs"}
                      </span>
                      <span className="flex-1 text-left text-sm group-hover:text-[#00ff87] transition-colors">
                        {m.awayTeam.name}
                      </span>
                    </Link>
                  ))}
                  {gw.matches.some((m) => m.played) && <Spielbericht gameweekId={gw.id} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
