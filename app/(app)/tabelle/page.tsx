"use client";
import { useEffect, useState } from "react";

type Row = { teamId: number; teamName: string; username: string; W: number; D: number; L: number; pts: number; scored: number; conceded: number };

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
      <div className="bg-[#16213e] rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#38003c] text-[#00ff87] text-left">
              <th className="px-4 py-3 w-8">#</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3 text-center">Sp</th>
              <th className="px-4 py-3 text-center">S</th>
              <th className="px-4 py-3 text-center">U</th>
              <th className="px-4 py-3 text-center">N</th>
              <th className="px-4 py-3 text-center">Pkt+</th>
              <th className="px-4 py-3 text-center">Pkt-</th>
              <th className="px-4 py-3 text-center font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={row.teamId} className={`border-t border-gray-700 hover:bg-[#0f3460] transition-colors ${i < 3 ? "border-l-2 border-l-[#00ff87]" : ""}`}>
                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{row.teamName}</div>
                  <div className="text-gray-400 text-xs">{row.username}</div>
                </td>
                <td className="px-4 py-3 text-center text-gray-400">{played(row)}</td>
                <td className="px-4 py-3 text-center text-green-400">{row.W}</td>
                <td className="px-4 py-3 text-center text-yellow-400">{row.D}</td>
                <td className="px-4 py-3 text-center text-red-400">{row.L}</td>
                <td className="px-4 py-3 text-center">{row.scored}</td>
                <td className="px-4 py-3 text-center">{row.conceded}</td>
                <td className="px-4 py-3 text-center font-bold text-[#00ff87]">{row.pts}</td>
              </tr>
            ))}
            {table.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  Noch keine Spiele gespielt
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
