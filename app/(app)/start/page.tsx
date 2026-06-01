"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers";

type Tile = {
  href: string;
  title: string;
  desc: string;
  emoji: string;
  adminOnly?: boolean;
};

const TILES: Tile[] = [
  { href: "/tabelle", title: "Tabelle", desc: "Aktueller Stand der Liga", emoji: "🏆" },
  { href: "/spielplan", title: "Spielplan", desc: "Begegnungen & Ergebnisse", emoji: "📅" },
  { href: "/aufstellung", title: "Aufstellung", desc: "Dein Team aufstellen", emoji: "⚽" },
  { href: "/kader", title: "Mein Kader", desc: "Deine Spieler verwalten", emoji: "👥" },
  { href: "/alle-kader", title: "Alle Kader", desc: "Kader der Mitspieler", emoji: "🗂️" },
  { href: "/pl-spielplan", title: "Letzte Saison", desc: "Premier-League-Spielplan", emoji: "📊" },
  { href: "/profil", title: "Profil", desc: "Deine Einstellungen", emoji: "⚙️" },
  { href: "/admin", title: "Admin", desc: "Liga verwalten", emoji: "🛠️", adminOnly: true },
];

export default function StartPage() {
  const { user } = useAuth();
  const tiles = TILES.filter((t) => !t.adminOnly || user?.isAdmin);

  return (
    <div className="space-y-10">
      {/* Logo-Platzhalter, zentriert */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
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

      {/* Navigations-Kacheln */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`group bg-[#16213e] rounded-xl p-5 flex flex-col gap-2 ring-1 ring-black/30 hover:ring-[#00ff87]/40 hover:bg-[#1b2a4e] transition-all ${
              t.adminOnly ? "md:col-span-1" : ""
            }`}
          >
            <span className="text-3xl">{t.emoji}</span>
            <span
              className={`font-bold ${
                t.adminOnly ? "text-yellow-400" : "text-white"
              } group-hover:text-[#00ff87] transition-colors`}
            >
              {t.title}
            </span>
            <span className="text-xs text-gray-400">{t.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
