"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Slot = {
  position: number;
  isCaptain: boolean;
  isViceCaptain: boolean;
  fplPlayer: { id: number; webName: string; teamName: string; position: string; points: number | null };
};

const POS_COLORS: Record<string, string> = {
  GK: "bg-yellow-600", DEF: "bg-blue-600", MID: "bg-green-600", FWD: "bg-red-600",
};

export default function LineupViewPage() {
  const { teamId, gameweekId } = useParams<{ teamId: string; gameweekId: string }>();
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [gwNumber, setGwNumber] = useState<number | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [noLineup, setNoLineup] = useState(false);
  const [isRollover, setIsRollover] = useState(false);
  const [rolloverFromGw, setRolloverFromGw] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lineup/view?teamId=${teamId}&gameweekId=${gameweekId}`)
      .then((r) => r.json())
      .then((d) => {
        setTeamName(d.teamName ?? "");
        setGwNumber(d.gameweekNumber);
        setIsRollover(d.isRollover ?? false);
        setRolloverFromGw(d.rolloverFromGw ?? null);
        if (d.lineup) {
          setSlots(d.lineup.slots);
        } else {
          setNoLineup(true);
        }
        setLoading(false);
      });
  }, [teamId, gameweekId]);

  const starters = slots.filter((s) => s.position <= 11);
  const bench = slots.filter((s) => s.position > 11);
  const totalPts = slots
    .filter((s) => s.position <= 11)
    .reduce((sum, s) => sum + (s.fplPlayer.points ?? 0), 0);
  const captainBonus = starters.find((s) => s.isCaptain)?.fplPlayer.points ?? 0;

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors text-lg"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">{teamName}</h1>
          {gwNumber && (
            <p className="text-sm text-gray-400">Spieltag {gwNumber}</p>
          )}
        </div>
        {slots.some((s) => s.fplPlayer.points !== null) && (
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold text-[#00ff87]">{totalPts + captainBonus}</div>
            <div className="text-xs text-gray-400">Punkte</div>
          </div>
        )}
      </div>

      {loading && <p className="text-gray-400 text-center py-12">Lädt…</p>}

      {!loading && noLineup && (
        <div className="bg-[#16213e] rounded-xl p-8 text-center">
          <p className="text-gray-400">Keine Aufstellung eingereicht – auch keine vorherige vorhanden.</p>
        </div>
      )}

      {!loading && !noLineup && isRollover && (
        <div className="flex items-center gap-2 bg-yellow-900/30 border border-yellow-700 rounded-lg px-4 py-2 mb-4 text-sm">
          <span className="text-yellow-400">⟳</span>
          <span className="text-yellow-300">
            Keine neue Aufstellung – Aufstellung von Spieltag {rolloverFromGw} wird verwendet
          </span>
        </div>
      )}

      {!loading && !noLineup && (
        <>
          {/* Starter */}
          <div className="bg-[#16213e] rounded-xl overflow-hidden mb-3">
            <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Startelf</span>
              <span className="text-xs text-gray-500">{starters.length} Spieler</span>
            </div>
            {starters.map((s) => (
              <SlotRow key={s.position} slot={s} />
            ))}
          </div>

          {/* Bank */}
          <div className="bg-[#16213e] rounded-xl overflow-hidden opacity-70">
            <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Bank</span>
              <span className="text-xs text-gray-500">{bench.length} Spieler</span>
            </div>
            {bench.map((s) => (
              <SlotRow key={s.position} slot={s} isBench />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SlotRow({ slot, isBench = false }: { slot: Slot; isBench?: boolean }) {
  const hasPoints = slot.fplPlayer.points !== null;
  const pts = slot.fplPlayer.points ?? 0;
  const displayPts = slot.isCaptain ? pts * 2 : pts;

  return (
    <div className={`flex items-center px-4 py-2.5 border-b border-gray-800 last:border-0 ${isBench ? "" : "hover:bg-[#0f3460]/40"}`}>
      {/* Position-Badge */}
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-3 shrink-0 ${POS_COLORS[slot.fplPlayer.position] ?? "bg-gray-600"}`}>
        {slot.fplPlayer.position}
      </span>

      {/* Name + Verein */}
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-sm text-white">{slot.fplPlayer.webName}</span>
        {(slot.isCaptain || slot.isViceCaptain) && (
          <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${slot.isCaptain ? "bg-[#00ff87] text-black" : "bg-gray-600 text-white"}`}>
            {slot.isCaptain ? "C" : "V"}
          </span>
        )}
        <div className="text-[11px] text-gray-400">{slot.fplPlayer.teamName}</div>
      </div>

      {/* Punkte */}
      {hasPoints ? (
        <span className={`font-bold text-sm ${slot.isCaptain ? "text-[#00ff87]" : "text-white"}`}>
          {displayPts}{slot.isCaptain && <span className="text-[10px] text-gray-400 ml-0.5">(×2)</span>}
        </span>
      ) : (
        <span className="text-gray-600 text-xs">–</span>
      )}
    </div>
  );
}
