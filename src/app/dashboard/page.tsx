"use client";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
export default function DashboardPage() {
  const { user } = useAuth();
  return <ProtectedRoute><main className="form-page"><span className="eyebrow">Your creative desk</span><h1>Welcome, {user?.name.split(" ")[0]}.</h1><p className="muted">Everything you need to make your next project happen.</p><div className="category-grid" style={{ marginTop: 35 }}><Link className="category-card" href="/add-studio"><strong>List a studio</strong><span>→</span></Link><Link className="category-card" href="/my-listings"><strong>My listings</strong><span>→</span></Link><Link className="category-card" href="/my-bookings"><strong>My bookings</strong><span>→</span></Link></div></main></ProtectedRoute>;
}
