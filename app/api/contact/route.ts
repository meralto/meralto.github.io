import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, message } = body;
    if (!name || !email || !organization) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Klaropoint Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Klaropoint consultation request from ${organization}`,
        text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\n\n${message || "No additional message."}`,
      }),
    });
    if (!response.ok) return NextResponse.json({ error: "Message could not be delivered." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
