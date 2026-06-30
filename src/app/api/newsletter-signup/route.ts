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

// Confirmation email sent right after signup. Designed to feel continuous
// with the actual newsletter — same logo, same masthead strip, same green/
// navy palette — so the first impression matches what they'll keep receiving.
function welcomeHtml(name?: string) {
  const greeting = name ? `Hey ${escapeHtml(name)} — ` : "Hey — ";
  const FONT = `'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
  const GREEN = "#69AF23";
  const INK = "#111111";
  const BODY = "#374151";
  const MUTED = "#6b7280";
  const RULE = "#e5e7eb";
  const PAPER = "#ffffff";
  const BG = "#f4f4f5";
  const LOGO = "https://ejivobojvlxrngsdcjjk.supabase.co/storage/v1/object/public/newsletter/mgs-news-logo.png";

  const promiseRow = (label: string, blurb: string) => `
    <tr><td style="padding:14px 0;border-top:1px solid ${RULE};">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top" style="vertical-align:top;width:150px;padding-right:14px;">
            <div style="font-family:${FONT};font-size:11px;font-weight:800;color:${INK};letter-spacing:1.5px;text-transform:uppercase;">${label}</div>
          </td>
          <td valign="top" style="vertical-align:top;font-family:${FONT};font-size:14px;color:${BODY};line-height:1.55;">${blurb}</td>
        </tr>
      </table>
    </td></tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Welcome to the MGS Field Brief</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
body { margin:0; padding:0; background:${BG}; -webkit-text-size-adjust:100%; }
table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
img { border:0; outline:none; text-decoration:none; }
a { color:${GREEN}; text-decoration:none; }
</style>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:${FONT};width:100%;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${BG};opacity:0;">You're on the list. One short field brief a month, no fluff.</div>

<center style="width:100%;background:${BG};">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${BG};">
  <tr><td align="center" style="padding:24px 12px;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:${PAPER};margin:0 auto;">

      <!-- Masthead: logo left, metadata stacked right -->
      <tr><td style="padding:24px 28px 18px;border-bottom:1px solid ${RULE};">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td valign="middle" style="vertical-align:middle;">
              <img src="${LOGO}" alt="MGS Field Brief — by MGS Supply &amp; Services" width="180" style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:180px;">
            </td>
            <td valign="middle" align="right" style="vertical-align:middle;font-family:${FONT};line-height:1.55;">
              <div style="font-size:11px;font-weight:700;color:${GREEN};letter-spacing:2px;text-transform:uppercase;">Subscription</div>
              <div style="font-size:11px;color:${MUTED};">Confirmed</div>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Hero band: dark navy with the confirmation headline -->
      <tr><td style="background:${INK};padding:52px 32px;">
        <div style="font-family:${FONT};font-size:11px;font-weight:800;color:${GREEN};letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;">— Welcome aboard</div>
        <h1 style="margin:0 0 18px;font-family:${FONT};font-size:42px;font-weight:800;color:#ffffff;line-height:1.05;letter-spacing:-1.2px;">You're on the list.</h1>
        <p style="margin:0;font-family:${FONT};font-size:15px;color:#d1d5db;line-height:1.65;max-width:460px;">${greeting}one short field brief lands in your inbox each month. Written for facility managers who run buildings — not marketers chasing inboxes.</p>
      </td></tr>

      <!-- What you'll get -->
      <tr><td style="padding:36px 32px 8px;">
        <div style="font-family:${FONT};font-size:11px;font-weight:800;color:${GREEN};letter-spacing:2.5px;text-transform:uppercase;margin-bottom:6px;">What you'll get</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
          ${promiseRow("Field Notes", "What our drivers and techs actually see on route, in their own words.")}
          ${promiseRow("Supply Pricing", "Real numbers on the supplies you buy — no inflated catalog markups.")}
          ${promiseRow("Industry Calls", "Honest take on what's shifting in commercial, medical, and industrial cleaning.")}
          ${promiseRow("Stat Drop", "One number worth knowing this month, with the context behind it.")}
        </table>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding:32px 32px 8px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr><td style="background:${GREEN};">
            <a href="https://www.mgssupplyandservices.com" style="display:inline-block;padding:16px 32px;color:#ffffff;font-family:${FONT};font-size:12px;font-weight:800;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">Visit MGS Supply &amp; Services</a>
          </td></tr>
        </table>
      </td></tr>

      <!-- Trust note -->
      <tr><td style="padding:24px 32px 36px;">
        <p style="margin:0;font-family:${FONT};font-size:12px;color:${MUTED};line-height:1.65;">Every issue has a one-click unsubscribe at the bottom. We won't bury it, and we won't sell or share your email.</p>
      </td></tr>

      <!-- Footer band -->
      <tr><td style="background:${INK};padding:22px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="font-family:${FONT};font-size:10px;font-weight:800;letter-spacing:2px;color:#ffffff;text-transform:uppercase;">MGS Supply &amp; Services</td>
            <td align="right" style="font-family:${FONT};font-size:10px;font-weight:700;color:${GREEN};letter-spacing:1.5px;text-transform:uppercase;">Field Brief</td>
          </tr>
        </table>
      </td></tr>

    </table>

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

    // --- Spam gates ---------------------------------------------------------
    // Both fail SILENTLY: we return success so a bot gets no useful signal,
    // but we skip the DB write and every side effect (welcome email, notify,
    // webhook). Real users never trip either of these.

    // 1. Honeypot: the hidden company_url field should always be empty.
    if (data.company_url && data.company_url.trim() !== "") {
      console.warn("Newsletter honeypot tripped — dropping signup silently.");
      return NextResponse.json({ success: true });
    }

    // 2. Minimum time-to-submit: no human fills this form in under ~2s.
    const MIN_SUBMIT_MS = 2000;
    if (typeof data.elapsed_ms === "number" && data.elapsed_ms < MIN_SUBMIT_MS) {
      console.warn(
        `Newsletter submitted in ${data.elapsed_ms}ms (< ${MIN_SUBMIT_MS}ms) — dropping signup silently.`,
      );
      return NextResponse.json({ success: true });
    }
    // ------------------------------------------------------------------------

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
