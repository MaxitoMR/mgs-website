import { NextResponse } from "next/server";
import { quoteSchema } from "@/types/forms";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    const facilityType =
      data.facilityType === "other" ? data.customFacilityType : data.facilityType;

    await sendEmail({
      subject: `New Quote Request — ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${data.company ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.company}</td></tr>` : ""}
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Facility Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${facilityType}</td></tr>
          ${data.squareFootage ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Square Footage</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.squareFootage}</td></tr>` : ""}
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Services</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.services.join(", ")}</td></tr>
          ${data.notes ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Notes</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.notes}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Sent from mgssupplyandservices.com</p>
      `,
    });

    // Trigger Make.com webhook if configured
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit quote" },
      { status: 400 }
    );
  }
}
