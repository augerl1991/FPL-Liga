"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/providers";

export default function ProfilPage() {
  const { user, refresh } = useAuth();

  // ── Reiter: Einstellungen / Historie ──
  const [tab, setTab] = useState<"settings" | "history">("settings");

  // ── Vereinsname ──
  const [newName, setNewName] = useState("");
  const [nameLocked, setNameLocked] = useState(false); // bereits diese Saison geändert
  const [nameMsg, setNameMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [nameLoading, setNameLoading] = useState(false);

  // ── Passwort ──
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  // Prüfen ob Vereinsname bereits geändert (Lock vom Server testen)
  useEffect(() => {
    // Wir probieren mit einem leeren Namen – der Server antwortet mit 409 wenn gesperrt
    // Stattdessen: beim ersten echten Submit merken wir den Lock
  }, []);

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameMsg(null);
    setNameLoading(true);
    const res = await fetch("/api/profile/team-name", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    const data = await res.json();
    setNameLoading(false);
    if (res.ok) {
      setNameMsg({ type: "ok", text: `Vereinsname auf „${data.name}" geändert` });
      setNameLocked(true);
      setNewName("");
      refresh();
    } else if (res.status === 409) {
      setNameLocked(true);
      setNameMsg({ type: "err", text: data.error });
    } else {
      setNameMsg({ type: "err", text: data.error || "Fehler" });
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (next !== confirm) {
      setPwMsg({ type: "err", text: "Neue Passwörter stimmen nicht überein" });
      return;
    }
    setPwLoading(true);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = await res.json();
    setPwLoading(false);
    if (res.ok) {
      setPwMsg({ type: "ok", text: "Passwort erfolgreich geändert" });
      setCurrent(""); setNext(""); setConfirm("");
    } else {
      setPwMsg({ type: "err", text: data.error || "Fehler" });
    }
  }

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-[#00ff87]">Mein Profil</h1>

      {/* Reiter */}
      <div className="flex gap-1 bg-[#0f3460] rounded-lg p-1">
        <button
          onClick={() => setTab("settings")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
            tab === "settings" ? "bg-[#00ff87] text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Einstellungen
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
            tab === "history" ? "bg-[#00ff87] text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Historie
        </button>
      </div>

      {tab === "history" ? (
        <div className="space-y-4">
          <Link
            href="/pl-spielplan"
            className="group block bg-[#16213e] rounded-xl p-5 ring-1 ring-black/30 hover:ring-[#00ff87]/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div className="flex-1">
                <span className="font-bold text-white group-hover:text-[#00ff87] transition-colors">Letzte Saison</span>
                <p className="text-xs text-gray-400">Premier-League-Spielplan der Vorsaison</p>
              </div>
              <span className="text-xl text-gray-500 group-hover:text-[#00ff87] transition-colors">→</span>
            </div>
          </Link>
          <p className="text-xs text-gray-600 text-center italic">Weitere Historie (deine Spieltage) folgt.</p>
        </div>
      ) : (
        <>
      {/* Info-Karte */}
      <div className="bg-[#16213e] rounded-xl p-5 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Anmeldename</span>
          <span className="font-semibold">{user?.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Vereinsname</span>
          <span className="font-semibold text-[#00ff87]">{user?.team?.name ?? "–"}</span>
        </div>
      </div>

      {/* Vereinsname ändern */}
      <div className="bg-[#16213e] rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-1">Vereinsname ändern</h2>
        <p className="text-gray-400 text-xs mb-4">
          Einmal pro Saison frei wählbar. Der Anmeldename bleibt immer gleich.
        </p>
        <form onSubmit={handleNameSubmit} className="space-y-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={user?.team?.name ?? "Neuer Vereinsname"}
            maxLength={40}
            required
            disabled={nameLocked}
            className="w-full bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff87] disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={nameLocked || nameLoading || !newName.trim()}
            className="w-full bg-[#00ff87] text-black font-bold py-2.5 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {nameLoading ? "Speichern…" : nameLocked ? "Bereits diese Saison geändert" : "Vereinsname speichern"}
          </button>
        </form>
        {nameMsg && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${nameMsg.type === "ok" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
            {nameMsg.text}
          </div>
        )}
      </div>

      {/* Passwort ändern */}
      <div className="bg-[#16213e] rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-1">Passwort ändern</h2>
        <p className="text-gray-400 text-xs mb-4">Mindestens 6 Zeichen.</p>
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Aktuelles Passwort"
            required
            className="w-full bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff87]"
          />
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            placeholder="Neues Passwort"
            minLength={6}
            required
            className="w-full bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff87]"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Neues Passwort bestätigen"
            required
            className="w-full bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff87]"
          />
          <button
            type="submit"
            disabled={pwLoading}
            className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
          >
            {pwLoading ? "Speichern…" : "Passwort ändern"}
          </button>
        </form>
        {pwMsg && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${pwMsg.type === "ok" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
            {pwMsg.text}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
