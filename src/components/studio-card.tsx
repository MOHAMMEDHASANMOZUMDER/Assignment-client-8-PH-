import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Studio } from "@/lib/types";
export function StudioCard({ studio }: { studio: Studio }) {
  return <article className="studio-card"><div className={`studio-image ${studio.imageUrl ? "" : "no-image"}`} style={studio.imageUrl ? { backgroundImage: `url(${studio.imageUrl})` } : undefined}><span className="pill">{studio.category}</span><span className="pill"><Star size={11} fill="currentColor" /> {studio.rating || "New"}</span></div><div className="studio-body"><span className="meta"><span><MapPin size={13} /> {studio.location}</span><span className="price">${studio.hourlyRate}/hr</span></span><h3>{studio.title}</h3><Link className="text-link" href={`/studios/${studio._id}`}>View details <span>→</span></Link></div></article>;
}
