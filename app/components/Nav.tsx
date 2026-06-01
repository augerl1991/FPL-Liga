"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers";
import { useRouter, usePathname } from "next/navigation";

const LINKS = [
  { href: "/tabelle",      label: "Tabelle",      adminOnly: false },
  { href: "/spielplan",    label: "Spielplan",    adminOnly: false },
  { href: "/aufstellung",  label: "Aufstellung",  hideForAdmin: true },
  { href: "/kader",        label: "Mein Kader",   hideForAdmin: true },
  { href: "/alle-kader",   label: "Alle Kader",   adminOnly: false },
  { href: "/pl-spielplan", label: "Liga-Archiv",  adminOnly: false },
];

export default function Nav() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    refresh();
    router.push("/login");
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <nav className="sticky top-0 z-50 glass border-x-0 border-t-0 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2 sm:gap-4">
        <Link href="/start" className="flex items-center gap-2 shrink-0 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#38003c] ring-1 ring-[#00ff87]/40 text-[#00ff87] font-black text-xs group-hover:ring-[#00ff87]/70 transition-all">
            FPL
          </span>
          <span className="hidden sm:inline text-[#00ff87] font-bold tracking-tight accent-glow">Liga</span>
        </Link>

        {user && (
          <>
            <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {LINKS.filter((l) => !(l.hideForAdmin && user?.isAdmin)).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    isActive(l.href)
                      ? "bg-white/10 text-[#00ff87] font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    isActive("/admin")
                      ? "bg-yellow-400/15 text-yellow-300 font-semibold"
                      : "text-yellow-400/80 hover:text-yellow-300 hover:bg-white/5"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/profil"
                className="hidden sm:flex flex-col items-end leading-tight px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-xs text-white font-medium">{user.username}</span>
                {user.team?.name && <span className="text-[10px] text-gray-400">{user.team.name}</span>}
              </Link>
              <button
                onClick={logout}
                className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-1.5 transition-colors"
              >
                Abmelden
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
