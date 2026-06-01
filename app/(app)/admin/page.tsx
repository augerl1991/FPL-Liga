"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { PREV_SEASON, PREV_SEASON_NAME } from "@/lib/prev-season-data";

type Team = { id: number; name: string; sortOrder: number; user: { username: string } };
type Owner = { teamId: number; teamName: string; boughtFor: number };
type Player = { id: number; webName: string; firstName: string; lastName: string; position: string; teamName: string; totalPoints: number; owner: Owner | null };

const POS_COLORS: Record<string, string> = { GK: "bg-yellow-600", DEF: "bg-blue-600", MID: "bg-green-600", FWD: "bg-red-600" };

export default function AdminSeite() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"users" | "auction" | "teams" | "lineups" | "schedule" | "sync" | "history">("users");

  // User-Erstellung
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [userMsg, setUserMsg] = useState("");

  // Teams-Reiter
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [teamIdx, setTeamIdx] = useState(0);
  const [teamSquad, setTeamSquad] = useState<{ id: number; boughtFor: number; fplPlayer: { webName: string; teamName: string; position: string; totalPoints: number } }[]>([]);
  const [teamSquadLoading, setTeamSquadLoading] = useState(false);

  // Auktion
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [showSold, setShowSold] = useState(true);
  // Pro Spieler: { [fplPlayerId]: { teamId, price } }
  const [rowTeam, setRowTeam] = useState<Record<number, string>>({});
  const [rowPrice, setRowPrice] = useState<Record<number, string>>({});
  const [rowMsg, setRowMsg] = useState<Record<number, string>>({});
  const [rowLoading, setRowLoading] = useState<Record<number, boolean>>({});

  // Spielplan + Teamreihenfolge
  const [scheduleMsg, setScheduleMsg] = useState("");
  const [historyScheduleMsg, setHistoryScheduleMsg] = useState("");
  const [teamOrder, setTeamOrder] = useState<Team[]>([]);
  const [orderMsg, setOrderMsg] = useState("");

  // Sync
  const [syncMsg, setSyncMsg] = useState("");
  const [gwNum, setGwNum] = useState("");

  // Lineup-Status
  type LineupTeam = {
    teamId: number; teamName: string; username: string;
    currentGw: { number: number; submitted: boolean; submittedAt: string | null } | null;
    totalSubmitted: number; totalGameweeks: number;
    history: { gwNumber: number; submitted: boolean; submittedAt: string | null }[];
  };
  const [lineupStatus, setLineupStatus] = useState<{ currentGwNumber: number | null; teams: LineupTeam[] } | null>(null);
  const [lineupHistoryTeam, setLineupHistoryTeam] = useState<number | null>(null);

  // History-Tab
  const [historyGW, setHistoryGW] = useState(1);
  const historyGWRef = useRef<HTMLDivElement>(null);

  // PL-Modus Toggle
  const [plMode, setPlMode] = useState<"history" | "live">("history");
  const [plModeMsg, setPlModeMsg] = useState("");

  // Neue Saison
  const [newSeasonName, setNewSeasonName] = useState("");
  const [newSeasonMsg, setNewSeasonMsg] = useState("");
  const [newSeasonLoading, setNewSeasonLoading] = useState(false);
  const [newSeasonConfirm, setNewSeasonConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user?.isAdmin) router.push("/tabelle");
  }, [user, loading, router]);

  const loadPlayers = useCallback(() => {
    const q = search ? `&search=${encodeURIComponent(search)}` : "";
    fetch(`/api/players?${q}`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setPlayers(d));
  }, [search]);

  useEffect(() => {
    if (tab === "auction") {
      fetch("/api/admin/teams").then((r) => r.json()).then((d) => Array.isArray(d) && setTeams(d));
      loadPlayers();
    }
    if (tab === "teams") {
      fetch("/api/admin/team-order")
        .then((r) => r.json())
        .then((d) => { if (Array.isArray(d)) { setAllTeams(d); setTeamIdx(0); } });
    }
    if (tab === "lineups") {
      fetch("/api/admin/lineup-status")
        .then((r) => r.json())
        .then((d) => d.teams && setLineupStatus(d));
    }
    if (tab === "schedule") {
      fetch("/api/admin/team-order").then((r) => r.json()).then((d) => Array.isArray(d) && setTeamOrder(d));
    }
    if (tab === "sync") {
      fetch("/api/admin/config?key=plMode")
        .then((r) => r.json())
        .then((d) => setPlMode(d.value === "live" ? "live" : "history"));
    }
  }, [tab, loadPlayers]);

  // Kader des aktuell gewählten Teams laden
  useEffect(() => {
    if (tab !== "teams" || allTeams.length === 0) return;
    const team = allTeams[teamIdx];
    if (!team) return;
    setTeamSquadLoading(true);
    fetch(`/api/auction?teamId=${team.id}`)
      .then((r) => r.json())
      .then((d) => { setTeamSquad(d.squad ?? []); setTeamSquadLoading(false); });
  }, [tab, allTeams, teamIdx]);

  async function assignPlayer(p: Player) {
    const tid = rowTeam[p.id];
    const price = parseInt(rowPrice[p.id] ?? "");
    if (!tid || !price || price < 1) {
      setRowMsg((m) => ({ ...m, [p.id]: "Team + Gebot angeben" }));
      return;
    }
    setRowLoading((l) => ({ ...l, [p.id]: true }));
    setRowMsg((m) => ({ ...m, [p.id]: "" }));
    const res = await fetch("/api/auction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: parseInt(tid), fplPlayerId: p.id, price }),
    });
    const d = await res.json();
    setRowLoading((l) => ({ ...l, [p.id]: false }));
    if (res.ok) {
      // Spieler lokal als verkauft markieren
      const team = teams.find((t) => t.id === parseInt(tid));
      setPlayers((prev) =>
        prev.map((pl) => pl.id === p.id ? { ...pl, owner: { teamId: parseInt(tid), teamName: team?.name ?? "", boughtFor: price } } : pl)
      );
      setRowTeam((r) => { const n = { ...r }; delete n[p.id]; return n; });
      setRowPrice((r) => { const n = { ...r }; delete n[p.id]; return n; });
    } else {
      setRowMsg((m) => ({ ...m, [p.id]: `✗ ${d.error}` }));
    }
  }

  async function removeAssignment(p: Player) {
    if (!confirm(`${p.webName} aus dem Kader entfernen?`)) return;
    const res = await fetch("/api/auction", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fplPlayerId: p.id }),
    });
    if (res.ok) {
      setPlayers((prev) => prev.map((pl) => pl.id === p.id ? { ...pl, owner: null } : pl));
    }
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newPassword, teamName: newTeamName }),
    });
    const d = await res.json();
    setUserMsg(res.ok ? `✓ Nutzer "${newUsername}" angelegt` : `✗ ${d.error}`);
    if (res.ok) { setNewUsername(""); setNewPassword(""); setNewTeamName(""); }
  }

  function moveTeam(index: number, direction: "up" | "down") {
    const newOrder = [...teamOrder];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    setTeamOrder(newOrder);
  }

  async function saveTeamOrder() {
    const res = await fetch("/api/admin/team-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: teamOrder.map((t, i) => ({ id: t.id, sortOrder: i + 1 })) }),
    });
    setOrderMsg(res.ok ? "✓ Reihenfolge gespeichert" : "✗ Fehler");
  }

  async function generateSchedule() {
    const res = await fetch("/api/admin/generate-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seasonId: 1 }),
    });
    const d = await res.json();
    setScheduleMsg(res.ok ? `✓ ${d.matches} Spiele generiert` : `✗ ${d.error}`);
  }

  async function generateScheduleFromHistory() {
    setHistoryScheduleMsg("Lädt…");
    const res = await fetch("/api/admin/generate-schedule-from-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seasonId: 1 }),
    });
    const d = await res.json();
    if (res.ok) {
      const warn = d.warnings?.length ? ` · ⚠ ${d.warnings.join(", ")}` : "";
      setHistoryScheduleMsg(`✓ ${d.matchesCreated} Spiele aus Vorjahr übernommen · ${d.playedGwsSkipped} gespielte GWs übersprungen${warn}`);
    } else {
      setHistoryScheduleMsg(`✗ ${d.error}`);
    }
  }

  async function syncPlayers() {
    setSyncMsg("Lädt...");
    const res = await fetch("/api/fpl/sync", { method: "POST" });
    const d = await res.json();
    setSyncMsg(res.ok ? `✓ ${d.upserted} Spieler synchronisiert` : `✗ ${d.error}`);
  }

  async function startNewSeason() {
    if (!newSeasonConfirm) { setNewSeasonConfirm(true); return; }
    setNewSeasonLoading(true);
    setNewSeasonMsg("Lädt FPL-Spieler und setzt Kader zurück…");
    const res = await fetch("/api/admin/new-season", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seasonName: newSeasonName }),
    });
    const d = await res.json();
    setNewSeasonLoading(false);
    setNewSeasonConfirm(false);
    if (res.ok) {
      setNewSeasonMsg(`✓ Saison "${d.seasonName}" gestartet · ${d.squadPlayersDeleted} Kaderspieler gelöscht · ${d.playersUpdated} FPL-Spieler aktualisiert`);
    } else {
      setNewSeasonMsg(`✗ ${d.error}`);
    }
  }

  async function syncGW() {
    if (!gwNum) return;
    setSyncMsg("Lädt...");
    const gwRes = await fetch(`/api/gameweeks?seasonId=1`).then((r) => r.json());
    const gw = Array.isArray(gwRes) && gwRes.find((g: { number: number }) => g.number === parseInt(gwNum));
    if (!gw) { setSyncMsg("✗ Spieltag nicht gefunden"); return; }
    const res = await fetch("/api/fpl/sync-gw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameweekId: gw.id }),
    });
    const d = await res.json();
    setSyncMsg(res.ok ? `✓ GW ${gwNum} synchronisiert` : `✗ ${d.error}`);
  }

  async function togglePlMode() {
    const newMode = plMode === "history" ? "live" : "history";
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "plMode", value: newMode }),
    });
    if (res.ok) {
      setPlMode(newMode);
      setPlModeMsg(newMode === "live"
        ? "✓ Spielplan zeigt jetzt Live-PL-Daten · History unter diesem Tab verfügbar"
        : "✓ Spielplan zeigt jetzt Saison-2024/25-Daten");
    } else {
      setPlModeMsg("✗ Fehler beim Speichern");
    }
  }

  // Gefilterte + sortierte Spielerliste
  const filtered = players.filter((p) => {
    if (posFilter !== "ALL" && p.position !== posFilter) return false;
    if (!showSold && p.owner) return false;
    return true;
  });

  const soldCount = players.filter((p) => p.owner).length;
  const availCount = players.length - soldCount;

  const tabs = [
    { key: "users", label: "Nutzer anlegen" },
    { key: "auction", label: "Auktion" },
    { key: "teams", label: "Teams" },
    { key: "lineups", label: "Aufstellungen" },
    { key: "schedule", label: "Spielplan" },
    { key: "sync", label: "FPL Sync" },
    { key: "history", label: "📁 History" },
  ] as const;

  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Admin-Bereich</h1>

      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-yellow-400 text-black" : "bg-[#16213e] hover:bg-[#0f3460]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Nutzer anlegen ── */}
      {tab === "users" && (
        <div className="bg-[#16213e] rounded-xl p-6 max-w-md">
          <h2 className="font-semibold mb-4">Neuen Nutzer anlegen</h2>
          <form onSubmit={createUser} className="space-y-3">
            <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Passwort" type="password" required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
            <input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="Teamname" required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
            <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300">Anlegen</button>
          </form>
          {userMsg && <p className="mt-3 text-sm text-green-400">{userMsg}</p>}
        </div>
      )}

      {/* ── Auktion ── */}
      {tab === "auction" && (
        <div className="space-y-4">
          {/* Filter-Leiste */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Spieler suchen…"
              className="bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white text-sm w-48"
            />
            {["ALL", "GK", "DEF", "MID", "FWD"].map((pos) => (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${posFilter === pos ? "bg-[#00ff87] text-black" : "bg-[#16213e] hover:bg-[#0f3460]"}`}
              >
                {pos}
              </button>
            ))}
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer ml-2">
              <input type="checkbox" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} className="accent-[#00ff87]" />
              Höchstbieter anzeigen
            </label>
            <span className="ml-auto text-xs text-gray-400">
              {availCount} verfügbar · {soldCount} Höchstbieter
            </span>
          </div>

          {/* Spielerliste */}
          <div className="bg-[#16213e] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                  <th className="px-4 py-2 text-left">Spieler</th>
                  <th className="px-4 py-2 text-left">Verein</th>
                  <th className="px-3 py-2 text-center">Pkt</th>
                  <th className="px-4 py-2 text-left">Team</th>
                  <th className="px-3 py-2 text-center w-20">Gebot</th>
                  <th className="px-3 py-2 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`border-t border-gray-700/50 transition-colors ${p.owner ? "opacity-50" : "hover:bg-[#0f3460]/60"}`}
                  >
                    {/* Name + Position */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${POS_COLORS[p.position] ?? "bg-gray-600"}`}>
                          {p.position}
                        </span>
                        <span className={`font-medium ${p.owner ? "text-gray-400" : "text-white"}`}>{p.webName}</span>
                      </div>
                    </td>

                    {/* Verein */}
                    <td className="px-4 py-2 text-gray-400 text-xs">{p.teamName}</td>

                    {/* Punkte */}
                    <td className="px-3 py-2 text-center text-[#00ff87] text-xs">{p.totalPoints}</td>

                    {p.owner ? (
                      /* Bereits vergeben */
                      <>
                        <td className="px-4 py-2">
                          <span className="text-[#00ff87] text-xs font-semibold">{p.owner.teamName}</span>
                        </td>
                        <td className="px-3 py-2 text-center text-yellow-400 text-xs font-bold">
                          {p.owner.boughtFor} Mio
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => removeAssignment(p)}
                            className="text-[10px] text-gray-500 hover:text-red-400 transition-colors"
                            title="Zuweisung aufheben"
                          >
                            ✕
                          </button>
                        </td>
                      </>
                    ) : (
                      /* Verfügbar – Inline-Zuweisung */
                      <>
                        <td className="px-4 py-2">
                          <select
                            value={rowTeam[p.id] ?? ""}
                            onChange={(e) => setRowTeam((r) => ({ ...r, [p.id]: e.target.value }))}
                            className="bg-[#0f3460] border border-gray-600 rounded px-2 py-1 text-white text-xs w-full"
                          >
                            <option value="">Team…</option>
                            {teams.map((t) => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            min="1"
                            value={rowPrice[p.id] ?? ""}
                            onChange={(e) => setRowPrice((r) => ({ ...r, [p.id]: e.target.value }))}
                            placeholder="Mio"
                            className="bg-[#0f3460] border border-gray-600 rounded px-2 py-1 text-white text-xs w-16 text-center"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => assignPlayer(p)}
                            disabled={rowLoading[p.id]}
                            className="bg-[#00ff87] text-black text-xs font-bold px-2 py-1 rounded hover:bg-green-400 disabled:opacity-50 transition-colors"
                          >
                            {rowLoading[p.id] ? "…" : "✓"}
                          </button>
                          {rowMsg[p.id] && (
                            <div className="text-[10px] text-red-400 mt-0.5 whitespace-nowrap">{rowMsg[p.id]}</div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-center text-gray-500 text-sm">Keine Spieler gefunden</p>
            )}
          </div>
        </div>
      )}

      {/* ── Teams ── */}
      {tab === "teams" && (
        <div>
          {allTeams.length === 0 ? (
            <p className="text-gray-500">Keine Teams gefunden.</p>
          ) : (
            <>
              {/* Team-Navigation */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setTeamIdx((i) => Math.max(0, i - 1))}
                  disabled={teamIdx === 0}
                  className="px-3 py-2 bg-[#16213e] rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-lg"
                >
                  ‹
                </button>

                <div className="flex gap-2 flex-wrap">
                  {allTeams.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setTeamIdx(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        i === teamIdx
                          ? "bg-[#00ff87] text-black"
                          : "bg-[#16213e] hover:bg-[#0f3460] text-white"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setTeamIdx((i) => Math.min(allTeams.length - 1, i + 1))}
                  disabled={teamIdx === allTeams.length - 1}
                  className="px-3 py-2 bg-[#16213e] rounded-lg hover:bg-[#0f3460] disabled:opacity-30 transition-colors text-lg"
                >
                  ›
                </button>
              </div>

              {/* Kader-Übersicht */}
              {teamSquadLoading ? (
                <p className="text-gray-400 text-sm">Lädt…</p>
              ) : (() => {
                const byPos: Record<string, typeof teamSquad> = { GK: [], DEF: [], MID: [], FWD: [] };
                for (const sp of teamSquad) byPos[sp.fplPlayer.position]?.push(sp);
                const cols = [
                  { pos: "GK",  label: "Torhüter", max: 3,  color: "border-yellow-500" },
                  { pos: "DEF", label: "Abwehr",   max: 8,  color: "border-blue-500"   },
                  { pos: "MID", label: "Mittelfeld", max: 8, color: "border-green-500"  },
                  { pos: "FWD", label: "Sturm",    max: 6,  color: "border-red-500"    },
                ];
                const totalSpent = teamSquad.reduce((s, p) => s + p.boughtFor, 0);
                return (
                  <>
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-gray-400">
                        Spieler: <span className="text-white font-bold">{teamSquad.length}/25</span>
                      </span>
                      <span className="text-gray-400">
                        Ausgegeben: <span className="text-yellow-400 font-bold">{totalSpent} Mio</span>
                      </span>
                      <span className="text-gray-400">
                        Restbudget: <span className="text-[#00ff87] font-bold">{560 - totalSpent} Mio</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {cols.map(({ pos, label, max, color }) => (
                        <div key={pos} className={`bg-[#16213e] rounded-xl border-t-2 ${color} overflow-hidden`}>
                          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-700">
                            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                            <span className="text-xs text-gray-400">{byPos[pos].length}/{max}</span>
                          </div>
                          <div className="p-2 space-y-1 min-h-[120px]">
                            {byPos[pos].length === 0 ? (
                              <p className="text-xs text-gray-600 text-center pt-4">–</p>
                            ) : (
                              byPos[pos].map((sp) => (
                                <div key={sp.id} className="flex items-center justify-between px-2 py-1.5 bg-[#0f3460] rounded text-xs">
                                  <div>
                                    <div className="font-semibold text-white leading-tight">{sp.fplPlayer.webName}</div>
                                    <div className="text-gray-400 text-[10px]">{sp.fplPlayer.teamName}</div>
                                  </div>
                                  <span className="text-yellow-400 font-bold ml-2 shrink-0">{sp.boughtFor}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* ── Aufstellungen ── */}
      {tab === "lineups" && (
        <div>
          {!lineupStatus ? (
            <p className="text-gray-400 text-sm">Lädt…</p>
          ) : (
            <>
              <div className="bg-[#16213e] rounded-xl overflow-hidden mb-6">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="font-semibold">
                    Spieltag {lineupStatus.currentGwNumber ?? "–"} – Abgaben
                  </h2>
                  <span className="text-xs text-gray-400">
                    {lineupStatus.teams.filter((t) => t.currentGw?.submitted).length} / {lineupStatus.teams.length} eingereicht
                  </span>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                      <th className="px-4 py-2 text-left">Team</th>
                      <th className="px-4 py-2 text-center">Akt. GW</th>
                      <th className="px-4 py-2 text-center">Uhrzeit</th>
                      <th className="px-4 py-2 text-center">Gesamt</th>
                      <th className="px-4 py-2 text-center w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineupStatus.teams.map((t) => {
                      const submitted = t.currentGw?.submitted ?? false;
                      const submittedAt = t.currentGw?.submittedAt
                        ? new Date(t.currentGw.submittedAt).toLocaleString("de-AT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
                        : null;
                      const showHistory = lineupHistoryTeam === t.teamId;
                      return (
                        <>
                          <tr key={t.teamId} className="border-t border-gray-700/50 hover:bg-[#0f3460]/40 transition-colors">
                            <td className="px-4 py-3">
                              <div className="font-semibold">{t.teamName}</div>
                              <div className="text-xs text-gray-400">{t.username}</div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {submitted ? (
                                <span className="text-[#00ff87] text-lg">✓</span>
                              ) : (
                                <span className="text-red-400 text-lg">✗</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center text-xs text-gray-400">
                              {submittedAt ?? "–"}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold ${t.totalSubmitted === t.totalGameweeks ? "text-[#00ff87]" : "text-white"}`}>
                                {t.totalSubmitted}
                              </span>
                              <span className="text-gray-500 text-xs"> / {t.totalGameweeks}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => setLineupHistoryTeam(showHistory ? null : t.teamId)}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                                title="Verlauf anzeigen"
                              >
                                {showHistory ? "▲" : "▼"}
                              </button>
                            </td>
                          </tr>

                          {/* Verlauf-Zeile */}
                          {showHistory && (
                            <tr key={`${t.teamId}-history`} className="bg-[#0a1628]">
                              <td colSpan={5} className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Verlauf aller Spieltage</p>
                                <div className="flex flex-wrap gap-1">
                                  {t.history.filter((h) => h.gwNumber <= (lineupStatus.currentGwNumber ?? 38)).map((h) => (
                                    <div
                                      key={h.gwNumber}
                                      title={h.submittedAt ? new Date(h.submittedAt).toLocaleString("de-AT") : `GW ${h.gwNumber} – nicht eingereicht`}
                                      className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold ${
                                        h.submitted ? "bg-[#00ff87] text-black" : "bg-red-900/60 text-red-400"
                                      }`}
                                    >
                                      {h.gwNumber}
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Spielplan ── */}
      {tab === "schedule" && (
        <div className="space-y-6">
          <div className="bg-[#16213e] rounded-xl p-6">
            <h2 className="font-semibold mb-1">Schritt 1: Auktionsnummern vergeben (1–10)</h2>
            <p className="text-gray-400 text-sm mb-4">
              Die Nummer bestimmt den Spielplan. <span className="text-white">Spieltag 1:</span> Nr.1 vs Nr.10 · Nr.2 vs Nr.9 · Nr.3 vs Nr.8 · Nr.4 vs Nr.7 · Nr.5 vs Nr.6
            </p>
            {teamOrder.length === 0 ? (
              <p className="text-gray-500 text-sm">Noch keine Teams angelegt.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Reihenfolge anpassen</p>
                  {teamOrder.map((team, i) => (
                    <div key={team.id} className="flex items-center gap-3 bg-[#0f3460] rounded-lg px-4 py-2">
                      <span className="text-[#00ff87] font-bold text-lg w-8 text-center">{i + 1}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{team.name}</div>
                        <div className="text-gray-400 text-xs">{team.user.username}</div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => moveTeam(i, "up")} disabled={i === 0}
                          className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 disabled:opacity-30">▲</button>
                        <button onClick={() => moveTeam(i, "down")} disabled={i === teamOrder.length - 1}
                          className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 disabled:opacity-30">▼</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={saveTeamOrder} className="mt-2 w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300">
                    Nummern speichern
                  </button>
                  {orderMsg && <p className="text-sm text-green-400">{orderMsg}</p>}
                </div>
                {teamOrder.length === 10 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Vorschau Spieltag 1</p>
                    <div className="space-y-2">
                      {[0,1,2,3,4].map(i => (
                        <div key={i} className="flex items-center gap-2 bg-[#0f3460] rounded px-3 py-2 text-sm">
                          <span className="text-[#00ff87] font-bold w-4">{i+1}</span>
                          <span className="flex-1">{teamOrder[i]?.name}</span>
                          <span className="text-gray-400">vs</span>
                          <span className="flex-1 text-right">{teamOrder[9-i]?.name}</span>
                          <span className="text-[#00ff87] font-bold w-4 text-right">{10-i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 max-w-md">
            <h2 className="font-semibold mb-1">Schritt 2a: Spielplan aus Vorjahr übernehmen</h2>
            <p className="text-gray-400 text-sm mb-4">
              Übernimmt die exakten Paarungen (GW1–38) aus Saison 2024/25 und mappt sie 1:1 auf die aktuellen Teams nach sortOrder.
              Bereits gespielte Spieltage werden nicht überschrieben.
            </p>
            <button onClick={generateScheduleFromHistory} className="bg-[#00ff87] text-black font-bold px-6 py-2 rounded hover:bg-green-400">
              Spielplan aus Vorjahr laden
            </button>
            {historyScheduleMsg && (
              <p className={`mt-3 text-sm ${historyScheduleMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                {historyScheduleMsg}
              </p>
            )}
          </div>

          <div className="bg-[#16213e] rounded-xl p-6 max-w-md">
            <h2 className="font-semibold mb-1">Schritt 2b: Spielplan neu generieren (Berger)</h2>
            <p className="text-gray-400 text-sm mb-4">
              Erstellt 38 Spieltage neu nach dem Berger-Algorithmus. Überschreibt alle Spiele (inkl. gespielte!).
            </p>
            <button onClick={generateSchedule} className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300">
              Spielplan generieren
            </button>
            {scheduleMsg && (
              <p className={`mt-3 text-sm ${scheduleMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                {scheduleMsg}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── FPL Sync ── */}
      {tab === "sync" && (
        <div className="space-y-4 max-w-lg">

          {/* Neue Saison */}
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-6">
            <h2 className="font-bold text-red-400 mb-1">🔄 Neue Saison starten</h2>
            <p className="text-gray-400 text-sm mb-4">
              Löscht alle Kader, leert die Auktion und holt die aktuelle Spielerliste von der FPL-API.
              Die Teams und Nutzer bleiben erhalten. Alte Saisondaten bleiben als Archiv.
            </p>
            <div className="flex gap-2 mb-3">
              <input
                value={newSeasonName}
                onChange={(e) => { setNewSeasonName(e.target.value); setNewSeasonConfirm(false); setNewSeasonMsg(""); }}
                placeholder="z.B. 2026/27"
                className="flex-1 bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white"
              />
              <button
                onClick={startNewSeason}
                disabled={!newSeasonName.trim() || newSeasonLoading}
                className={`font-bold px-4 py-2 rounded transition-colors disabled:opacity-40 ${
                  newSeasonConfirm
                    ? "bg-red-500 hover:bg-red-400 text-white animate-pulse"
                    : "bg-red-700 hover:bg-red-600 text-white"
                }`}
              >
                {newSeasonLoading ? "Läuft…" : newSeasonConfirm ? "⚠ Wirklich starten?" : "Saison starten"}
              </button>
            </div>
            {newSeasonConfirm && !newSeasonLoading && (
              <p className="text-yellow-400 text-xs mb-2">
                Alle 10 Kader werden geleert! Nochmal klicken zum Bestätigen.
              </p>
            )}
            {newSeasonMsg && (
              <p className={`text-sm ${newSeasonMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                {newSeasonMsg}
              </p>
            )}
          </div>

          {/* FPL Spieler-Sync */}
          <div className="bg-[#16213e] rounded-xl p-6">
            <h2 className="font-semibold mb-2">FPL Spielerdaten synchronisieren</h2>
            <p className="text-gray-400 text-sm mb-4">Aktualisiert Spielernamen, Vereine und Punkte (ohne Kader zu leeren)</p>
            <button onClick={syncPlayers} className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300">
              Spieler synchronisieren
            </button>
          </div>

          {/* Spieltag-Punkte */}
          <div className="bg-[#16213e] rounded-xl p-6">
            <h2 className="font-semibold mb-2">Spieltag-Punkte eintragen</h2>
            <div className="flex gap-2">
              <input value={gwNum} onChange={(e) => setGwNum(e.target.value)} type="number" min="1" max="38" placeholder="GW-Nummer" className="flex-1 bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
              <button onClick={syncGW} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300">Sync</button>
            </div>
          </div>

          {syncMsg && <p className="text-sm text-green-400">{syncMsg}</p>}

          {/* PL-Spielplan Modus */}
          <div className="bg-[#16213e] rounded-xl p-6">
            <h2 className="font-semibold mb-1">PL-Spielplan Modus</h2>
            <p className="text-gray-400 text-sm mb-4">
              Steuert was unter <span className="text-white">&bdquo;Letzte Saison&ldquo;</span> im Menü angezeigt wird.
              Wenn die neue PL-Saison startet: auf Live umschalten.
              Der historische Spielplan bleibt im <button onClick={() => setTab("history")} className="text-[#00ff87] underline">History-Tab</button> erhalten.
            </p>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded text-xs font-bold ${plMode === "history" ? "bg-[#00ff87] text-black" : "bg-gray-700 text-gray-400"}`}>
                📁 History ({PREV_SEASON_NAME})
              </div>
              <button
                onClick={togglePlMode}
                className="px-4 py-2 bg-[#0f3460] hover:bg-[#163a6e] rounded-lg text-sm font-medium transition-colors border border-gray-600"
              >
                {plMode === "history" ? "→ Auf Live umschalten" : "→ Auf History umschalten"}
              </button>
              <div className={`px-3 py-1 rounded text-xs font-bold ${plMode === "live" ? "bg-[#00ff87] text-black" : "bg-gray-700 text-gray-400"}`}>
                🔴 Live (PL API)
              </div>
            </div>
            {plModeMsg && <p className="mt-3 text-sm text-green-400">{plModeMsg}</p>}
          </div>
        </div>
      )}
      {/* ── History ── */}
      {tab === "history" && (() => {
        const gwData = PREV_SEASON.find((g) => g.gw === historyGW);
        return (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#00ff87]">Liga-Spielplan {PREV_SEASON_NAME}</h2>
              <p className="text-xs text-gray-500 mt-0.5">Archiv – wird hier immer angezeigt, unabhängig vom PL-Spielplan-Modus</p>
            </div>

            <div className="overflow-x-auto pb-2 mb-6">
              <div className="flex gap-1.5 w-max">
                {PREV_SEASON.map(({ gw }) => {
                  const gwMatches = PREV_SEASON.find((g) => g.gw === gw)?.matches ?? [];
                  const allDone = gwMatches.every((m) => m.hs !== null && m.as !== null);
                  const isCurrent = gw === historyGW;
                  return (
                    <div key={gw} ref={isCurrent ? historyGWRef : null}>
                      <button
                        onClick={() => setHistoryGW(gw)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors whitespace-nowrap ${
                          isCurrent ? "bg-[#00ff87] text-black"
                            : allDone ? "bg-[#16213e] text-gray-400"
                            : "bg-[#16213e] hover:bg-[#0f3460] text-white"
                        }`}
                      >
                        GW {gw}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {gwData && (
              <div className="bg-[#16213e] rounded-xl overflow-hidden max-w-xl">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <span className="font-semibold text-white">Spieltag {historyGW}</span>
                  <span className="text-xs text-gray-400">
                    {gwData.matches.filter((m) => m.hs !== null && m.as !== null).length} / {gwData.matches.length} gespielt
                  </span>
                </div>
                <div>
                  {gwData.matches.map((m, i) => {
                    const finished = m.hs !== null && m.as !== null;
                    const homeWin = finished && m.hs! > m.as!;
                    const awayWin = finished && m.as! > m.hs!;
                    return (
                      <div key={i} className="flex items-center px-4 py-3 border-b border-gray-800 last:border-0">
                        <div className="flex-1 text-right">
                          <span className={`text-sm font-semibold ${homeWin ? "text-[#00ff87]" : finished ? "text-white" : "text-gray-400"}`}>
                            {m.home}
                          </span>
                        </div>
                        <div className="mx-4 min-w-[64px] text-center">
                          {finished
                            ? <span className="text-lg font-bold text-[#00ff87]">{m.hs} : {m.as}</span>
                            : <span className="text-xs text-gray-500">vs</span>}
                        </div>
                        <div className="flex-1 text-left">
                          <span className={`text-sm font-semibold ${awayWin ? "text-[#00ff87]" : finished ? "text-white" : "text-gray-400"}`}>
                            {m.away}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
