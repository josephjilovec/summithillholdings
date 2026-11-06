const brands: Record<string, string> = {
  "my-healthy-aura": "My Healthy Aura", "swift-deal-solutions": "Swift Deal Solutions",
  "dj-hotwax": "DJ Hotwax", "vanta-helix": "Vanta Helix", "cannacore-seeds": "CannaCore Seeds",
  snarklogic: "Snark Logic", "alder-and-meridian": "Alder & Meridian", jentlemens: "Jentlemens",
  "toenail-fungus-survivor-foundation": "Toenail Fungus Survivor Foundation",
  "united-american-future": "United American Future", "world-forward-foundation": "World Forward Foundation",
  "payer-delta": "Payer Delta Arizona", "givewise-insights": "GiveWise Insights", "advibe-central": "AdVibe Central",
  "kinetic-aromatics": "Kinetic Aromatics", "atlas-assets": "Atlas Assets", "autocomp-corp": "AutoComp Corp",
  "crestline-metals": "Crestline Metals", ameliora: "Amelioras", "everstead-living": "Everstead Living",
  "qship-supply-co": "QShip Supply Co.", solvanti: "Solvanti", techwater: "TechWater", motoryn: "Motoryn",
  "experience-elsewhere": "Experience Elsewhere", kinora: "Kinora", "alias-alibi": "Alias & Alibi"
};

const aliases = ["myhealthyaura", "swiftdealsolutions", "djhotwax", "vantahelix", "cannacoreseeds", "snarklogic", "aldermeridian", "jentlemens", "tfsf", "unitedamericanfuture", "worldforwardfoundation", "payerdelta", "givewiseinsights", "advibecentral", "kineticaromatics", "atlasassets", "autocompcorp", "crestlinemetals", "amelioras", "eversteadliving", "qshipsupplyco", "solvanti", "techwater", "motoryn", "experienceelsewhere", "kinora", "aliasalibi"];
const publicOrigins = new Set([
  "https://summithillholdings.com", "https://www.summithillholdings.com",
  ...aliases.map((alias) => `https://${alias}.summithillholdings.com`),
  ...["myhealthyaura.com", "swiftdealsolutions.com", "cannacoreseeds.com", "advibecentral.com"].flatMap((host) => [`https://${host}`, `https://www.${host}`])
]);
const limit = 8192;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export function inquiryBrand(slug: string) { return brands[slug]; }
export function inquiryOriginAllowed(origin: string | null, requestUrl: string) {
  if (!origin || origin === "null") return false;
  return publicOrigins.has(origin) || origin === new URL(requestUrl).origin;
}

export type InquirySettings = { apiKey?: string; recipient?: string; sender?: string };
export type Delivery = (url: string, init: RequestInit) => Promise<Response>;

async function boundedBody(request: Request) {
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > limit)) throw new RangeError("body");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > limit) { await reader.cancel(); throw new RangeError("body"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function response(request: Request, data: { success: boolean; message: string }, status: number, origin?: string | null, slug?: string) {
  const headers = new Headers({ "Cache-Control": "no-store", Vary: "Origin", "X-Content-Type-Options": "nosniff" });
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  if (request.headers.get("accept")?.includes("text/html")) {
    if (data.success && slug) {
      headers.set("Location", `/contact?received=1&venture=${encodeURIComponent(slug)}`);
      return new Response(null, { status: 303, headers });
    }
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'");
    const safe = data.message.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
    return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inquiry | Summit Hill Holdings</title><body style="font:18px/1.6 system-ui;max-width:42rem;margin:12vh auto;padding:2rem"><h1>Your inquiry has not been sent.</h1><p>${safe}</p><p>Use your browser’s Back button to return to your form, or <a href="/contact">visit the contact page</a>.</p></body></html>`, { status, headers });
  }
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { status, headers });
}

export async function handleVentureInquiry(request: Request, settings: InquirySettings, deliver: Delivery = fetch) {
  const origin = request.headers.get("origin");
  const allowed = inquiryOriginAllowed(origin, request.url);
  if (request.method === "OPTIONS") {
    if (!allowed) return new Response(null, { status: 403, headers: { Vary: "Origin", "Cache-Control": "no-store" } });
    return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": origin!, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept", Vary: "Origin", "Cache-Control": "no-store" } });
  }
  if (!allowed) return response(request, { success: false, message: "Please use the inquiry form on an authorized brand website." }, 403);
  if (request.method !== "POST") return response(request, { success: false, message: "Use the inquiry form to send a message." }, 405, origin);
  const url = new URL(request.url);
  const slug = url.searchParams.get("venture") || "";
  const brand = inquiryBrand(slug);
  if (!brand) return response(request, { success: false, message: "Please choose a listed venture on the contact page." }, 400, origin);

  let entries: Array<[string, string]>;
  try {
    const raw = await boundedBody(request);
    const mime = request.headers.get("content-type") || "";
    if (mime.startsWith("application/json")) {
      const value: unknown = JSON.parse(raw);
      if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("fields");
      entries = Object.entries(value).map(([key, item]) => {
        if (typeof item !== "string") throw new Error("fields");
        return [key, item];
      });
    } else if (mime.startsWith("multipart/form-data") || mime.startsWith("application/x-www-form-urlencoded")) {
      const form = await new Request(request.url, { method: "POST", headers: { "content-type": mime }, body: raw }).formData();
      entries = [...form.entries()].map(([key, value]) => {
        if (typeof value !== "string") throw new Error("files");
        return [key, value];
      });
    } else return response(request, { success: false, message: "This form format is not supported." }, 415, origin);
    if (entries.length > 40) throw new Error("fields");
  } catch (error) {
    return response(request, { success: false, message: error instanceof RangeError ? "Please keep your inquiry under 8 KB and omit attachments." : "Please check the form fields. Attachments are not accepted." }, error instanceof RangeError ? 413 : 400, origin);
  }
  if (entries.some(([key, value]) => ["_honey", "companyWebsite", "website"].includes(key) && value.trim())) {
    return response(request, { success: false, message: "The inquiry could not be accepted. Please try again." }, 400, origin);
  }
  const field = (...keys: string[]) => entries.find(([key]) => keys.includes(key.toLowerCase()))?.[1] || "";
  const name = clean(field("name", "full name"), 120);
  const email = clean(field("email", "email address"), 254);
  const message = clean(field("message", "scope", "context"), 3000);
  if (!name || !emailPattern.test(email) || !message) return response(request, { success: false, message: "Please include your name, a valid email address, and a short message." }, 400, origin);
  if (!settings.apiKey || !settings.recipient || !settings.sender) return response(request, { success: false, message: "Inquiry delivery is temporarily unavailable. Your message has not been sent. Please keep a copy and try again later." }, 503, origin);

  const details = entries.filter(([key]) => !key.startsWith("_") && !["website", "companyWebsite", "consent"].includes(key)).map(([key, value]) => `${clean(key, 80)}: ${clean(value, 3000)}`).join("\n\n");
  try {
    const result = await deliver("https://api.resend.com/emails", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(12000),
      headers: { "content-type": "application/json", authorization: `Bearer ${settings.apiKey}` },
      body: JSON.stringify({ from: settings.sender, to: [settings.recipient], reply_to: email, subject: `[${brand}] Website inquiry`, text: `${brand} — public website inquiry\n\n${details}\n\nGeneral business inquiry only. Review before sharing private materials.` })
    });
    if (!result.ok) throw new Error("delivery");
  } catch {
    return response(request, { success: false, message: "Your inquiry could not be delivered. Please keep your draft and try again later." }, 502, origin);
  }
  return response(request, { success: true, message: "Your inquiry was sent for review." }, 200, origin, slug);
}
