"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { user, refresh } = useAuth();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    refresh();
    router.push("/login");
  }

  return (
    <nav className="bg-[#38003c] px-6 py-3 flex items-center gap-6 shadow-lg">
      <span className="text-[#00ff87] font-bold text-lg">FPL Liga</span>
      {user && (
        <>
          <Link href="/tabelle" className="hover:text-[#00ff87] transition-colors">Tabelle</Link>
          <Link href="/spielplan" className="hover:text-[#00ff87] transition-colors">Spielplan</Link>
          <Link href="/kader" className="hover:text-[#00ff87] transition-colors">Mein Kader</Link>
          <Link href="/aufstellung" className="hover:text-[#00ff87] transition-colors">Aufstellung</Link>
          {user.isAdmin && (
            <Link href="/admin" className="hover:text-[#00ff87] transition-colors text-yellow-400">Admin</Link>
          )}
          <div className="ml-auto flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.username} · {user.team?.name}</span>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition-colors">
              Abmelden
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
