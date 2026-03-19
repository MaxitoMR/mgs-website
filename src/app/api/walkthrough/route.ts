import { NextResponse } from "next/server";
import { walkthroughSchema } from "@/types/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = walkthroughSchema.parse(body);

    const formspreeRes = await fetch(
      process.env.FORMSPREE_WALKTHROUGH || "https://formspree.io/f/xvgqglzd",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!formspreeRes.ok) {
      return NextResponse.json({ error: "Failed to submit walkthrough" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
}
