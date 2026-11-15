"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return <footer><div className="footer-grid"><div><strong className="brand footer-brand">STUDIO<span>SPACE</span></strong><p>Space to make something meaningful.</p><a className="footer-social" href="https://x.com" target="_blank" rel="noreferrer">X <ArrowUpRight size={14} /></a></div><div><h3>Explore</h3><Link href="/studios">All studios</Link><Link href="/studios?category=Photography">Photography</Link><Link href="/studios?category=Music%20Suite">Music suites</Link></div><div><h3>StudioSpace</h3><Link href="/#how-it-works">How it works</Link><Link href="/add-studio">Host your space</Link><Link href="/register">Create account</Link></div><div><h3>Stay in the loop</h3><p>New spaces and creator stories, occasionally.</p><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" required /><button className="button button-primary">Join</button></form></div></div><div className="footer-bottom"><span>© 2026 StudioSpace</span><span>Made for people who make things.</span><span>Terms · Privacy</span></div></footer>;
}
