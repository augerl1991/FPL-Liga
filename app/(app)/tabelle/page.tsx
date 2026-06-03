"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";

type Row = {
  teamId: number; teamName: string; username: string;
  W: number; D: number; L: number; pts: number;
  scored: number; conceded: number; fplPoints: number;
};

// Teilnehmer des Champagner-Duells (per Username, case-insensitive)
const DUELL_USERS = ["felix", "jul", "gerhard"];

// Rang im Duell -> Markierung
const DUELL_MARK: Record<number, { icon: string; magnum?: boolean; title: string; ring: string }> = {
  1: { icon: "👑", title: "Champagner-Duell: 1. Platz – der Sieger zahlt nichts! 👑", ring: "ring-yellow-400/60" },
  2: { icon: "🍾", title: "Champagner-Duell: 2. Platz – eine normale Flasche Champagner fällig 🍾", ring: "ring-gray-300/50" },
  3: { icon: "🍾", magnum: true, title: "Champagner-Duell: 3. (letzter) Platz – eine MAGNUM-Flasche Champagner fällig! 🍾🍾", ring: "ring-amber-600/60" },
};

export default function TabelleSeite() {
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;
  const [table, setTable] = useState<Row[]>([]);
  const [duell, setDuell] = useState(true);
  const [savingDuell, setSavingDuell] = useState(false);
  const seasonId = 1;

  useEffect(() => {
    fetch(`/api/table?seasonId=${seasonId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setTable(data));
    fetch("/api/admin/config?key=champagnerDuell")
      .then((r) => r.json())
      .then((d) => setDuell(d.value !== "0"))
      .catch(() => {});
  }, [seasonId]);

  function toggleDuell() {
    if (!isAdmin) return;
    const next = !duell;
    setDuell(next);
    setSavingDuell(true);
    fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "champagnerDuell", value: next ? "1" : "0" }),
    }).finally(() => setSavingDuell(false));
  }

  const played = (r: Row) => r.W + r.D + r.L;

  // Rang innerhalb der drei Duell-Teilnehmer ermitteln (Tabellenreihenfolge = maßgeblich)
  const duellRank: Record<number, number> = {};
  if (duell) {
    const participants = table.filter((r) => DUELL_USERS.includes(r.username.toLowerCase()));
    participants.forEach((r, i) => { duellRank[r.teamId] = i + 1; });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-[#00ff87]">Liga-Tabelle</h1>
        {isAdmin && (
          <button
            onClick={toggleDuell}
            disabled={savingDuell}
            title={duell ? "Champagner-Duell ausblenden" : "Champagner-Duell einblenden"}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
              duell
                ? "bg-[#00ff87]/15 text-[#00ff87] ring-1 ring-[#00ff87]/30"
                : "glass-soft text-gray-500 line-through"
            }`}
          >
            🍾 Champagner-Duell
          </button>
        )}
      </div>

      <div className="glass rounded-xl overflow-hidden shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#38003c] text-[#00ff87] text-left">
              <th className="px-4 py-3 w-8">#</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3 text-center" title="Spiele">Sp</th>
              <th className="px-4 py-3 text-center text-green-400" title="Siege">S</th>
              <th className="px-4 py-3 text-center text-yellow-400" title="Unentschieden">U</th>
              <th className="px-4 py-3 text-center text-red-400" title="Niederlagen">N</th>
              <th className="px-4 py-3 text-center" title="Tore geschossen">T+</th>
              <th className="px-4 py-3 text-center" title="Tore kassiert">T-</th>
              <th className="px-4 py-3 text-center" title="Tordifferenz">TD</th>
              <th className="px-4 py-3 text-center text-purple-400" title="Gesamt FPL-Punkte">FPL</th>
              <th className="px-4 py-3 text-center font-bold" title="Ligapunkte">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => {
              const gd = row.scored - row.conceded;
              const rank = duellRank[row.teamId];
              const mark = rank ? DUELL_MARK[rank] : null;
              return (
                <tr
                  key={row.teamId}
                  className={`border-t border-gray-700 hover:bg-[#0f3460] transition-colors ${
                    i < 3 ? "border-l-2 border-l-[#00ff87]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-gray-400 font-semibold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold flex items-center gap-1.5">
                      {row.teamName}
                      {mark && (
                        <span
                          title={mark.title}
                          className={`inline-flex items-center gap-0.5 rounded-full bg-black/30 ring-1 ${mark.ring} px-1.5 py-0.5 leading-none cursor-help ${mark.magnum ? "text-base" : "text-xs"}`}
                        >
                          {mark.icon}
                          {mark.magnum && <sup className="text-[7px] font-black text-amber-300 ml-0.5">XL</sup>}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs">{row.username}</div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">{played(row)}</td>
                  <td className="px-4 py-3 text-center text-green-400 font-semibold">{row.W}</td>
                  <td className="px-4 py-3 text-center text-yellow-400">{row.D}</td>
                  <td className="px-4 py-3 text-center text-red-400">{row.L}</td>
                  <td className="px-4 py-3 text-center">{row.scored}</td>
                  <td className="px-4 py-3 text-center">{row.conceded}</td>
                  <td className={`px-4 py-3 text-center font-semibold ${gd > 0 ? "text-green-400" : gd < 0 ? "text-red-400" : "text-gray-400"}`}>
                    {gd > 0 ? `+${gd}` : gd}
                  </td>
                  <td className="px-4 py-3 text-center text-purple-400 font-semibold">{row.fplPoints}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#00ff87] text-base">{row.pts}</td>
                </tr>
              );
            })}
            {table.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                  Noch keine Spiele gespielt
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600 mt-3">
        Sp = Spiele · S/U/N = Sieg/Unentschieden/Niederlage · T+/T− = Tore · TD = Tordifferenz · FPL = Gesamtpunkte · Pts = Ligapunkte
      </p>

      {/* Legende Champagner-Duell */}
      {duell && Object.keys(duellRank).length > 0 && (
        <div className="mt-4 glass rounded-xl px-4 py-3 text-xs text-gray-300">
          <p className="font-semibold text-[#00ff87] mb-1.5">🥂 Champagner-Duell (Felix · Jul · Gerhard)</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-400">
            <span>👑 1. Platz – zahlt nichts</span>
            <span>🍾 2. Platz – normale Flasche Champagner</span>
            <span>🍾<sup className="text-[7px] font-black text-amber-300">XL</sup> 3. Platz – Magnum-Flasche Champagner</span>
          </div>
        </div>
      )}
    </div>
  );
}
