"use client";

import type { Studio } from "@/lib/types";

type BookingForm = {
  date: string;
  startTime: string;
  endTime: string;
  guests: string;
};

export function BookingModal({
  studio,
  form,
  setForm,
  onSubmit,
  onClose,
}: {
  studio: Studio;
  form: BookingForm;
  setForm: (form: BookingForm) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Close booking dialog">×</button>
        <span className="eyebrow">Reserve this space</span>
        <h2 id="booking-title">Book {studio.title}</h2>
        <p className="muted">Send a booking request for this workspace. The host will confirm the slot.</p>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="booking-date">Date</label>
            <input id="booking-date" type="date" required value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="booking-start">From</label>
              <input id="booking-start" type="time" required value={form.startTime} onChange={(event) => setForm({ ...form, startTime: event.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="booking-end">To</label>
              <input id="booking-end" type="time" required value={form.endTime} onChange={(event) => setForm({ ...form, endTime: event.target.value })} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="booking-guests">Guests</label>
            <input id="booking-guests" type="number" min="1" max={studio.maxCapacity} required value={form.guests} onChange={(event) => setForm({ ...form, guests: event.target.value })} />
          </div>
          <div className="modal-actions">
            <button type="button" className="button button-ghost" onClick={onClose}>Keep browsing</button>
            <button className="button button-primary">Send booking request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
