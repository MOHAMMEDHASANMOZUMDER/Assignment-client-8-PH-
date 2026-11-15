"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout } from "@/lib/api";
import type { User } from "@/lib/types";
import toast from "react-hot-toast";

type AuthContextType = { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, refresh: async () => {}, logout: async () => {} });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  const refresh = async () => { try { setUser((await getMe()).user); } catch { setUser(null); } finally { setLoading(false); } };
  useEffect(() => { void refresh(); }, []);
  const logout = async () => { await apiLogout(); setUser(null); toast.success("You have been logged out."); };
  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
