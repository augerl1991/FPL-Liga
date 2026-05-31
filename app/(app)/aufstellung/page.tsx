"use client";
import { useEffect, useState } from "react";

type Player = { id: number; webName: string; position: string; teamName: string };
type SlotData = { fplPlayerId: number; position: number; isCaptain: boolean; isViceCaptain: boolean };
type SquadPlayer = { id: number; boughtFor: number; fplPlayer: Player };

const POS_ORDER = ["GK", "DEF", "MID", "FWD"];

export default function AufstellungSeite() {
  const [squad, setSquad] = useState<SquadPlayer[]>([]);
  const [gameweeks, setGameweeks] = useState<{ id: number; number: number }[]>([]);
  const [selectedGW, setSelectedGW] = useState<number>(0);
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [deadline, setDeadline] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auction").then((r) => r.json()).then((d) => d.squad && setSquad(d.squad));
    fetch("/api/gameweeks").then((r) => r.json()).then((d) => {
      if (Array.isArray(d) && d.length > 0) {
        setGameweeks(d);
        setSelectedGW(d[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedGW) return;
    fetch(`/api/lineup?gameweekId=${selectedGW}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.slots) setSlots(data.slots);
        else {
          // Standardaufstellung aus Kader erstellen
          setSlots([]);
        }
      });
    fetch(`/api/gameweeks/${selectedGW}/deadline`)
      .then((r) => r.json())
      .then((d) => d.deadline && setDeadline(new Date(d.deadline).toLocaleString("de-AT")));
  }, [selectedGW]);

  function toggleStarter(playerId: number) {
    const inSlots = slots.find((s) => s.fplPlayerId === playerId);
    if (inSlots) {
      if (inSlots.position <= 11) {
        // Starter → Bank (position 12+)
        const bankSlots = slots.filter((s) => s.position > 11);
        if (bankSlots.length >= 7) { setError("Bank ist voll (7 Spieler)"); return; }
        setSlots(slots.map((s) => s.fplPlayerId === playerId ? { ...s, position: 12 + bankSlots.length } : s));
      } else {
        // Bank → Starter
        const starters = slots.filter((s) => s.position <= 11);
        if (starters.length >= 11) { setError("Startelf ist voll (11 Spieler)"); return; }
        setSlots(slots.map((s) => s.fplPlayerId === playerId ? { ...s, position: starters.length + 1 } : s));
      }
    } else {
      // Spieler hinzufügen
      const total = slots.length;
      if (total >= 18) { setError("Spieltagskader voll (18 Spieler)"); return; }
      const starters = slots.filter((s) => s.position <= 11);
      const pos = starters.length < 11 ? starters.length + 1 : 12 + (slots.length - starters.length);
      setSlots([...slots, { fplPlayerId: playerId, position: pos, isCaptain: false, isViceCaptain: false }]);
    }
    setError("");
  }

  function setCaptain(playerId: number) {
    setSlots(slots.map((s) => ({
      ...s,
      isCaptain: s.fplPlayerId === playerId,
      isViceCaptain: s.isViceCaptain && s.fplPlayerId !== playerId,
    })));
  }

  function setVice(playerId: number) {
    setSlots(slots.map((s) => ({
      ...s,
      isViceCaptain: s.fplPlayerId === playerId,
      isCaptain: s.isCaptain && s.fplPlayerId !== playerId,
    })));
  }

  async function saveLineup() {
    if (slots.length !== 18) { setError("Genau 18 Spieler auswählen"); return; }
    const res = await fetch("/api/lineup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameweekId: selectedGW, slots }),
    });
    if (res.ok) { setSaved(true); setError(""); setTimeout(() => setSaved(false), 3000); }
    else { const d = await res.json(); setError(d.error); }
  }

  const starters = slots.filter((s) => s.position <= 11).sort((a, b) => a.position - b.position);
  const bank = slots.filter((s) => s.position > 11).sort((a, b) => a.position - b.position);
  const inSquad = new Set(slots.map((s) => s.fplPlayerId));
  const byPos = POS_ORDER.map((pos) => squad.filter((sp) => sp.fplPlayer.position === pos));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#00ff87]">Aufstellung</h1>
        <select
          value={selectedGW}
          onChange={(e) => setSelectedGW(Number(e.target.value))}
          className="bg-[#38003c] text-white px-3 py-2 rounded-lg border border-gray-600"
        >
          {gameweeks.map((gw) => (
            <option key={gw.id} value={gw.id}>Spieltag {gw.number}</option>
          ))}
        </select>
      </div>

      {deadline && <p className="text-sm text-gray-400">Deadline: <span className="text-yellow-400">{deadline}</span></p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linke Spalte: Spieltagskader */}
        <div className="space-y-4">
          <div className="bg-[#16213e] rounded-xl p-4">
            <h2 className="text-sm font-semibold text-[#00ff87] mb-3">Startelf ({starters.length}/11)</h2>
            <div className="space-y-1">
              {starters.map((s) => {
                const sp = squad.find((q) => q.fplPlayer.id === s.fplPlayerId);
                if (!sp) return null;
                return (
                  <div key={s.fplPlayerId} className="flex items-center gap-2 bg-[#0f3460] rounded px-3 py-2">
                    <span className="text-xs text-gray-400 w-5">{s.position}</span>
                    <span className="text-xs bg-[#38003c] px-1 rounded">{sp.fplPlayer.position}</span>
                    <span className="flex-1 text-sm">{sp.fplPlayer.webName}</span>
                    <button onClick={() => setCaptain(s.fplPlayerId)} className={`text-xs px-2 py-0.5 rounded ${s.isCaptain ? "bg-[#00ff87] text-black" : "bg-gray-700"}`}>K</button>
                    <button onClick={() => setVice(s.fplPlayerId)} className={`text-xs px-2 py-0.5 rounded ${s.isViceCaptain ? "bg-yellow-400 text-black" : "bg-gray-700"}`}>V</button>
                    <button onClick={() => toggleStarter(s.fplPlayerId)} className="text-xs text-gray-400 hover:text-red-400">→Bank</button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#16213e] rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-400 mb-3">Bank ({bank.length}/7)</h2>
            <div className="space-y-1">
              {bank.map((s) => {
                const sp = squad.find((q) => q.fplPlayer.id === s.fplPlayerId);
                if (!sp) return null;
                return (
                  <div key={s.fplPlayerId} className="flex items-center gap-2 bg-[#0f3460] rounded px-3 py-2 opacity-70">
                    <span className="text-xs bg-[#38003c] px-1 rounded">{sp.fplPlayer.position}</span>
                    <span className="flex-1 text-sm">{sp.fplPlayer.webName}</span>
                    <button onClick={() => toggleStarter(s.fplPlayerId)} className="text-xs text-gray-400 hover:text-[#00ff87]">→Start</button>
                    <button onClick={() => setSlots(slots.filter((x) => x.fplPlayerId !== s.fplPlayerId))} className="text-xs text-gray-400 hover:text-red-400">✕</button>
                  </div>
                );
              })}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {saved && <p className="text-green-400 text-sm">Aufstellung gespeichert!</p>}
          <button
            onClick={saveLineup}
            className="w-full bg-[#00ff87] text-[#38003c] font-bold py-3 rounded-lg hover:bg-[#00e07a] transition-colors"
          >
            Aufstellung speichern ({slots.length}/18)
          </button>
        </div>

        {/* Rechte Spalte: Kaderauswahl */}
        <div className="bg-[#16213e] rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3">Kader (klicken zum Hinzufügen)</h2>
          {byPos.map((players, i) => (
            <div key={POS_ORDER[i]} className="mb-3">
              <p className="text-xs text-gray-500 uppercase mb-1">{POS_ORDER[i]}</p>
              <div className="space-y-1">
                {players.map((sp) => {
                  const isIn = inSquad.has(sp.fplPlayer.id);
                  return (
                    <button
                      key={sp.fplPlayer.id}
                      onClick={() => toggleStarter(sp.fplPlayer.id)}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${isIn ? "bg-[#38003c] text-[#00ff87]" : "bg-[#0f3460] hover:bg-[#38003c]"}`}
                    >
                      <span className="flex-1">{sp.fplPlayer.webName}</span>
                      <span className="text-xs text-gray-400">{sp.fplPlayer.teamName}</span>
                      {isIn && <span className="text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
