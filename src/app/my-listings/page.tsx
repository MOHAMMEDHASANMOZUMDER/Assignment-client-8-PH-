"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteStudio, getListings } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { ProtectedRoute } from "@/components/protected-route";
export default function MyListingsPage() {
  const [listings, setListings] = useState<Studio[]>([]);
  const load = () => { getListings().then(setListings).catch((error) => toast.error(error.message)); };
  useEffect(load, []);
  const remove = async (id: string) => { if (!window.confirm("Delete this studio listing?")) return; try { await deleteStudio(id); toast.success("Listing deleted."); load(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete listing."); } };
  return <ProtectedRoute><main><section className="listing-hero"><span className="eyebrow">Your spaces</span><h1>My listings.</h1><Link className="button button-primary" href="/add-studio">+ Add a studio</Link></section><div className="table-list">{listings.length ? listings.map((studio) => <div className="list-row" key={studio._id}><div><h3>{studio.title}</h3><span className="muted">{studio.location} · ${studio.hourlyRate}/hr</span></div><Link className="button button-ghost button-small" href={`/studios/edit/${studio._id}`}>Edit</Link><button className="button button-danger button-small" onClick={() => void remove(studio._id)}>Delete</button></div>) : <div className="empty">You have not listed a studio yet.</div>}</div></main></ProtectedRoute>;
}
