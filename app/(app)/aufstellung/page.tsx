"use client";
import { useEffect, useState } from "react";

type Player    = { id: number; webName: string; position: string; teamName: string };
type SlotData  = { fplPlayerId: number; position: number; isCaptain: boolean; isViceCaptain: boolean };
type SquadPlayer = { id: number; boughtFor: number; fplPlayer: Player };
type GW = { id: number; number: number };

const POS_COLORS: Record<string, string> = {
  GK:  "bg-yellow-400 text-black",
  DEF: "bg-blue-500 text-white",
  MID: "bg-green-500 text-black",
  FWD: "bg-red-500 text-white",
};
const POS_ORDER = ["GK", "DEF", "MID", "FWD"] as const;

// All valid FPL formations (DEF-MID-FWD, always 1 GK)
const FORMATIONS = ["3-4-3","3-5-2","4-3-3","4-4-2","4-5-1","5-2-3","5-3-2","5-4-1"] as const;
type Formation = typeof FORMATIONS[number];

function parseFormation(f: Formation): Record<string, number> {
  const [def, mid, fwd] = f.split("-").map(Number);
  return { GK: 1, DEF: def, MID: mid, FWD: fwd };
}

export default function AufstellungSeite() {
  const [squad, setSquad]           = useState<SquadPlayer[]>([]);
  const [gameweeks, setGameweeks]   = useState<GW[]>([]);
  const [currentGw, setCurrentGw]   = useState<GW | null>(null);
  const [selectedGW, setSelectedGW] = useState<number>(0);
  const [slots, setSlots]           = useState<SlotData[]>([]);
  const [extraPlayers, setExtra]    = useState<Record<number, Player>>({});
  const [carriedOver, setCarried]   = useState(false);
  const [formation, setFormation]   = useState<Formation>("4-4-2");
  const [saved, setSaved]           = useState(false);
  const [error, setError]           = useState("");
  const [deadline, setDeadline]     = useState<string | null>(null);
  const [activeId, setActiveId]     = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/auction").then(r => r.json()).then(d => d.squad && setSquad(d.squad));
    fetch("/api/gameweeks").then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setGameweeks(d.map((g: GW) => ({ id: g.id, number: g.number })));
    });
    fetch("/api/gameweeks/current").then(r => r.json()).then(d => {
      if (d?.current) { setCurrentGw(d.current); setSelectedGW(d.current.id); }
    });
  }, []);

  useEffect(() => {
    if (!selectedGW) return;
    setActiveId(null);
    setSaved(false);
    setError("");
    fetch(`/api/lineup?gameweekId=${selectedGW}`)
      .then(r => r.json())
      .then((d: any) => {
        const raw = d?.slots ?? [];
        const extra: Record<number, Player> = {};
        for (const s of raw) if (s.fplPlayer) extra[s.fplPlayerId] = s.fplPlayer;
        setExtra(extra);
        setSlots(raw.map((s: any) => ({
          fplPlayerId: s.fplPlayerId,
          position: s.position,
          isCaptain: s.isCaptain ?? false,
          isViceCaptain: s.isViceCaptain ?? false,
        })));
        setCarried(!!d?.carriedOver);

        // Formation aus geladener Startelf ableiten
        const cnt: Record<string, number> = { DEF: 0, MID: 0, FWD: 0 };
        for (const s of raw) {
          if (s.position <= 11 && extra[s.fplPlayerId]) {
            const p = extra[s.fplPlayerId].position;
            if (p in cnt) cnt[p]++;
          }
        }
        const f = `${cnt.DEF}-${cnt.MID}-${cnt.FWD}`;
        setFormation((FORMATIONS as readonly string[]).includes(f) ? (f as Formation) : "4-4-2");
      });
    fetch(`/api/gameweeks/${selectedGW}/deadline`)
      .then(r => r.json())
      .then(d => d.deadline
        ? setDeadline(new Date(d.deadline).toLocaleString("de-AT", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }))
        : setDeadline(null)
      );
  }, [selectedGW]);

  /* ── Lookups ── */
  function getInfo(id: number): Player | undefined {
    return squad.find(q => q.fplPlayer.id === id)?.fplPlayer ?? extraPlayers[id];
  }
  function getPlayerPos(id: number) { return getInfo(id)?.position ?? ""; }

  /* ── Derived ── */
  const selectedNumber = gameweeks.find(g => g.id === selectedGW)?.number ?? 0;
  const isEditable = currentGw != null && selectedGW === currentGw.id;

  const starters = slots.filter(s => s.position <= 11).sort((a, b) => a.position - b.position);
  const bank     = slots.filter(s => s.position > 11).sort((a, b) => a.position - b.position);

  const pitchRows: Record<string, SlotData[]> = { FWD: [], MID: [], DEF: [], GK: [] };
  for (const s of starters) {
    const pos = getPlayerPos(s.fplPlayerId);
    if (pos && pitchRows[pos]) pitchRows[pos].push(s);
  }

  /* ── Formation change: move excess starters to bank ── */
  function changeFormation(newFmt: Formation) {
    if (!isEditable) return;
    const limits = parseFormation(newFmt);
    setFormation(newFmt);
    setActiveId(null);

    setSlots(prev => {
      let updated = [...prev];
      let bankCount = updated.filter(s => s.position > 11).length;
      for (const pos of ["GK", "DEF", "MID", "FWD"] as const) {
        const posStarters = updated.filter(s => s.position <= 11 && getPlayerPos(s.fplPlayerId) === pos);
        const excess = posStarters.length - limits[pos];
        if (excess <= 0) continue;
        const toBank = posStarters.slice(-excess).map(s => s.fplPlayerId);
        updated = updated.map(s =>
          toBank.includes(s.fplPlayerId) ? { ...s, position: 12 + bankCount++ } : s
        );
      }
      return updated;
    });
  }

  /* ── Slot helpers ── */
  function addToSlots(playerId: number) {
    if (!isEditable) return;
    if (slots.find(s => s.fplPlayerId === playerId)) return;
    if (slots.length >= 18) { setError("Spieltagskader voll (18 Spieler)"); return; }

    const pos = getPlayerPos(playerId);
    const limits = parseFormation(formation);
    const posInStarters = starters.filter(s => getPlayerPos(s.fplPlayerId) === pos).length;
    const asStarter = starters.length < 11 && posInStarters < limits[pos];
    const position  = asStarter ? starters.length + 1 : 12 + bank.length;

    setSlots(prev => [...prev, { fplPlayerId: playerId, position, isCaptain: false, isViceCaptain: false }]);
    setError("");
  }

  function removeFromSlots(playerId: number) {
    if (!isEditable) return;
    setSlots(prev => prev.filter(s => s.fplPlayerId !== playerId));
    if (activeId === playerId) setActiveId(null);
    setError("");
  }

  function moveToBank(playerId: number) {
    if (!isEditable) return;
    if (bank.length >= 7) { setError("Bank ist voll (7 Spieler)"); return; }
    setSlots(prev => prev.map(s => s.fplPlayerId === playerId ? { ...s, position: 12 + bank.length } : s));
    setActiveId(null);
    setError("");
  }

  function moveToStarter(playerId: number) {
    if (!isEditable) return;
    if (starters.length >= 11) { setError("Startelf ist voll (11 Spieler)"); return; }
    const limits = parseFormation(formation);
    const pos = getPlayerPos(playerId);
    const posCount = starters.filter(s => getPlayerPos(s.fplPlayerId) === pos).length;
    if (posCount >= limits[pos]) {
      setError(`Formation ${formation}: kein Platz mehr für ${pos} in der Startelf`);
      return;
    }
    setSlots(prev => prev.map(s => s.fplPlayerId === playerId ? { ...s, position: starters.length + 1 } : s));
    setError("");
  }

  function setCaptain(playerId: number) {
    if (!isEditable) return;
    setSlots(prev => prev.map(s => ({
      ...s,
      isCaptain: s.fplPlayerId === playerId,
      isViceCaptain: s.isViceCaptain && s.fplPlayerId !== playerId,
    })));
    setActiveId(null);
  }

  function setVice(playerId: number) {
    if (!isEditable) return;
    setSlots(prev => prev.map(s => ({
      ...s,
      isViceCaptain: s.fplPlayerId === playerId,
      isCaptain: s.isCaptain && s.fplPlayerId !== playerId,
    })));
    setActiveId(null);
  }

  async function saveLineup() {
    if (!isEditable) return;
    if (slots.length !== 18) { setError(`Genau 18 Spieler auswählen (aktuell ${slots.length})`); return; }
    const res = await fetch("/api/lineup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameweekId: selectedGW, slots }),
    });
    if (res.ok) { setSaved(true); setCarried(false); setError(""); setTimeout(() => setSaved(false), 3000); }
    else { const d = await res.json(); setError(d.error); }
  }

  /* ── Pitch card ── */
  function PitchCard({ slot }: { slot: SlotData }) {
    const info = getInfo(slot.fplPlayerId);
    if (!info) return null;
    const isActive = isEditable && activeId === slot.fplPlayerId;

    return (
      <div className="flex flex-col items-center gap-1.5 select-none">
        <div
          onClick={e => { if (!isEditable) return; e.stopPropagation(); setActiveId(isActive ? null : slot.fplPlayerId); }}
          className={`rounded-lg px-2 py-2 text-center w-[76px] transition-all shadow-md ${isEditable ? "cursor-pointer" : "cursor-default"} ${
            isActive
              ? "bg-white text-black scale-105 shadow-[#00ff87]/40 shadow-lg"
              : "bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
          }`}
        >
          <div className="flex justify-center gap-1 mb-1 h-4">
            {slot.isCaptain     && <span className="bg-[#00ff87] text-black text-[9px] font-black px-1.5 rounded-full leading-4">C</span>}
            {slot.isViceCaptain && <span className="bg-yellow-400 text-black text-[9px] font-black px-1.5 rounded-full leading-4">V</span>}
          </div>
          <div className={`text-[9px] font-bold px-1 py-0.5 rounded mb-1 inline-block ${POS_COLORS[info.position]}`}>
            {info.position}
          </div>
          <div className={`text-[11px] font-semibold leading-tight truncate ${isActive ? "text-black" : "text-white"}`}>
            {info.webName}
          </div>
        </div>

        {isActive && (
          <div className="flex gap-1 bg-black/90 border border-white/10 rounded-lg p-1.5 shadow-xl z-10">
            <button onClick={e => { e.stopPropagation(); setCaptain(slot.fplPlayerId); }}
              className="text-[10px] bg-[#00ff87] text-black px-2 py-1 rounded font-bold hover:bg-green-400">C</button>
            <button onClick={e => { e.stopPropagation(); setVice(slot.fplPlayerId); }}
              className="text-[10px] bg-yellow-400 text-black px-2 py-1 rounded font-bold hover:bg-yellow-300">Vize</button>
            <button onClick={e => { e.stopPropagation(); moveToBank(slot.fplPlayerId); }}
              className="text-[10px] bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500">Bank</button>
            <button onClick={e => { e.stopPropagation(); removeFromSlots(slot.fplPlayerId); }}
              className="text-[10px] bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600">✕</button>
          </div>
        )}
      </div>
    );
  }

  function EmptySlot({ pos }: { pos: string }) {
    return (
      <div className="w-[76px] h-[76px] rounded-lg border border-dashed border-white/15 flex items-center justify-center">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded opacity-40 ${POS_COLORS[pos]}`}>{pos}</span>
      </div>
    );
  }

  const limits = parseFormation(formation);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#00ff87]">Aufstellung</h1>

      {/* Aktueller Spieltag – prominent, außerhalb der Reiter-Liste */}
      {currentGw && (
        <button
          onClick={() => setSelectedGW(currentGw.id)}
          className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-colors ${
            isEditable
              ? "bg-[#00ff87]/15 border-[#00ff87]/40"
              : "bg-[#16213e] border-gray-700 hover:border-[#00ff87]/40"
          }`}
        >
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Aktueller Spieltag</p>
            <p className="text-lg font-bold text-white">Spieltag {currentGw.number}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#00ff87] text-black">
            {isEditable ? "wird bearbeitet" : "bearbeiten →"}
          </span>
        </button>
      )}

      {/* Reiter: alle Spieltage */}
      <div className="bg-[#16213e] rounded-xl p-2">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold px-1 mb-1.5">Alle Spieltage (Ansicht)</p>
        <div className="flex flex-wrap gap-1.5">
          {gameweeks.map(gw => {
            const isCurrent  = currentGw?.id === gw.id;
            const isSelected = selectedGW === gw.id;
            const isFinished = currentGw != null && gw.number < currentGw.number;
            return (
              <button
                key={gw.id}
                onClick={() => setSelectedGW(gw.id)}
                title={isCurrent ? "Aktueller Spieltag (bearbeitbar)" : isFinished ? "Vergangener Spieltag" : "Zukünftiger Spieltag"}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#00ff87] text-black"
                    : isCurrent
                    ? "bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40"
                    : isFinished
                    ? "bg-[#0f3460] text-gray-400 hover:text-white"
                    : "bg-[#0f3460]/40 text-gray-600 hover:text-gray-300"
                }`}
              >
                {gw.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status-Zeile */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="text-sm font-bold text-white">Spieltag {selectedNumber}</span>
        {isEditable
          ? <span className="text-[#00ff87] font-semibold">● Bearbeitung aktiv</span>
          : <span className="text-gray-500 font-semibold">🔒 Nur Ansicht</span>}
        {deadline && isEditable && (
          <span className="text-gray-400">Deadline: <span className="text-yellow-400 font-medium">{deadline}</span></span>
        )}
        <span className="ml-auto text-gray-500">{starters.length}/11 Starter · {bank.length}/7 Bank</span>
      </div>

      {/* Carry-over Hinweis */}
      {isEditable && carriedOver && (
        <p className="text-xs text-yellow-300 bg-yellow-900/20 rounded-lg px-3 py-2">
          ⤵ Aufstellung vom letzten Spieltag übernommen – bitte anpassen und speichern.
        </p>
      )}

      {/* Formation – nur im Bearbeitungsmodus */}
      {isEditable && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Formation:</span>
          {FORMATIONS.map(f => (
            <button
              key={f}
              onClick={() => changeFormation(f)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                formation === f
                  ? "bg-[#00ff87] text-black shadow shadow-[#00ff87]/30"
                  : "bg-[#16213e] text-gray-400 hover:text-white hover:bg-[#1e3a6e]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-4 ${isEditable ? "lg:grid-cols-[1fr_200px]" : ""}`}>

        {/* ── LEFT: Pitch + Bank (+ Save) ── */}
        <div className="space-y-3">
          {/* Pitch */}
          <div
            className="relative rounded-xl overflow-hidden cursor-default shadow-2xl ring-1 ring-black/30"
            style={{
              background:
                "repeating-linear-gradient(180deg, #2e8b3d 0px, #2e8b3d 50px, #27913a 50px, #27913a 100px)",
              minHeight: "560px",
            }}
            onClick={() => setActiveId(null)}
          >
            {/* Spielfeld-Hälfte (SVG) – Tor unten beim Torwart, Mittellinie oben */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 560"
              preserveAspectRatio="none"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
            >
              {/* Außenlinie (Mittellinie = obere Kante) */}
              <rect x="10" y="10" width="380" height="540" rx="4" />

              {/* Mittelkreis-Halbbogen (von der Mittellinie nach unten) */}
              <path d="M 148 10 A 52 52 0 0 1 252 10" />
              <circle cx="200" cy="10" r="3" fill="rgba(255,255,255,0.7)" stroke="none" />

              {/* ── Tor unten ── */}
              <rect x="120" y="474" width="160" height="76" />        {/* Strafraum */}
              <rect x="160" y="512" width="80" height="38" />         {/* Torraum */}
              <circle cx="200" cy="498" r="3" fill="rgba(255,255,255,0.7)" stroke="none" /> {/* Elfmeterpunkt */}
              <path d="M 152 474 A 52 52 0 0 1 248 474" />            {/* Strafraumbogen */}
              <rect x="174" y="550" width="52" height="8" stroke="rgba(255,255,255,0.85)" /> {/* Tor */}

              {/* Eckbögen unten */}
              <path d="M 390 540 A 10 10 0 0 1 380 550" />
              <path d="M 20 550 A 10 10 0 0 1 10 540" />
            </svg>

            <div className="relative flex flex-col justify-around py-10 h-full" style={{ minHeight: 560 }}>
              {(["FWD", "MID", "DEF", "GK"] as const).map(pos => {
                const filled  = pitchRows[pos];
                const missing = isEditable ? Math.max(0, limits[pos] - filled.length) : 0;
                return (
                  <div key={pos} className="flex justify-center items-start gap-3 flex-wrap px-4 min-h-[88px]">
                    {filled.map(slot => <PitchCard key={slot.fplPlayerId} slot={slot} />)}
                    {Array.from({ length: missing }).map((_, i) => (
                      <EmptySlot key={`empty-${pos}-${i}`} pos={pos} />
                    ))}
                    {!isEditable && filled.length === 0 && (
                      <div className="text-white/10 text-xs mt-6">{pos}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bank */}
          <div className="bg-[#16213e] rounded-xl p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              Bank <span className="text-gray-600 font-normal">({bank.length}/7)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {bank.length === 0 && <p className="text-xs text-gray-700 py-1">Keine Bankspieler</p>}
              {bank.map(s => {
                const info = getInfo(s.fplPlayerId);
                if (!info) return null;
                return (
                  <div key={s.fplPlayerId} className="flex items-center gap-1.5 bg-[#0f3460] rounded-lg px-2.5 py-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${POS_COLORS[info.position]}`}>
                      {info.position}
                    </span>
                    <span className="text-xs font-medium">{info.webName}</span>
                    {isEditable && <>
                      <button onClick={() => moveToStarter(s.fplPlayerId)} title="In Startelf"
                        className="text-[#00ff87] hover:text-green-300 text-xs ml-1">↑</button>
                      <button onClick={() => removeFromSlots(s.fplPlayerId)} title="Entfernen"
                        className="text-gray-600 hover:text-red-400 text-xs">✕</button>
                    </>}
                  </div>
                );
              })}
            </div>
          </div>

          {isEditable && <>
            {error && <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>}
            {saved && <p className="text-green-400 text-sm bg-green-900/20 rounded-lg px-3 py-2">✓ Aufstellung gespeichert!</p>}
            <button
              onClick={saveLineup}
              className="w-full bg-[#00ff87] text-[#38003c] font-bold py-3 rounded-xl hover:bg-green-400 transition-colors text-sm"
            >
              Aufstellung speichern ({slots.length}/18)
            </button>
          </>}

          {!isEditable && (
            <p className="text-xs text-gray-500 bg-[#16213e] rounded-lg px-3 py-2">
              Dieser Spieltag kann nicht mehr verändert werden. Nur der aktuelle Spieltag ist bearbeitbar.
            </p>
          )}
        </div>

        {/* ── RIGHT: Squad list – nur im Bearbeitungsmodus ── */}
        {isEditable && (
          <div className="bg-[#16213e] rounded-xl p-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Kader</p>
            {POS_ORDER.map(pos => {
              const players = squad.filter(sp => sp.fplPlayer.position === pos);
              if (players.length === 0) return null;
              const posInStarters = starters.filter(s => getPlayerPos(s.fplPlayerId) === pos).length;
              return (
                <div key={pos} className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <p className={`text-[9px] font-bold px-1.5 py-0.5 rounded inline-block ${POS_COLORS[pos]}`}>{pos}</p>
                    <span className="text-[9px] text-gray-600">{posInStarters}/{limits[pos]}</span>
                  </div>
                  <div className="space-y-0.5">
                    {players.map(sp => {
                      const slot = slots.find(s => s.fplPlayerId === sp.fplPlayer.id);
                      const isStarter = slot && slot.position <= 11;
                      const isBank    = slot && slot.position > 11;
                      return (
                        <button
                          key={sp.fplPlayer.id}
                          onClick={() => isStarter || isBank ? removeFromSlots(sp.fplPlayer.id) : addToSlots(sp.fplPlayer.id)}
                          className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-colors text-xs ${
                            isStarter
                              ? "bg-[#00ff87]/15 border border-[#00ff87]/25 text-[#00ff87]"
                              : isBank
                              ? "bg-yellow-900/25 border border-yellow-700/25 text-yellow-400"
                              : "bg-[#0f3460] hover:bg-[#163a6e] text-gray-300"
                          }`}
                        >
                          <span className="flex-1 truncate font-medium">{sp.fplPlayer.webName}</span>
                          {isStarter && <span className="text-[9px] font-bold shrink-0">START</span>}
                          {isBank    && <span className="text-[9px] font-bold shrink-0">BANK</span>}
                          {!slot     && <span className="text-[9px] text-gray-600 shrink-0">+</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
