"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";

type Team = { id: number; name: string; user: { username: string } };
type Player = { id: number; webName: string; position: string; teamName: string; price: number; auctionResult: { team: { name: string } } | null };

export default function AdminSeite() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"users" | "auction" | "schedule" | "sync">("users");

  // User-Erstellung
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [userMsg, setUserMsg] = useState("");

  // Auktion
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerSearch, setPlayerSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionMsg, setAuctionMsg] = useState("");

  // Spielplan
  const [scheduleMsg, setScheduleMsg] = useState("");

  // Sync
  const [syncMsg, setSyncMsg] = useState("");
  const [gwNum, setGwNum] = useState("");

  useEffect(() => {
    if (!loading && !user?.isAdmin) router.push("/tabelle");
  }, [user, loading, router]);

  useEffect(() => {
    if (tab === "auction") {
      fetch("/api/admin/teams").then((r) => r.json()).then((d) => Array.isArray(d) && setTeams(d));
    }
  }, [tab]);

  useEffect(() => {
    if (tab !== "auction") return;
    const q = playerSearch ? `&search=${encodeURIComponent(playerSearch)}` : "&available=true";
    fetch(`/api/players?${q}`).then((r) => r.json()).then((d) => Array.isArray(d) && setPlayers(d));
  }, [playerSearch, tab]);

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

  async function assignPlayer(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: parseInt(selectedTeam), fplPlayerId: parseInt(selectedPlayer), price: parseInt(auctionPrice) }),
    });
    const d = await res.json();
    setAuctionMsg(res.ok ? "✓ Spieler zugewiesen" : `✗ ${d.error}`);
    if (res.ok) {
      const q = playerSearch ? `&search=${encodeURIComponent(playerSearch)}` : "&available=true";
      fetch(`/api/players?${q}`).then((r) => r.json()).then((d) => Array.isArray(d) && setPlayers(d));
    }
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

  async function syncPlayers() {
    setSyncMsg("Lädt...");
    const res = await fetch("/api/fpl/sync", { method: "POST" });
    const d = await res.json();
    setSyncMsg(res.ok ? `✓ ${d.upserted} Spieler synchronisiert` : `✗ ${d.error}`);
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

  const tabs = [
    { key: "users", label: "Nutzer anlegen" },
    { key: "auction", label: "Auktion" },
    { key: "schedule", label: "Spielplan" },
    { key: "sync", label: "FPL Sync" },
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

      {tab === "auction" && (
        <div className="bg-[#16213e] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Spieler zuweisen</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={assignPlayer} className="space-y-3">
              <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white">
                <option value="">Team wählen...</option>
                {teams.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.user.username})</option>)}
              </select>
              <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white">
                <option value="">Spieler wählen...</option>
                {players.filter((p) => !p.auctionResult).map((p) => (
                  <option key={p.id} value={p.id}>{p.webName} ({p.position} · {p.teamName} · {(p.price / 10).toFixed(1)}m)</option>
                ))}
              </select>
              <input value={auctionPrice} onChange={(e) => setAuctionPrice(e.target.value)} type="number" placeholder="Auktionspreis (Mio)" required className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
              <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300">Zuweisen</button>
              {auctionMsg && <p className="text-sm text-green-400">{auctionMsg}</p>}
            </form>
            <div>
              <input value={playerSearch} onChange={(e) => setPlayerSearch(e.target.value)} placeholder="Spieler suchen..." className="w-full bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white mb-3" />
              <div className="max-h-64 overflow-y-auto space-y-1">
                {players.slice(0, 30).map((p) => (
                  <div key={p.id} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${p.auctionResult ? "opacity-40" : "bg-[#0f3460]"}`}>
                    <span className="text-xs bg-[#38003c] px-1 rounded">{p.position}</span>
                    <span className="flex-1">{p.webName}</span>
                    <span className="text-xs text-gray-400">{p.teamName}</span>
                    <span className="text-xs text-[#00ff87]">{(p.price / 10).toFixed(1)}m</span>
                    {p.auctionResult && <span className="text-xs text-gray-500">{p.auctionResult.team.name}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "schedule" && (
        <div className="bg-[#16213e] rounded-xl p-6 max-w-md">
          <h2 className="font-semibold mb-2">Spielplan generieren</h2>
          <p className="text-gray-400 text-sm mb-4">38 Spieltage für 10 Teams (alle müssen bereits angelegt sein)</p>
          <button onClick={generateSchedule} className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300">
            Spielplan generieren
          </button>
          {scheduleMsg && <p className="mt-3 text-sm text-green-400">{scheduleMsg}</p>}
        </div>
      )}

      {tab === "sync" && (
        <div className="bg-[#16213e] rounded-xl p-6 max-w-md space-y-6">
          <div>
            <h2 className="font-semibold mb-2">FPL Spielerdaten synchronisieren</h2>
            <p className="text-gray-400 text-sm mb-4">Holt alle Spieler + Preise von der FPL-API</p>
            <button onClick={syncPlayers} className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300">
              Spieler synchronisieren
            </button>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Spieltag-Punkte eintragen</h2>
            <div className="flex gap-2">
              <input value={gwNum} onChange={(e) => setGwNum(e.target.value)} type="number" min="1" max="38" placeholder="GW-Nummer" className="flex-1 bg-[#0f3460] border border-gray-600 rounded px-3 py-2 text-white" />
              <button onClick={syncGW} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300">Sync</button>
            </div>
          </div>
          {syncMsg && <p className="text-sm text-green-400">{syncMsg}</p>}
        </div>
      )}
    </div>
  );
}
