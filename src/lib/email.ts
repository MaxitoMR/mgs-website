import { Resend } from "resend";

const TO = "max@mgssupplyandservices.com";

export async function sendEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "MGS Website <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: TO,
    subject,
    html,
    replyTo,
  });

  if (error) throw new Error(error.message);
}
