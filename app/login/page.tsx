"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { refresh } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      refresh();
      router.push("/start");
    } else {
      const data = await res.json();
      setError(data.error || "Fehler beim Login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass p-8 rounded-2xl w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="relative inline-block mb-3">
            <div className="absolute inset-0 rounded-2xl bg-[#00ff87]/20 blur-xl" />
            <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#38003c] to-[#1a0a2e] grid place-items-center ring-2 ring-[#00ff87]/40">
              <span className="text-[#00ff87] font-black text-xl accent-glow">FPL</span>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">FPL Liga</h1>
          <p className="text-gray-400 text-sm mt-1">Private Fantasy Liga</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="username"
            spellCheck={false}
            className="bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0f3460] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn-primary py-3">
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}
