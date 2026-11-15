"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); const router = useRouter();
  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user, router]);
  if (loading || !user) return <div className="empty" style={{ margin: "100px auto", maxWidth: 500 }}>Checking your secure session...</div>;
  return children;
}
