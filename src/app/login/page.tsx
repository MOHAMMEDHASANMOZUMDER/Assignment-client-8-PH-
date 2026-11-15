"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/lib/api";
import { useAuth } from "@/components/auth-provider";
import { betterAuthClient } from "@/lib/better-auth";
export default function LoginPage() {
  const router = useRouter(); const { refresh } = useAuth(); const [form, setForm] = useState({ email: "", password: "" }); const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setBusy(true); try { await login(form); await refresh(); toast.success("Welcome back."); router.push("/dashboard"); } catch (error) { toast.error(error instanceof Error ? error.message : "Login failed."); } finally { setBusy(false); } };
  const socialLogin = async () => { setBusy(true); const result = await betterAuthClient.signIn.social({ provider: "google", callbackURL: "/dashboard" }); if (result.error) { toast.error(result.error.message || "Could not sign in with Google."); setBusy(false); } };
  return <main className="form-page"><span className="eyebrow">Welcome back</span><h1>Log in to create.</h1><p className="muted">Pick up where your next idea begins.</p><form className="form-card" onSubmit={submit}><div className="field"><label htmlFor="email">Email</label><input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div><div className="field"><label htmlFor="password">Password</label><input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="forgot-link" type="button" onClick={() => toast("Password recovery is not enabled for this assignment.")}>Forgot password?</button></div><button className="button button-primary" disabled={busy}>{busy ? "Signing in..." : "Log in"}</button><div className="auth-divider"><span>or continue with</span></div><button className="button button-ghost social-single" type="button" disabled={busy} onClick={() => void socialLogin()}>Continue with Google</button></form><p className="auth-note">New to StudioSpace? <Link href="/register">Create an account</Link></p></main>;
}
