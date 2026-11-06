import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max = 3000) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.companyWebsite, 200)) return NextResponse.json({ message: "Thanks." });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const interest = clean(body.interest, 160);
    const venture = clean(body.venture, 180) || "General / studio";
    const focus = clean(body.focus, 240);
    const message = clean(body.message, 1800);
    const organization = clean(body.organization, 160) || "—";
    const role = clean(body.role, 120) || "—";
    const accreditation = clean(body.accreditation, 160) || "Not applicable";
    const consent = clean(body.consent, 20);

    if (!name || !emailPattern.test(email) || !interest || !venture || !focus || !message || consent !== "yes") {
      return NextResponse.json({ error: "Please complete the required fields with a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      return NextResponse.json({ error: "Inquiry delivery is temporarily unavailable. Your message has not been sent. Please keep a copy and try again later." }, { status: 503 });
    }

    const text = [
      "Private venture brief request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization}`,
      `Role: ${role}`,
      `Audience: ${interest}`,
      `Venture: ${venture}`,
      `Investor status: ${accreditation}`,
      `Evaluation focus: ${focus}`,
      "",
      "Additional context:",
      message,
      "",
      "Private data-room access is not granted automatically. Review this request before sharing confidential materials.",
      "Submission does not create confidentiality or an investment/advisory/partnership relationship."
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[summithillholdings.com] Venture brief request — ${venture}`,
        text
      })
    });

    if (!response.ok) {
      console.error("Resend error", response.status, await response.text());
      return NextResponse.json({ error: "Mail delivery failed. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ message: "Request received. Private materials remain subject to studio review." });
  } catch (error) {
    console.error("Brief route error", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
