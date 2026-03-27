import { NextResponse } from "next/server";
import { walkthroughSchema } from "@/types/forms";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = walkthroughSchema.parse(body);

    await sendEmail({
      subject: `Walkthrough Request — ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Walkthrough Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${data.company ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.company}</td></tr>` : ""}
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Facility Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.facilityType}</td></tr>
          ${data.address ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Address</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.address}</td></tr>` : ""}
          ${data.preferredDate ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Preferred Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.preferredDate}</td></tr>` : ""}
          ${data.preferredTime ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Preferred Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.preferredTime}</td></tr>` : ""}
          ${data.notes ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Notes</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.notes}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Sent from mgssupplyandservices.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Walkthrough submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit walkthrough" },
      { status: 400 }
    );
  }
}
