import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "max@mgssupplyandservices.com";
const FROM = process.env.RESEND_FROM || "MGS Website <noreply@mgssupplyandservices.com>";

export async function sendEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
    replyTo,
  });

  if (error) throw new Error(error.message);
}
