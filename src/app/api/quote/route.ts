import { NextResponse } from "next/server";
import { quoteSchema } from "@/types/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    // Send to Formspree
    const formspreeRes = await fetch(
      process.env.FORMSPREE_QUOTE || "https://formspree.io/f/xwpqpyvy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          facilityType:
            data.facilityType === "other"
              ? data.customFacilityType
              : data.facilityType,
          squareFootage: data.squareFootage,
          services: data.services.join(", "),
          notes: data.notes,
        }),
      }
    );

    // Trigger Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    }

    if (!formspreeRes.ok) {
      return NextResponse.json(
        { error: "Failed to submit quote" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }
}
