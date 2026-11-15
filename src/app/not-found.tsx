import Link from "next/link";
export default function NotFound() {
  return <main className="not-found"><div className="not-found-art">404</div><span className="eyebrow">Lost between takes</span><h1>This space doesn&apos;t exist.</h1><p>That page may have moved, but there are plenty of good spaces waiting for you.</p><Link className="button button-primary" href="/">Return to home</Link></main>;
}
