import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max = 3000) => typeof value === "string" ? value.trim().slice(0, max) : "";

async function send(subject: string, replyTo: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { ok: false, status: 503, error: "Data-room mail delivery is not configured." };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });

  if (!response.ok) {
    console.error("Data-room Resend error", response.status, await response.text());
    return { ok: false, status: 502, error: "The request could not be delivered. Please try again later." };
  }
  return { ok: true, status: 200 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.companyWebsite, 200)) return NextResponse.json({ message: "Thanks." });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const organization = clean(body.organization, 180);
    const venture = clean(body.venture, 180);
    const accreditation = clean(body.accreditation, 180);
    const consent = clean(body.consent, 20);

    if (!name || !emailPattern.test(email) || !organization || !venture || !accreditation || consent !== "yes") {
      return NextResponse.json({ error: "Please complete the required fields with a valid email address." }, { status: 400 });
    }

    const role = clean(body.role, 120) || "—";
    const checkSize = clean(body.checkSize, 100) || "—";
    const message = clean(body.message, 1800) || "No additional diligence request provided.";
    const text = [
      "New data-room access request",
      "",
      `Venture: ${venture}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Fund / firm: ${organization}`,
      `Role: ${role}`,
      `Investor status: ${accreditation}`,
      `Typical check / commitment size: ${checkSize}`,
      "",
      "Requested diligence:",
      message,
      "",
      "Access has NOT been granted automatically. Review this request before sharing confidential documents.",
    ].join("\n");

    const result = await send(`[Data Room] ${venture} — ${name}`, email, text);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
    return NextResponse.json({ message: `Request received. Access to the ${venture} data room is subject to review before confidential materials are shared.` });
  } catch (error) {
    console.error("Data-room route error", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
