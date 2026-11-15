"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cancelBooking, getBookings } from "@/lib/api";
import type { Booking } from "@/lib/types";
import { ProtectedRoute } from "@/components/protected-route";
export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const load = () => getBookings().then(setBookings).catch((error) => toast.error(error.message));
  useEffect(() => { load(); }, []);
  const cancel = async (id: string) => { try { await cancelBooking(id); toast.success("Booking cancelled."); load(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not cancel booking."); } };
  return <ProtectedRoute><main><section className="listing-hero"><span className="eyebrow">Your calendar</span><h1>My bookings.</h1></section><div className="table-list">{bookings.length ? bookings.map((booking) => <div className="list-row" key={booking._id}><div><h3>{booking.studioTitle}</h3><span className="muted">{booking.date} · {booking.startTime}–{booking.endTime} · {booking.guests} guests</span></div><span className="status">{booking.status}</span>{booking.status === "Pending" && <button className="button button-danger button-small" onClick={() => void cancel(booking._id)}>Cancel</button>}</div>) : <div className="empty">No bookings yet. Your next production starts in <a className="text-link" href="/studios">Explore studios</a>.</div>}</div></main></ProtectedRoute>;
}
