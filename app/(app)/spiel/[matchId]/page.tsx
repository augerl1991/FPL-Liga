"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Slot = {
  position: number;
  isCaptain: boolean;
  isViceCaptain: boolean;
  fplPlayer: { id: number; webName: string; teamName: string; position: string; points: number | null };
};
type TeamView = {
  teamName: string;
  isRollover?: boolean;
  rolloverFromGw?: number | null;
  lineup: { slots: Slot[] } | null;
};
type MatchInfo = {
  id: number;
  played: boolean;
  homePoints: number | null;
  awayPoints: number | null;
  gameweekId: number;
  gameweekNumber: number;
  home: { id: number; name: string };
  away: { id: number; name: string };
};

const POS_COLORS: Record<string, string> = {
  GK:  "bg-yellow-400 text-black",
  DEF: "bg-blue-500 text-white",
  MID: "bg-green-500 text-black",
  FWD: "bg-red-500 text-white",
};

function pointsToGoals(pts: number): number {
  if (pts < 38) return 0;
  return 1 + Math.floor((pts - 38) / 9);
}

export default function MatchH2HPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const router = useRouter();

  const [match, setMatch] = useState<MatchInfo | null>(null);
  const [home, setHome] = useState<TeamView | null>(null);
  const [away, setAway] = useState<TeamView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/match/${matchId}`).then(r => r.json()).then(async (m: MatchInfo & { error?: string }) => {
      if (!m || m.error) { setLoading(false); return; }
      setMatch(m);
      const [h, a] = await Promise.all([
        fetch(`/api/lineup/view?teamId=${m.home.id}&gameweekId=${m.gameweekId}`).then(r => r.json()),
        fetch(`/api/lineup/view?teamId=${m.away.id}&gameweekId=${m.gameweekId}`).then(r => r.json()),
      ]);
      setHome(h);
      setAway(a);
      setLoading(false);
    });
  }, [matchId]);

  function rawPoints(tv: TeamView | null) {
    if (!tv?.lineup) return 0;
    return tv.lineup.slots
      .filter(s => s.position <= 11)
      .reduce((sum, s) => sum + (s.isCaptain ? (s.fplPlayer.points ?? 0) * 2 : (s.fplPlayer.points ?? 0)), 0);
  }

  if (loading) return <p className="text-gray-400 text-center py-12">Lädt…</p>;
  if (!match) return <p className="text-gray-400 text-center py-12">Match nicht gefunden.</p>;

  const homePts = rawPoints(home);
  const awayPts = rawPoints(away);
  // Tore: bei gespieltem Match aus DB, sonst live aus Punkten berechnet
  const homeGoals = match.played && match.homePoints != null ? match.homePoints : pointsToGoals(homePts);
  const awayGoals = match.played && match.awayPoints != null ? match.awayPoints : pointsToGoals(awayPts);
  const hasPoints = homePts > 0 || awayPts > 0 || match.played;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header / Scoreboard */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white text-lg">←</button>
        <p className="text-sm text-gray-400">Spieltag {match.gameweekNumber}</p>
      </div>

      <div className="bg-[#16213e] rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex-1 text-right">
          <p className="font-bold text-white truncate">{match.home.name}</p>
          {hasPoints && <p className="text-[11px] text-gray-400">{homePts} Pkt</p>}
        </div>
        <div className="text-center shrink-0 px-2">
          {hasPoints ? (
            <div className="text-3xl font-black text-[#00ff87] whitespace-nowrap">
              {homeGoals} <span className="text-gray-500 text-xl">:</span> {awayGoals}
            </div>
          ) : (
            <div className="text-xl font-bold text-gray-500">vs</div>
          )}
          <p className="text-[10px] text-gray-500 mt-0.5">{match.played ? "Endstand" : hasPoints ? "live" : "ausstehend"}</p>
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-white truncate">{match.away.name}</p>
          {hasPoints && <p className="text-[11px] text-gray-400">{awayPts} Pkt</p>}
        </div>
      </div>

      {/* Gegenüberstellung */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamHalf team={home} accent="#00ff87" />
        <TeamHalf team={away} accent="#ff5e7a" />
      </div>
    </div>
  );
}

function TeamHalf({ team, accent }: { team: TeamView | null; accent: string }) {
  if (!team) return null;
  if (!team.lineup) {
    return (
      <div className="bg-[#16213e] rounded-xl p-6 text-center">
        <p className="font-bold text-white mb-2">{team.teamName}</p>
        <p className="text-gray-500 text-sm">Keine Aufstellung vorhanden.</p>
      </div>
    );
  }

  const slots = team.lineup.slots;
  const starters = slots.filter(s => s.position <= 11);
  const bank = slots.filter(s => s.position > 11);

  const rows: Record<string, Slot[]> = { FWD: [], MID: [], DEF: [], GK: [] };
  for (const s of starters) {
    const p = s.fplPlayer.position;
    if (rows[p]) rows[p].push(s);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <p className="font-bold text-white truncate" style={{ color: accent }}>{team.teamName}</p>
        {team.isRollover && (
          <span className="text-[10px] text-yellow-300" title={`Übernommen von Spieltag ${team.rolloverFromGw}`}>⟳ ST {team.rolloverFromGw}</span>
        )}
      </div>

      {/* Halbfeld */}
      <div
        className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-black/30"
        style={{
          background: "repeating-linear-gradient(180deg, #2e8b3d 0px, #2e8b3d 44px, #27913a 44px, #27913a 88px)",
          minHeight: "420px",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560"
          preserveAspectRatio="none" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
          <rect x="10" y="10" width="380" height="540" rx="4" />
          <path d="M 148 10 A 52 52 0 0 1 252 10" />
          <circle cx="200" cy="10" r="3" fill="rgba(255,255,255,0.7)" stroke="none" />
          <rect x="120" y="474" width="160" height="76" />
          <rect x="160" y="512" width="80" height="38" />
          <circle cx="200" cy="498" r="3" fill="rgba(255,255,255,0.7)" stroke="none" />
          <path d="M 152 474 A 52 52 0 0 1 248 474" />
          <rect x="174" y="550" width="52" height="8" stroke="rgba(255,255,255,0.85)" />
          <path d="M 390 540 A 10 10 0 0 1 380 550" />
          <path d="M 20 550 A 10 10 0 0 1 10 540" />
        </svg>

        <div className="relative flex flex-col justify-around py-6 h-full" style={{ minHeight: 420 }}>
          {(["FWD", "MID", "DEF", "GK"] as const).map(pos => (
            <div key={pos} className="flex justify-center items-start gap-2 flex-wrap px-2 min-h-[64px]">
              {rows[pos].length > 0
                ? rows[pos].map(s => <MiniCard key={s.fplPlayer.id} slot={s} />)
                : <div className="text-white/10 text-xs mt-4">{pos}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Bank */}
      <div className="bg-[#16213e] rounded-xl p-2.5">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Bank</p>
        <div className="flex flex-wrap gap-1.5">
          {bank.length === 0 && <p className="text-[11px] text-gray-700">–</p>}
          {bank.map(s => (
            <div key={s.fplPlayer.id} className="flex items-center gap-1 bg-[#0f3460] rounded px-1.5 py-1">
              <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${POS_COLORS[s.fplPlayer.position]}`}>{s.fplPlayer.position}</span>
              <span className="text-[11px] font-medium">{s.fplPlayer.webName}</span>
              {s.fplPlayer.points != null && <span className="text-[10px] text-gray-500">{s.fplPlayer.points}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniCard({ slot }: { slot: Slot }) {
  const info = slot.fplPlayer;
  const pts = info.points;
  const displayPts = pts != null ? (slot.isCaptain ? pts * 2 : pts) : null;
  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div className="rounded-lg px-1.5 py-1.5 text-center w-[62px] bg-black/55 backdrop-blur-sm text-white shadow-md">
        <div className="flex justify-center gap-0.5 mb-0.5 h-3">
          {slot.isCaptain     && <span className="bg-[#00ff87] text-black text-[8px] font-black px-1 rounded-full leading-3">C</span>}
          {slot.isViceCaptain && <span className="bg-yellow-400 text-black text-[8px] font-black px-1 rounded-full leading-3">V</span>}
        </div>
        <div className={`text-[8px] font-bold px-1 py-0.5 rounded mb-0.5 inline-block ${POS_COLORS[info.position]}`}>{info.position}</div>
        <div className="text-[10px] font-semibold leading-tight truncate">{info.webName}</div>
        {displayPts != null && (
          <div className={`text-[10px] font-bold mt-0.5 ${slot.isCaptain ? "text-[#00ff87]" : "text-yellow-300"}`}>
            {displayPts}{slot.isCaptain && "×2"}
          </div>
        )}
      </div>
    </div>
  );
}
