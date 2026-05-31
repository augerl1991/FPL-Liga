"use client";
import { useEffect, useState } from "react";

type SquadPlayer = {
  id: number;
  boughtFor: number;
  fplPlayer: { id: number; webName: string; firstName: string; lastName: string; position: string; teamName: string; price: number; totalPoints: number };
};

const POS_ORDER = ["GK", "DEF", "MID", "FWD"];
const POS_LABELS: Record<string, string> = { GK: "Torhüter", DEF: "Abwehr", MID: "Mittelfeld", FWD: "Sturm" };

export default function KaderSeite() {
  const [squad, setSquad] = useState<SquadPlayer[]>([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    fetch("/api/auction")
      .then((r) => r.json())
      .then((data) => {
        if (data.squad) {
          setSquad(data.squad);
          setBudget(data.budget);
        }
      });
  }, []);

  const byPosition = POS_ORDER.map((pos) => ({
    pos,
    players: squad.filter((s) => s.fplPlayer.position === pos),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#00ff87]">Mein Kader</h1>
        <div className="bg-[#38003c] px-4 py-2 rounded-lg text-sm">
          <span className="text-gray-400">Restbudget: </span>
          <span className="text-[#00ff87] font-bold">{budget} Mio</span>
          <span className="text-gray-400 ml-4">Spieler: </span>
          <span className="font-bold">{squad.length}/25</span>
        </div>
      </div>

      {byPosition.map(({ pos, players }) => (
        <div key={pos} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {POS_LABELS[pos]} ({players.length}/{({ GK: 3, DEF: 8, MID: 8, FWD: 6 })[pos]})
          </h2>
          <div className="bg-[#16213e] rounded-xl overflow-hidden">
            {players.length === 0 ? (
              <p className="px-4 py-3 text-gray-500 text-sm">Noch keine Spieler</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {players.map((sp) => (
                    <tr key={sp.id} className="border-t border-gray-700 hover:bg-[#0f3460] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{sp.fplPlayer.webName}</div>
                        <div className="text-gray-400 text-xs">{sp.fplPlayer.teamName}</div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-400">{(sp.fplPlayer.price / 10).toFixed(1)}m</td>
                      <td className="px-4 py-3 text-center text-[#00ff87]">{sp.fplPlayer.totalPoints} Pkt</td>
                      <td className="px-4 py-3 text-center text-yellow-400 text-xs">Gekauft: {sp.boughtFor}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
