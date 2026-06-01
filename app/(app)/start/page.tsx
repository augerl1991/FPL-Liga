"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/providers";

type Tile = {
  href: string;
  title: string;
  desc: string;
  emoji: string;
};

const ADMIN_SECTIONS = [
  { tab: "users", label: "Nutzer anlegen", emoji: "➕" },
  { tab: "auction", label: "Auktion", emoji: "💰" },
  { tab: "teams", label: "Teams", emoji: "👔" },
  { tab: "lineups", label: "Aufstellungen", emoji: "📋" },
  { tab: "schedule", label: "Spielplan", emoji: "🗓️" },
  { tab: "sync", label: "FPL Sync", emoji: "🔄" },
  { tab: "history", label: "History", emoji: "📁" },
];

function AdminMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-yellow-400/80 hover:text-yellow-300 glass-soft rounded-full px-3 py-1.5 transition-colors"
      >
        <span>🛠️</span> Admin <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 glass rounded-xl p-1.5 z-50 shadow-2xl">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-yellow-300 hover:bg-white/10 transition-colors font-semibold"
          >
            <span>🛠️</span> Admin-Übersicht
          </Link>
          <div className="my-1 border-t border-white/10" />
          {ADMIN_SECTIONS.map((s) => (
            <Link
              key={s.tab}
              href={`/admin?tab=${s.tab}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>{s.emoji}</span> {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const SPIELBETRIEB: Tile[] = [
  { href: "/spielplan", title: "Spielplan", desc: "Begegnungen & Ergebnisse", emoji: "📅" },
  { href: "/tabelle", title: "Tabelle", desc: "Aktueller Stand der Liga", emoji: "🏆" },
];

const KADER: Tile[] = [
  { href: "/kader", title: "Mein Kader", desc: "Deine Spieler verwalten", emoji: "👥" },
  { href: "/alle-kader", title: "Alle Kader", desc: "Kader der Mitspieler", emoji: "🗂️" },
];

function TileCard({ t }: { t: Tile }) {
  return (
    <Link href={t.href} className="group glass-hover rounded-2xl p-5 flex flex-col gap-2">
      <span className="text-3xl drop-shadow">{t.emoji}</span>
      <span className="font-bold text-white group-hover:text-[#00ff87] transition-colors">{t.title}</span>
      <span className="text-xs text-gray-400">{t.desc}</span>
    </Link>
  );
}

export default function StartPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Dezente Leiste oben rechts: Profil */}
      <div className="flex justify-end gap-2 text-xs">
        <Link href="/profil" className="flex items-center gap-1.5 text-gray-400 hover:text-white glass-soft rounded-full px-3 py-1.5 transition-colors">
          <span>⚙️</span> Profil
        </Link>
        {user?.isAdmin && <AdminMenu />}
      </div>

      {/* Logo-Platzhalter, zentriert */}
      <div className="flex flex-col items-center justify-center text-center -mt-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-[#00ff87]/20 blur-2xl" />
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#38003c] to-[#1a0a2e] grid place-items-center shadow-2xl ring-2 ring-[#00ff87]/40">
            <span className="text-[#00ff87] font-black text-4xl leading-none accent-glow">FPL</span>
          </div>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">FPL Liga</h1>
        {user && (
          <p className="mt-1 text-gray-400 text-sm">
            Willkommen zurück, <span className="text-white font-medium">{user.username}</span>
            {user.team?.name && <> · <span className="text-[#00ff87]">{user.team.name}</span></>}
          </p>
        )}
        <p className="mt-2 text-[11px] text-gray-600 italic">(Logo-Platzhalter – Inhalt folgt)</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-7">
        {/* Hauptaktion: Aufstellung */}
        <Link
          href="/aufstellung"
          className="group relative block overflow-hidden rounded-2xl p-6 ring-1 ring-[#00ff87]/30 hover:ring-[#00ff87]/60 transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(110deg, rgba(56,0,60,0.85), rgba(15,52,96,0.7))" }}
        >
          <div className="absolute -right-6 -top-8 text-[7rem] opacity-10 group-hover:opacity-20 transition-opacity select-none">⚽</div>
          <div className="relative flex items-center gap-4">
            <span className="text-4xl drop-shadow">⚽</span>
            <div className="flex-1">
              <span className="font-bold text-lg text-[#00ff87] accent-glow">Aufstellung</span>
              <p className="text-sm text-gray-300">Stell dein Team für den aktuellen Spieltag auf</p>
            </div>
            <span className="text-2xl text-gray-400 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all">→</span>
          </div>
        </Link>

        {/* Reihe: Spielbetrieb */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 px-1">Spielbetrieb</h2>
          <div className="grid grid-cols-2 gap-4">
            {SPIELBETRIEB.map((t) => <TileCard key={t.href} t={t} />)}
          </div>
        </section>

        {/* Reihe: Kader */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 px-1">Kader</h2>
          <div className="grid grid-cols-2 gap-4">
            {KADER.map((t) => <TileCard key={t.href} t={t} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
