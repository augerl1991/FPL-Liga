"use client";
import { useEffect, useState } from "react";

type SquadPlayer = {
  id: number;
  boughtFor: number;
  fplPlayer: { id: number; webName: string; firstName: string; lastName: string; position: string; teamName: string; totalPoints: number };
};

type Gameweek = { id: number; number: number };
type SquadPoints = { gameweeks: Gameweek[]; points: Record<number, Record<number, number>> };

const POS_ORDER = ["GK", "DEF", "MID", "FWD"];
const POS_LABELS: Record<string, string> = { GK: "Torhüter", DEF: "Abwehr", MID: "Mittelfeld", FWD: "Sturm" };

export default function KaderSeite() {
  const [squad, setSquad] = useState<SquadPlayer[]>([]);
  const [budget, setBudget] = useState(0);
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([]);
  const [points, setPoints] = useState<Record<number, Record<number, number>>>({});
  const [showCount, setShowCount] = useState(5);

  useEffect(() => {
    fetch("/api/auction")
      .then((r) => r.json())
      .then((data) => {
        if (data.squad) {
          setSquad(data.squad);
          setBudget(data.budget);
        }
      });
    fetch("/api/squad-points")
      .then((r) => r.json())
      .then((data: SquadPoints) => {
        if (data.gameweeks) {
          setGameweeks(data.gameweeks);
          setPoints(data.points ?? {});
        }
      });
  }, []);

  const byPosition = POS_ORDER.map((pos) => ({
    pos,
    players: squad.filter((s) => s.fplPlayer.position === pos),
  }));

  // Die letzten `showCount` Spieltage (gameweeks sind aufsteigend sortiert)
  const shownGws = gameweeks.slice(Math.max(0, gameweeks.length - showCount));
  const maxCount = Math.min(5, gameweeks.length || 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#00ff87]">Mein Kader</h1>
        <div className="bg-[#38003c] px-4 py-2 rounded-lg text-sm flex items-center gap-4">
          <span>
            <span className="text-gray-400">Ausgegeben: </span>
            <span className="text-yellow-400 font-bold">{560 - budget} Mio</span>
          </span>
          <span>
            <span className="text-gray-400">Restbudget: </span>
            <span className="text-[#00ff87] font-bold">{budget} Mio</span>
          </span>
          <span>
            <span className="text-gray-400">Spieler: </span>
            <span className="font-bold">{squad.length}/25</span>
          </span>
        </div>
      </div>

      {/* Auswahl: wie viele der letzten Spieltage anzeigen */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <span className="text-gray-400">Letzte Spieltage:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setShowCount(n)}
            disabled={n > maxCount}
            className={`w-8 h-8 rounded-lg font-semibold transition-colors ${
              showCount === n
                ? "bg-[#00ff87] text-black"
                : "glass-soft text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {byPosition.map(({ pos, players }) => (
        <div key={pos} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {POS_LABELS[pos]} ({players.length}/{({ GK: 3, DEF: 8, MID: 8, FWD: 6 })[pos]})
          </h2>
          <div className="glass rounded-xl overflow-x-auto">
            {players.length === 0 ? (
              <p className="px-4 py-3 text-gray-500 text-sm">Noch keine Spieler</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-2 text-left font-medium">Spieler</th>
                    <th className="px-4 py-2 text-center font-medium">Gesamt</th>
                    {shownGws.map((gw) => (
                      <th key={gw.id} className="px-3 py-2 text-center font-medium whitespace-nowrap">
                        GW{gw.number}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-center font-medium">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((sp) => (
                    <tr key={sp.id} className="border-t border-gray-700 hover:bg-[#0f3460] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{sp.fplPlayer.webName}</div>
                        <div className="text-gray-400 text-xs">{sp.fplPlayer.teamName}</div>
                      </td>
                      <td className="px-4 py-3 text-center text-[#00ff87]">{sp.fplPlayer.totalPoints} Pkt</td>
                      {shownGws.map((gw) => {
                        const p = points[sp.fplPlayer.id]?.[gw.id];
                        return (
                          <td key={gw.id} className="px-3 py-3 text-center text-gray-200">
                            {p ?? <span className="text-gray-600">–</span>}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center text-yellow-400 font-semibold">{sp.boughtFor} Mio</td>
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
