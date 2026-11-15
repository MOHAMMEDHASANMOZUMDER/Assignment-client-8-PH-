"use client";
import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { useAuth } from "./auth-provider";
export function Header() {
  const { user, logout } = useAuth();
  return <header className="site-header"><Link href="/" className="brand">STUDIO<span>SPACE</span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/studios">Explore studios</Link><Link href="/#how-it-works">How it works</Link></nav><div className="nav-actions">{user ? <><Link className="button button-ghost button-small" href="/dashboard"><UserRound size={15} /> {user.name.split(" ")[0]}</Link><button className="button button-small" onClick={() => void logout()} aria-label="Log out"><LogOut size={15} /></button></> : <><Link className="button button-ghost button-small" href="/login">Log in</Link><Link className="button button-primary button-small" href="/register">Join StudioSpace</Link></>}</div></header>;
}
