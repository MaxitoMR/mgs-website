// POST /api/newsletter-signup
//
// Inserts a row into newsletter_subscribers on the mgs-manager Supabase
// project (the only place subscriber data lives). Uses PostgREST upsert with
// on_conflict=email so we get clean re-subscribe behavior:
//   - new email          -> inserted active
//   - already active     -> no-op, still 200 so the form doesn't bounce
//   - previously unsubscribed -> reactivated (this IS explicit consent)
//
// Also: notifies max@mgssupplyandservices.com so we have a real-time signal
// for prospects, and sends a welcome email to the subscriber from the
// MGS Field Brief newsletter sender so it primes inbox deliverability.

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterSchema } from "@/types/forms";

const MGS_MANAGER_SUPABASE_URL =
  process.env.MGS_MANAGER_SUPABASE_URL ?? "https://ejivobojvlxrngsdcjjk.supabase.co";

const INTERNAL_NOTIFY_TO = "max@mgssupplyandservices.com";
const NEWSLETTER_FROM = "MGS Field Brief <news@news.mgssupplyandservices.com>";
const REPLY_TO = "support@mgssupplyandservices.com";

function welcomeHtml(name?: string) {
  const greeting = name ? `Hey ${escapeHtml(name)},` : "Hey,";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome to MGS Field Brief</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#1f2937;">
<center style="width:100%;background:#f4f4f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#ffffff;">
    <tr><td style="padding:32px 28px 8px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2.5px;color:#69AF23;text-transform:uppercase;">Welcome</div>
      <h1 style="margin:8px 0 16px;font-size:28px;font-weight:800;color:#111827;letter-spacing:-0.5px;">You're on the list.</h1>
      <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#374151;">${greeting} you'll get the MGS Field Brief in your inbox once a month. Short, useful, no fluff.</p>
      <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#374151;">Expect field notes from our drivers and techs, practical updates on supplies and pricing, and the occasional industry call-out. If it's not useful to a facility manager, it doesn't go in.</p>
      <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#374151;">If you ever want off, every issue has an unsubscribe link at the bottom. One click.</p>
    </td></tr>
    <tr><td style="padding:12px 28px 36px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr><td style="background:#69AF23;">
          <a href="https://www.mgssupplyandservices.com" style="display:inline-block;padding:14px 28px;color:#FFFFFF;font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;">Visit MGS</a>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="background:#111827;padding:20px 28px;">
      <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;color:#FFFFFF;text-transform:uppercase;opacity:0.85;">MGS Supply &amp; Services</div>
      <div style="margin-top:4px;font-family:Arial,sans-serif;font-size:10px;color:#69AF23;letter-spacing:1.5px;text-transform:uppercase;">Total Janitorial Management.</div>
    </td></tr>
  </table>
</center>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    const serviceKey = process.env.MGS_MANAGER_SUPABASE_SERVICE_KEY;
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Newsletter signup is misconfigured. Please try again later." },
        { status: 500 },
      );
    }

    // Upsert against newsletter_subscribers in the mgs-manager Supabase
    // project. on_conflict=email + resolution=merge-duplicates means a
    // re-signup from a previously-unsubscribed user re-activates them.
    const url = `${MGS_MANAGER_SUPABASE_URL}/rest/v1/newsletter_subscribers?on_conflict=email`;
    const supabaseRes = await fetch(url, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name ?? null,
        source: data.source ?? "website",
        segment: "prospects",
        status: "active",
        unsubscribed_at: null,
      }),
    });

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text().catch(() => "");
      console.error("Newsletter Supabase insert failed:", supabaseRes.status, errText);
      return NextResponse.json(
        { error: "Could not complete signup. Please try again." },
        { status: 502 },
      );
    }

    // Fire-and-forget side effects: welcome email + internal notify + Make
    // webhook. None of them should fail the signup if they error.
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);

      // 1. Welcome email to the subscriber
      resend.emails
        .send({
          from: NEWSLETTER_FROM,
          to: data.email,
          replyTo: REPLY_TO,
          subject: "Welcome to the MGS Field Brief",
          html: welcomeHtml(data.name),
        })
        .catch((err) => console.error("Welcome email failed:", err));

      // 2. Internal notification
      const sourceLine = data.source ? ` <em>(${escapeHtml(data.source)})</em>` : "";
      const nameLine = data.name ? `<br>Name: ${escapeHtml(data.name)}` : "";
      resend.emails
        .send({
          from: process.env.RESEND_FROM || "MGS Website <onboarding@resend.dev>",
          to: INTERNAL_NOTIFY_TO,
          subject: `Newsletter signup: ${data.email}`,
          html: `<p>New newsletter subscriber${sourceLine}.</p><p>Email: <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>${nameLine}</p>`,
        })
        .catch((err) => console.error("Internal newsletter notify failed:", err));
    }

    // 3. Make webhook (same pattern as existing forms)
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "newsletter_signup", ...data }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to sign up";
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
