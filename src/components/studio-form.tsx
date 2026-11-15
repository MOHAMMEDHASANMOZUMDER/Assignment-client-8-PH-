"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { Studio } from "@/lib/types";
import { createStudio, updateStudio } from "@/lib/api";

const fields = [["title", "Title"], ["category", "Category"], ["hourlyRate", "Hourly rate"], ["securityDeposit", "Security deposit"], ["maxCapacity", "Max capacity"], ["location", "Location"]] as const;

export function StudioForm({ studio }: { studio?: Studio }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({ title: studio?.title || "", category: studio?.category || "Photography", hourlyRate: String(studio?.hourlyRate || ""), securityDeposit: String(studio?.securityDeposit || ""), maxCapacity: String(studio?.maxCapacity || ""), location: studio?.location || "", imageUrl: studio?.imageUrl || "", overview: studio?.overview || "", amenities: studio?.amenities?.join(", ") || "" });
  const change = (key: string, value: string) => setForm((old) => ({ ...old, [key]: value }));
  const uploadImage = async (file: File) => {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) { toast.error("Add NEXT_PUBLIC_IMGBB_API_KEY to enable image uploads."); return; }
    setUploading(true);
    try { const body = new FormData(); body.append("image", file); const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body }); const data = await response.json(); if (!response.ok || !data.success) throw new Error("Image upload failed."); change("imageUrl", data.data.url); toast.success("Image uploaded."); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Image upload failed."); }
    finally { setUploading(false); }
  };
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setBusy(true); try { const data = { ...form, hourlyRate: Number(form.hourlyRate), securityDeposit: Number(form.securityDeposit), maxCapacity: Number(form.maxCapacity), amenities: form.amenities.split(",").map((item) => item.trim()).filter(Boolean) }; if (studio) await updateStudio(studio._id, data); else await createStudio(data); toast.success(studio ? "Studio updated." : "Your studio is live."); router.push("/my-listings"); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not save studio."); } finally { setBusy(false); } };
  return <form className="form-card" onSubmit={submit}><div className="form-grid">{fields.map(([key, label]) => <div className="field" key={key}><label htmlFor={key}>{label}</label>{key === "category" ? <select id={key} value={form[key]} onChange={(e) => change(key, e.target.value)}><option>Photography</option><option>Film Stage</option><option>Podcast Lounge</option><option>Music Suite</option><option>Workshop</option></select> : <input id={key} required type={["hourlyRate", "securityDeposit", "maxCapacity"].includes(key) ? "number" : "text"} value={form[key]} onChange={(e) => change(key, e.target.value)} />}</div>)}<div className="field full"><label htmlFor="imageUrl">Image URL</label><input id="imageUrl" required value={form.imageUrl} onChange={(e) => change("imageUrl", e.target.value)} placeholder="Paste a hosted image URL" /><label className="upload-button" htmlFor="imageUpload">{uploading ? "Uploading image..." : "Or upload from your device"}<input id="imageUpload" type="file" accept="image/*" hidden disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file); }} /></label></div><div className="field full"><label htmlFor="amenities">Amenities (comma separated)</label><input id="amenities" value={form.amenities} onChange={(e) => change("amenities", e.target.value)} placeholder="Natural light, Wi-Fi, Backdrop" /></div><div className="field full"><label htmlFor="overview">Overview</label><textarea id="overview" required value={form.overview} onChange={(e) => change("overview", e.target.value)} /></div></div><button className="button button-primary" disabled={busy || uploading}>{busy ? "Saving..." : studio ? "Save changes" : "Publish studio"}</button></form>;
}
