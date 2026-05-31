"use client";
import { useEffect, useState } from "react";

type Row = {
  teamId: number; teamName: string; username: string;
  W: number; D: number; L: number; pts: number;
  scored: number; conceded: number; fplPoints: number;
};

export default function TabelleSeite() {
  const [table, setTable] = useState<Row[]>([]);
  const seasonId = 1;

  useEffect(() => {
    fetch(`/api/table?seasonId=${seasonId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setTable(data));
  }, [seasonId]);

  const played = (r: Row) => r.W + r.D + r.L;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#00ff87] mb-6">Liga-Tabelle</h1>
      <div className="bg-[#16213e] rounded-xl overflow-hidden shadow-lg overflow-x-auto">
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
              return (
                <tr
                  key={row.teamId}
                  className={`border-t border-gray-700 hover:bg-[#0f3460] transition-colors ${
                    i < 3 ? "border-l-2 border-l-[#00ff87]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-gray-400 font-semibold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{row.teamName}</div>
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
    </div>
  );
}
