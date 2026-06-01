"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers";

type Tile = {
  href: string;
  title: string;
  desc: string;
  emoji: string;
};

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
    <Link
      href={t.href}
      className="group bg-[#16213e] rounded-xl p-5 flex flex-col gap-2 ring-1 ring-black/30 hover:ring-[#00ff87]/40 hover:bg-[#1b2a4e] transition-all"
    >
      <span className="text-3xl">{t.emoji}</span>
      <span className="font-bold text-white group-hover:text-[#00ff87] transition-colors">{t.title}</span>
      <span className="text-xs text-gray-400">{t.desc}</span>
    </Link>
  );
}

export default function StartPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Dezente Leiste oben rechts: Historie + Profil */}
      <div className="flex justify-end gap-2 text-xs">
        <Link
          href="/pl-spielplan"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 bg-[#16213e]/60 rounded-full px-3 py-1.5 transition-colors"
        >
          <span>📊</span> Historie
        </Link>
        <Link
          href="/profil"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 bg-[#16213e]/60 rounded-full px-3 py-1.5 transition-colors"
        >
          <span>⚙️</span> Profil
        </Link>
        {user?.isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-yellow-400/70 hover:text-yellow-300 bg-[#16213e]/60 rounded-full px-3 py-1.5 transition-colors"
          >
            <span>🛠️</span> Admin
          </Link>
        )}
      </div>

      {/* Logo-Platzhalter, zentriert */}
      <div className="flex flex-col items-center justify-center text-center -mt-2">
        <div className="w-28 h-28 rounded-2xl bg-[#38003c] flex items-center justify-center shadow-xl ring-2 ring-[#00ff87]/30">
          <span className="text-[#00ff87] font-black text-4xl leading-none">FPL</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">FPL Liga</h1>
        {user && (
          <p className="mt-1 text-gray-400 text-sm">
            Willkommen zurück, <span className="text-white">{user.username}</span>
            {user.team?.name && <> · {user.team.name}</>}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-600 italic">(Logo-Platzhalter – Inhalt folgt)</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hauptaktion: Aufstellung */}
        <Link
          href="/aufstellung"
          className="group block bg-gradient-to-r from-[#38003c] to-[#0f3460] rounded-xl p-5 ring-1 ring-[#00ff87]/30 hover:ring-[#00ff87]/60 transition-all"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">⚽</span>
            <div className="flex-1">
              <span className="font-bold text-lg text-[#00ff87]">Aufstellung</span>
              <p className="text-sm text-gray-300">Stell dein Team für den aktuellen Spieltag auf</p>
            </div>
            <span className="text-2xl text-gray-500 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all">→</span>
          </div>
        </Link>

        {/* Reihe: Spielbetrieb */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Spielbetrieb</h2>
          <div className="grid grid-cols-2 gap-4">
            {SPIELBETRIEB.map((t) => <TileCard key={t.href} t={t} />)}
          </div>
        </section>

        {/* Reihe: Kader */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-1">Kader</h2>
          <div className="grid grid-cols-2 gap-4">
            {KADER.map((t) => <TileCard key={t.href} t={t} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
