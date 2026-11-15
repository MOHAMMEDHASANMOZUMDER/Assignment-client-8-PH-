export type User = { id: string; name: string; email: string; photoUrl?: string };
export type Studio = { _id: string; title: string; category: string; hourlyRate: number; securityDeposit: number; maxCapacity: number; location: string; imageUrl: string; amenities: string[]; overview: string; ownerName: string; ownerEmail: string; rating?: number };
export type Booking = { _id: string; studioTitle: string; date: string; startTime: string; endTime: string; guests: number; totalPrice: number; status: string };
