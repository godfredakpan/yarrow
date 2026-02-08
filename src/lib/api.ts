/**
 * API client for Yarrow – talks to rvw/api womenhealth endpoints.
 * Set VITE_API_BASE_URL in .env (e.g. http://localhost:8000/api) or it defaults to /api for same-origin.
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? (typeof window !== "undefined" ? "/api" : "");

function getToken(): string | null {
  return localStorage.getItem("womenhealth_admin_token");
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = data as { message?: string; errors?: Record<string, string[]> };
    const message =
      err?.message ||
      err?.errors?.email?.[0] ||
      `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

// Auth
export type AdminUser = { id: number; name: string; email: string };

export async function login(email: string, password: string) {
  const body = await api<{ admin: AdminUser; token: string }>(
    "/womenhealth/admin/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
  return body;
}

export async function getMe() {
  return api<{ admin: AdminUser }>("/womenhealth/admin/me");
}

export async function logout() {
  await api("/womenhealth/admin/logout", { method: "POST" });
}

// Events (admin)
export type Event = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  location_type: string;
  max_attendees: number | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  bookings_count?: number;
};

export async function getEvents() {
  return api<Event[]>("/womenhealth/admin/events");
}

export async function getEvent(id: number) {
  return api<Event>(`/womenhealth/admin/events/${id}`);
}

export type CreateEventInput = {
  title: string;
  description?: string;
  category?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  location_type?: "online" | "in_person" | "hybrid";
  max_attendees?: number;
  image_url?: string;
  is_published?: boolean;
};

export async function createEvent(data: CreateEventInput) {
  return api<Event>("/womenhealth/admin/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEvent(id: number, data: Partial<CreateEventInput>) {
  return api<Event>(`/womenhealth/admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: number) {
  return api<{ message: string }>(`/womenhealth/admin/events/${id}`, {
    method: "DELETE",
  });
}

// Bookings (admin)
export type Booking = {
  id: number;
  event_id: number;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  event?: Event;
};

export async function getBookings(params?: { event_id?: number; status?: string }) {
  const search = new URLSearchParams();
  if (params?.event_id) search.set("event_id", String(params.event_id));
  if (params?.status) search.set("status", params.status);
  const q = search.toString();
  const raw = await api<Booking[] | { data: Booking[] }>(
    `/womenhealth/admin/bookings${q ? `?${q}` : ""}`
  );
  return Array.isArray(raw) ? raw : (raw?.data ?? []);
}

export async function getBooking(id: number) {
  return api<Booking>(`/womenhealth/admin/bookings/${id}`);
}

export async function updateBooking(
  id: number,
  data: { status?: string; name?: string; email?: string; phone?: string; notes?: string }
) {
  return api<Booking>(`/womenhealth/admin/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBooking(id: number) {
  return api<{ message: string }>(`/womenhealth/admin/bookings/${id}`, {
    method: "DELETE",
  });
}

// Public (for Events page)
export async function getPublicEvents(category?: string) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return api<Event[]>(`/womenhealth/events${q}`);
}

export async function getPublicEvent(id: number) {
  return api<Event & { bookings_count: number }>(`/womenhealth/events/${id}`);
}

export type CreateBookingInput = {
  event_id: number;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
};

export async function createBooking(data: CreateBookingInput) {
  return api<Booking>("/womenhealth/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// General contact / consultation request (not event-related)
export type ContactRequest = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  age_group: string | null;
  topic: string | null;
  message: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateContactInput = {
  name: string;
  email: string;
  phone?: string;
  age_group?: string;
  topic?: string;
  message?: string;
};

export async function createContactRequest(data: CreateContactInput) {
  return api<{ message: string; id: number }>("/womenhealth/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getContactRequests() {
  const raw = await api<ContactRequest[] | { data: ContactRequest[] }>(
    "/womenhealth/admin/contact-requests"
  );
  return Array.isArray(raw) ? raw : (raw?.data ?? []);
}
