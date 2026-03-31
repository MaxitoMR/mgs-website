import { NextResponse } from "next/server";
import { applicationSchema } from "@/types/forms";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const row = (label: string, value?: string) =>
      value
        ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${value}</td></tr>`
        : "";

    await sendEmail({
      subject: `New Application — ${data.firstName} ${data.lastName}`,
      replyTo: data.email,
      html: `
        <h2>New Employee Application</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          ${row("First Name", data.firstName)}
          ${row("Last Name", data.lastName)}
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${row("Position", data.position)}
          ${row("Experience", data.experience)}
          ${row("Availability", data.availability)}
          ${row("Notes", data.notes)}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Sent from mgssupplyandservices.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Application form error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit application" },
      { status: 400 }
    );
  }
}
