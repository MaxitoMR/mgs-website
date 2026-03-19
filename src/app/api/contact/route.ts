import { NextResponse } from "next/server";
import { contactSchema } from "@/types/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const formspreeRes = await fetch(
      process.env.FORMSPREE_QUOTE || "https://formspree.io/f/xwpqpyvy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Contact Form: ${data.name}`,
          ...data,
        }),
      }
    );

    if (!formspreeRes.ok) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
}
