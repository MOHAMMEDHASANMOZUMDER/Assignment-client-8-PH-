import Link from "next/link";
import { ArrowRight, BadgeCheck, Camera, Headphones, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { StudioCard } from "@/components/studio-card";
import { getStudios } from "@/lib/api";

export default async function Home() {
  const studios = await getStudios(6);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> Spaces for the next great take</span>
          <h1>Make room for <em>creative</em> work.</h1>
          <p>Discover extraordinary studios, sound stages, and production spaces designed for your best ideas.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/studios">Explore studios <ArrowRight size={17} /></Link>
            <Link className="button button-ghost" href="/add-studio">List your space</Link>
          </div>
          <div className="hero-proof"><BadgeCheck size={18} /> Verified spaces · Transparent pricing · Flexible hours</div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-card"><Camera size={28} /><span>CREATE<br /><strong>WITHOUT<br />LIMITS</strong></span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">Handpicked for you</span><h2>Featured studios</h2></div><Link className="text-link" href="/studios">View all <ArrowRight size={16} /></Link></div>
        <div className="studio-grid">{studios.map((studio) => <StudioCard key={studio._id} studio={studio} />)}</div>
      </section>

      <section className="section categories">
        <div className="section-heading"><div><span className="eyebrow">Find your atmosphere</span><h2>Browse by category</h2></div></div>
        <div className="category-grid">
          {[["Photography", Camera], ["Sound stages", Headphones], ["Podcast rooms", Headphones], ["Art workshops", Sparkles]].map(([label, Icon]) => <Link className="category-card" href={`/studios?category=${encodeURIComponent(String(label))}`} key={String(label)}><span><Icon size={22} /></span><strong>{String(label)}</strong><ArrowRight size={16} /></Link>)}
        </div>
      </section>

      <section className="section support-strip">
        <div><ShieldCheck size={34} /><div><h3>Built for creators, backed by care.</h3><p>Verified hosts, clear policies, and support whenever your production needs it.</p></div></div>
        <Link className="button button-dark" href="/studios">Find your space <ArrowRight size={17} /></Link>
      </section>
    </main>
  );
}
