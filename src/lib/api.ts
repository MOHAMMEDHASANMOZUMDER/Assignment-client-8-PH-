import type { Booking, Studio, User } from "./types";

const api = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(path, { ...options, credentials: "include", headers: { "Content-Type": "application/json", ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data as T;
};

export const getStudios = async (limit?: number) => {
  try { return await api<Studio[]>(`/api/studios${limit ? `?limit=${limit}` : ""}`); } catch { return []; }
};
export const getStudio = (id: string) => api<Studio>(`/api/studios/${id}`);
export const getMe = () => api<{ user: User }>("/api/auth/me");
export const login = (data: { email: string; password: string }) => api<{ user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
export const register = (data: Record<string, string>) => api<{ message: string }>("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
export const logout = () => api<{ message: string }>("/api/auth/logout", { method: "POST" });
export const createStudio = (data: object) => api<{ studioId: string }>("/api/studios", { method: "POST", body: JSON.stringify(data) });
export const updateStudio = (id: string, data: object) => api<{ message: string }>(`/api/studios/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteStudio = (id: string) => api<{ message: string }>(`/api/studios/${id}`, { method: "DELETE" });
export const getListings = () => api<Studio[]>("/api/my-listings");
export const createBooking = (data: object) => api<{ bookingId: string }>("/api/bookings", { method: "POST", body: JSON.stringify(data) });
export const getBookings = () => api<Booking[]>("/api/my-bookings");
export const cancelBooking = (id: string) => api<{ message: string }>(`/api/bookings/${id}/cancel`, { method: "PATCH" });
