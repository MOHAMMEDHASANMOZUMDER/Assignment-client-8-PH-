"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StudioCard } from "@/components/studio-card";
import { getStudios } from "@/lib/api";
import type { Studio } from "@/lib/types";
export default function StudiosBrowser() {
  const params = useSearchParams(); const [studios, setStudios] = useState<Studio[]>([]); const [search, setSearch] = useState(""); const [category, setCategory] = useState(params.get("category") || "");
  useEffect(() => { getStudios().then(setStudios); }, []);
  const shown = studios.filter((studio) => (!category || studio.category.toLowerCase().includes(category.toLowerCase())) && (!search || `${studio.title} ${studio.location}`.toLowerCase().includes(search.toLowerCase())));
  return <main><section className="listing-hero"><span className="eyebrow">Your next setting</span><h1>Explore studios.</h1><p className="muted">Spaces with character, ready when you are.</p></section><div className="filter-bar"><input placeholder="Search by name or location" value={search} onChange={(e) => setSearch(e.target.value)} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option><option>Photography</option><option>Film Stage</option><option>Podcast Lounge</option><option>Music Suite</option><option>Workshop</option></select></div><section className="section" style={{ paddingTop: 10 }}><div className="studio-grid">{shown.map((studio) => <StudioCard key={studio._id} studio={studio} />)}</div>{!shown.length && <div className="empty">No studios match that search yet.</div>}</section></main>;
}
