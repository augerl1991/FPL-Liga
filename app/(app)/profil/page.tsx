"use client";
import { useState } from "react";
import { useAuth } from "@/app/providers";

export default function ProfilPage() {
  const { user } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) {
      setMsg({ type: "err", text: "Neue Passwörter stimmen nicht überein" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: "ok", text: "Passwort erfolgreich geändert!" });
        setCurrent(""); setNext(""); setConfirm("");
      } else {
        setMsg({ type: "err", text: data.error || "Fehler" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Profil</h1>
      <p className="text-gray-400 mb-8">
        Angemeldet als: <span className="text-[#00ff87] font-semibold">{user?.username}</span>
        {user?.team?.name && <> · Team: <span className="text-white">{user.team.name}</span></>}
      </p>

      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5">Passwort ändern</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Aktuelles Passwort</label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              className="w-full bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Neues Passwort</label>
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
              placeholder="Mindestens 6 Zeichen"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Neues Passwort bestätigen</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
              placeholder="••••••••"
            />
          </div>

          {msg && (
            <div className={`p-3 rounded-lg text-sm font-medium ${msg.type === "ok" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00ff87] text-black font-bold py-2.5 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Speichern..." : "Passwort ändern"}
          </button>
        </form>
      </div>
    </div>
  );
}
