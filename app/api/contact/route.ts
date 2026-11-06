import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max = 3000) => typeof value === "string" ? value.trim().slice(0, max) : "";

async function sendWithResend(subject: string, replyTo: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return { ok: false, status: 503, error: "Inquiry delivery is temporarily unavailable. Your message has not been sent. Please keep a copy and try again later." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text })
  });

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return { ok: false, status: 502, error: "Mail delivery failed. Please try again later." };
  }
  return { ok: true, status: 200 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.companyWebsite, 200)) return NextResponse.json({ message: "Thanks." });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const interest = clean(body.interest, 200);
    const message = clean(body.message, 3000);
    const consent = clean(body.consent, 20);

    if (!name || !emailPattern.test(email) || !message || consent !== "yes") {
      return NextResponse.json({ error: "Please complete the required fields with a valid email address." }, { status: 400 });
    }

    const text = [
      "New website inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Area of interest: ${interest || "—"}`,
      "",
      message,
    ].join("\n");

    const subjectFocus = interest || "Website inquiry";
    const result = await sendWithResend(`[summithillholdings.com] ${subjectFocus} — ${name}`, email, text);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
    return NextResponse.json({ message: "Inquiry sent. Thank you." });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
