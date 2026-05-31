"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { id: number; username: string; isAdmin: boolean; team: { id: number; name: string } | null };
type AuthCtx = { user: User | null; loading: boolean; refresh: () => void };

const AuthContext = createContext<AuthCtx>({ user: null, loading: true, refresh: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(refresh, []);

  return <AuthContext.Provider value={{ user, loading, refresh }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
