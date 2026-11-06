import { handleVentureInquiry } from "@/lib/ventureInquiry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleVentureInquiry(request, {
    apiKey: process.env.RESEND_API_KEY,
    recipient: process.env.CONTACT_TO_EMAIL,
    sender: process.env.CONTACT_FROM_EMAIL
  });
}

export async function OPTIONS(request: Request) {
  return handleVentureInquiry(request, {});
}
