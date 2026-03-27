/**
 * Centralized API functions used by React Query mutations.
 * All form submissions go through here.
 */

async function post<T>(url: string, data: T): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || `Request failed (${res.status})`);
  }

  return { ok: true };
}

export const api = {
  submitContact: (data: unknown) => post("/api/contact", data),
  submitQuote: (data: unknown) => post("/api/quote", data),
  submitApplication: (data: unknown) => post("/api/application", data),
  submitWalkthrough: (data: unknown) => post("/api/walkthrough", data),
};
