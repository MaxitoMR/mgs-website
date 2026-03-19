import { NextResponse } from "next/server";
import { applicationSchema } from "@/types/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const formspreeRes = await fetch(
      process.env.FORMSPREE_APPLICATION || "https://formspree.io/f/mkgbjlvj",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!formspreeRes.ok) {
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
}
