// GET /api/newsletter-subscribers
//
// Admin-only. Returns the list of ACTIVE newsletter subscribers from the
// newsletter_subscribers table on the mgs-manager Supabase project (the same
// place /api/newsletter-signup writes to).
//
// Security:
//   - The Supabase service key never leaves the server.
//   - Access is gated by NEWSLETTER_ADMIN_KEY. The caller passes it as
//     `x-admin-key` (or `Authorization: Bearer <key>`). Mismatch -> 401.
//   - Fails CLOSED: if either env var is missing, the route 500s and returns
//     nothing rather than leaking emails.

import { NextResponse } from "next/server";

const MGS_MANAGER_SUPABASE_URL =
  process.env.MGS_MANAGER_SUPABASE_URL ?? "https://ejivobojvlxrngsdcjjk.supabase.co";

// Constant-time-ish comparison so we don't leak key length/contents via timing.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function GET(request: Request) {
  const adminKey = process.env.NEWSLETTER_ADMIN_KEY;
  const serviceKey = process.env.MGS_MANAGER_SUPABASE_SERVICE_KEY;

  if (!adminKey || !serviceKey) {
    return NextResponse.json(
      { error: "Subscriber admin is not configured." },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("x-admin-key") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    "";

  if (!safeEqual(provided, adminKey)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url =
    `${MGS_MANAGER_SUPABASE_URL}/rest/v1/newsletter_subscribers` +
    `?status=eq.active&select=email,name,source,segment&order=email.asc`;

  const res = await fetch(url, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Subscriber list fetch failed:", res.status, text);
    return NextResponse.json(
      { error: "Could not load subscribers." },
      { status: 502 },
    );
  }

  const subscribers = (await res.json()) as Array<{
    email: string;
    name: string | null;
    source: string | null;
    segment: string | null;
  }>;

  return NextResponse.json({ count: subscribers.length, subscribers });
}
