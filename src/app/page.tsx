import Link from "next/link";
import { ArrowRight, Camera, Headphones, ShieldCheck, Sparkles, Music2 } from "lucide-react";
import { StudioCard } from "@/components/studio-card";
import { HeroSlider } from "@/components/hero-slider";
import { getStudios } from "@/lib/api";

export default async function Home() {
  const studios = await getStudios(6);
  return <main>
    <HeroSlider />
    <section className="section"><div className="section-heading"><div><span className="eyebrow">Handpicked for you</span><h2>Featured studios</h2></div><Link className="text-link" href="/studios">View all <ArrowRight size={16} /></Link></div><div className="studio-grid">{studios.map((studio) => <StudioCard key={studio._id} studio={studio} />)}</div>{!studios.length && <div className="empty">Studios are being added now. Check back soon or list your own space.</div>}</section>
    <section className="section categories"><div className="section-heading"><div><span className="eyebrow">Find your atmosphere</span><h2>Browse by category</h2></div></div><div className="category-grid">{[["Photography", Camera], ["Sound stages", Headphones], ["Podcast rooms", Headphones], ["Music suites", Music2], ["Art workshops", Sparkles]].map(([label, Icon]) => <Link className="category-card" href={`/studios?category=${encodeURIComponent(String(label))}`} key={String(label)}><span><Icon size={22} /></span><strong>{String(label)}</strong><ArrowRight size={16} /></Link>)}</div></section>
    <section className="section workflow" id="how-it-works"><div className="section-heading"><div><span className="eyebrow">From idea to final cut</span><h2>Booking made simple.</h2></div></div><div className="steps">{[["01", "Discover spaces", "Browse real studios with transparent rates and honest details."], ["02", "Choose your hours", "Pick the date and time that fits your production."], ["03", "Book with confidence", "Send a reservation request in a few clear steps."], ["04", "Create something great", "Arrive ready to make the work only you can make."]].map(([number, title, text]) => <div className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <section className="section support-strip"><div><ShieldCheck size={34} /><div><h3>Built for creators, backed by care.</h3><p>Verified spaces, clear policies, equipment safety, and support whenever your production needs it.</p></div></div><Link className="button button-dark" href="/studios">Find your space <ArrowRight size={17} /></Link></section>
  </main>;
}
