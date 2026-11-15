"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteStudio, getListings } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { ProtectedRoute } from "@/components/protected-route";
import { ConfirmModal } from "@/components/confirm-modal";

export default function MyListingsPage() {
  const [listings, setListings] = useState<Studio[]>([]);
  const [pendingDelete, setPendingDelete] = useState<Studio | null>(null);
  const load = () => { getListings().then(setListings).catch((error) => toast.error(error.message)); };
  useEffect(() => { load(); }, []);
  const remove = async () => {
    if (!pendingDelete) return;
    try { await deleteStudio(pendingDelete._id); toast.success("Listing deleted."); setPendingDelete(null); load(); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete listing."); }
  };
  return <ProtectedRoute><main><section className="listing-hero"><span className="eyebrow">Your spaces</span><h1>My listings.</h1><Link className="button button-primary" href="/add-studio">+ Add a studio</Link></section><div className="table-list">{listings.length ? listings.map((studio) => <div className="list-row" key={studio._id}><div><h3>{studio.title}</h3><span className="muted">{studio.location} · ${studio.hourlyRate}/hr</span></div><Link className="button button-ghost button-small" href={`/studios/edit/${studio._id}`}>Edit</Link><button className="button button-danger button-small" onClick={() => setPendingDelete(studio)}>Delete</button></div>) : <div className="empty">You have not listed a studio yet. <Link className="text-link" href="/add-studio">List your first space</Link></div>}</div>{pendingDelete && <ConfirmModal title="Delete this listing?" message={`“${pendingDelete.title}” will no longer be visible to creators.`} onCancel={() => setPendingDelete(null)} onConfirm={() => void remove()} />}</main></ProtectedRoute>;
}
