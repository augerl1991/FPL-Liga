"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";

type Row = {
  teamId: number; teamName: string; username: string;
  W: number; D: number; L: number; pts: number;
  scored: number; conceded: number; fplPoints: number;
};

// Champagner-Duell: Felix / Jul / Gerhard
const DUELL_USERS = ["felix", "jul", "gerhard"];
const DUELL_MARK: Record<number, { icon: string; magnum?: boolean; title: string; ring: string }> = {
  1: { icon: "👑", title: "Champagner-Duell: 1. Platz – der Sieger zahlt nichts! 👑", ring: "ring-yellow-400/60" },
  2: { icon: "🍾", title: "Champagner-Duell: 2. Platz – eine normale Flasche Champagner fällig 🍾", ring: "ring-gray-300/50" },
  3: { icon: "🍾", magnum: true, title: "Champagner-Duell: 3. (letzter) Platz – eine MAGNUM-Flasche Champagner fällig! 🍾🍾", ring: "ring-amber-600/60" },
};

// Whisky-Duell: Sebi vs Jul – der Letzte der beiden zahlt eine Flasche Whisky
const WHISKY_USERS = ["sebi", "jul"];

type Badge = { key: string; icon: string; magnum?: boolean; title: string; ring: string; big?: boolean };

export default function TabelleSeite() {
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;
  const [table, setTable] = useState<Row[]>([]);
  const [duell, setDuell] = useState(true);
  const [whisky, setWhisky] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const seasonId = 1;

  useEffect(() => {
    fetch(`/api/table?seasonId=${seasonId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setTable(data));
    fetch("/api/admin/config?key=champagnerDuell").then((r) => r.json()).then((d) => setDuell(d.value !== "0")).catch(() => {});
    fetch("/api/admin/config?key=whiskyDuell").then((r) => r.json()).then((d) => setWhisky(d.value !== "0")).catch(() => {});
  }, [seasonId]);

  function toggle(key: string, current: boolean, setter: (v: boolean) => void) {
    if (!isAdmin) return;
    const next = !current;
    setter(next);
    setSaving(key);
    fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: next ? "1" : "0" }),
    }).finally(() => setSaving(null));
  }

  const played = (r: Row) => r.W + r.D + r.L;

  // Ränge innerhalb der Duell-Teilnehmer (Tabellenreihenfolge ist maßgeblich)
  const champRank: Record<number, number> = {};
  if (duell) {
    table.filter((r) => DUELL_USERS.includes(r.username.toLowerCase()))
      .forEach((r, i) => { champRank[r.teamId] = i + 1; });
  }
  const whiskyRank: Record<number, number> = {};
  if (whisky) {
    table.filter((r) => WHISKY_USERS.includes(r.username.toLowerCase()))
      .forEach((r, i) => { whiskyRank[r.teamId] = i + 1; });
  }

  function badgesFor(teamId: number): Badge[] {
    const out: Badge[] = [];
    const cr = champRank[teamId];
    if (cr) {
      const m = DUELL_MARK[cr];
      out.push({ key: "champ", icon: m.icon, magnum: m.magnum, title: m.title, ring: m.ring, big: m.magnum });
    }
    // Whisky-Duell: Bester der zwei bekommt eine Krone, der Letzte zahlt (Glas)
    const wr = whiskyRank[teamId];
    if (wr === 1) {
      out.push({
        key: "whisky", icon: "👑",
        title: "Whisky-Duell (Sebi vs Jul): 1. Platz – zahlt nichts! 👑",
        ring: "ring-amber-400/60",
      });
    } else if (wr === 2) {
      out.push({
        key: "whisky", icon: "🥃", big: true,
        title: "Whisky-Duell (Sebi vs Jul): Letzter der beiden zahlt eine Flasche Whisky 🥃",
        ring: "ring-amber-700/70",
      });
    }
    return out;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-4">Liga-Tabelle</h1>

      {/* Admin-Kasterl: alle Ein-/Ausblend-Schalter gesammelt (gelbes Admin-Design) */}
      {isAdmin && (
        <div
          className="mb-5 rounded-2xl ring-1 ring-yellow-400/25 p-4"
          style={{ background: "linear-gradient(160deg, rgba(251,191,36,0.08) 0%, transparent 55%)" }}
        >
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-yellow-400/15 text-yellow-300 ring-1 ring-yellow-400/30">
              🔐 Admin · Anzeige
            </span>
            <span className="text-xs text-gray-400">Ein-/ausblenden für alle Mitglieder</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggle("champagnerDuell", duell, setDuell)}
              disabled={saving === "champagnerDuell"}
              title={duell ? "Champagner-Duell ausblenden" : "Champagner-Duell einblenden"}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                duell ? "bg-[#00ff87]/15 text-[#00ff87] ring-1 ring-[#00ff87]/30" : "glass-soft text-gray-500 line-through"
              }`}
            >
              🍾 Champagner-Duell
            </button>
            <button
              onClick={() => toggle("whiskyDuell", whisky, setWhisky)}
              disabled={saving === "whiskyDuell"}
              title={whisky ? "Whisky-Duell ausblenden" : "Whisky-Duell einblenden"}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                whisky ? "bg-[#00ff87]/15 text-[#00ff87] ring-1 ring-[#00ff87]/30" : "glass-soft text-gray-500 line-through"
              }`}
            >
              🥃 Whisky-Duell
            </button>
          </div>
        </div>
      )}

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
              const badges = badgesFor(row.teamId);
              return (
                <tr
                  key={row.teamId}
                  className={`border-t border-gray-700 hover:bg-[#0f3460] transition-colors ${
                    i < 3 ? "border-l-2 border-l-[#00ff87]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-gray-400 font-semibold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold flex items-center gap-1.5 flex-wrap">
                      {row.teamName}
                      {badges.map((b) => (
                        <span
                          key={b.key}
                          title={b.title}
                          className={`inline-flex items-center gap-0.5 rounded-full bg-black/30 ring-1 ${b.ring} px-1.5 py-0.5 leading-none cursor-help ${b.big ? "text-base" : "text-xs"}`}
                        >
                          {b.icon}
                          {b.magnum && <sup className="text-[7px] font-black text-amber-300 ml-0.5">XL</sup>}
                        </span>
                      ))}
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
      {duell && Object.keys(champRank).length > 0 && (
        <div className="mt-4 glass rounded-xl px-4 py-3 text-xs text-gray-300">
          <p className="font-semibold text-[#00ff87] mb-1.5">🥂 Champagner-Duell (Felix · Jul · Gerhard)</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-400">
            <span>👑 1. Platz – zahlt nichts</span>
            <span>🍾 2. Platz – normale Flasche Champagner</span>
            <span>🍾<sup className="text-[7px] font-black text-amber-300">XL</sup> 3. Platz – Magnum-Flasche Champagner</span>
          </div>
        </div>
      )}

      {/* Legende Whisky-Duell */}
      {whisky && Object.keys(whiskyRank).length > 0 && (
        <div className="mt-3 glass rounded-xl px-4 py-3 text-xs text-gray-300">
          <p className="font-semibold text-amber-400 mb-1.5">🥃 Whisky-Duell (Sebi · Jul)</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-400">
            <span>👑 1. Platz – zahlt nichts</span>
            <span>🥃 Letzter – zahlt eine Flasche Whisky</span>
          </div>
        </div>
      )}
    </div>
  );
}
