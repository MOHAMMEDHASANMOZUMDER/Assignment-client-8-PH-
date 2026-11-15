"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createBooking, getStudio } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { useAuth } from "@/components/auth-provider";
export default function StudioDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    guests: "1",
  });
  useEffect(() => {
    getStudio(id)
      .then(setStudio)
      .catch(() => setStudio(null));
  }, [id]);
  if (!studio)
    return (
      <div className="empty" style={{ margin: 100 }}>
        Loading this creative space...
      </div>
    );
  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return router.push("/login");
    try {
      await createBooking({
        studioId: id,
        ...form,
        guests: Number(form.guests),
      });
      toast.success("Booking request submitted.");
      setForm({ date: "", startTime: "", endTime: "", guests: "1" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not book this space.",
      );
    }
  };
  return (
    <main className="details">
      <div
        className={`detail-image ${studio.imageUrl ? "" : "no-image"}`}
        style={
          studio.imageUrl
            ? { backgroundImage: `url(${studio.imageUrl})` }
            : undefined
        }
      />
      <div className="gallery-caption"><span className="pill">Studio gallery</span><span>{studio.imageUrl ? "Featured image" : "Image coming soon"}</span></div>
      <div className="detail-content">
        <div>
          <span className="pill">{studio.category}</span>
          <h1>{studio.title}</h1>
          <p className="muted" style={{ lineHeight: 1.8, margin: "20px 0" }}>
            {studio.overview}
          </p>
          <p className="meta">
            Hosted by {studio.ownerName} · {studio.location}
          </p>
          <div className="detail-specs"><span><strong>Capacity</strong>{studio.maxCapacity} people</span><span><strong>Deposit</strong>${studio.securityDeposit}</span><span><strong>Rating</strong>★ {studio.rating || "New"}</span></div>
          <div className="tag-row">
            {studio.amenities.map((amenity) => (
              <span className="pill" key={amenity}>
                {amenity}
              </span>
            ))}
          </div>
          <section className="reviews"><h2>Reviews</h2><p className="empty">This space is ready for its first review.</p></section>
        </div>
        <aside className="detail-side">
          <strong>
            ${studio.hourlyRate}
            <small>/hour</small>
          </strong>
          <form onSubmit={book}>
            <div className="field">
              <label>Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="form-grid">
              <div className="field">
                <label>From</label>
                <input
                  type="time"
                  required
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>To</label>
                <input
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Guests</label>
              <input
                type="number"
                min="1"
                max={studio.maxCapacity}
                required
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
              />
            </div>
            <button className="button button-primary" style={{ width: "100%" }}>
              Book workspace
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}
