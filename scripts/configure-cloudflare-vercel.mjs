#!/usr/bin/env node
/**
 * Summit Hill Holdings — Cloudflare DNS, Email Routing & Vercel Domain Cutover Automation
 *
 * Automatically reads OAuth/API tokens from:
 * - Vercel CLI (`%APPDATA%\xdg.data\com.vercel.cli\auth.json`) or `VERCEL_TOKEN`
 * - Cloudflare Wrangler CLI (`%APPDATA%\xdg.config\.wrangler\config\default.toml`),
 *   `CLOUDFLARE_API_TOKEN`, or `CLOUDFLARE_EMAIL` + `CLOUDFLARE_API_KEY`
 *
 * Configures:
 * 1. Cloudflare DNS records for summithillholdings.com, www.summithillholdings.com,
 *    and all 27 venture subdomains (<venture>.summithillholdings.com).
 * 2. Cloudflare Email Routing rules for:
 *    - contact@summithillholdings.com
 *    - hello@summithillholdings.com
 *    - support@summithillholdings.com
 * 3. Vercel custom domain bindings across all 28 portfolio projects (Apex + WWW + 27 Venture Subdomains).
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ZONE_NAME = "summithillholdings.com";
const VERCEL_APEX_IP = "216.198.79.1";

const LOG_LINES = [];
function log(msg = "") {
  console.log(msg);
  LOG_LINES.push(`[${new Date().toISOString()}] ${msg}`);
}
function warn(msg = "") {
  console.warn(msg);
  LOG_LINES.push(`[${new Date().toISOString()}] [WARN] ${msg}`);
}

const VENTURE_DOMAIN_MAP = [
  { repo: "myhealthyaura", subdomain: "myhealthyaura", cname: "cname.vercel-dns.com" },
  { repo: "swiftdealsolutions", subdomain: "swiftdealsolutions", cname: "cname.vercel-dns.com" },
  { repo: "djhotwax", subdomain: "djhotwax", cname: "37a94b3bc410c465.vercel-dns-017.com" },
  { repo: "VANTAHELIX", subdomain: "vantahelix", cname: "393b0793ed5b7a8c.vercel-dns-017.com" },
  { repo: "cannacoreseeds", subdomain: "cannacoreseeds", cname: "cname.vercel-dns.com" },
  { repo: "snarklogic", subdomain: "snarklogic", cname: "3580b508a07908d3.vercel-dns-017.com" },
  { repo: "aldermeridian", subdomain: "aldermeridian", cname: "a674c7546f0b7095.vercel-dns-017.com" },
  { repo: "jentlemens", subdomain: "jentlemens", cname: "d6744a2d7a0481bf.vercel-dns-017.com" },
  { repo: "tfsf", subdomain: "tfsf", cname: "6c8b1a20fe375cfa.vercel-dns-017.com" },
  { repo: "UnitedAmericanFuture", subdomain: "unitedamericanfuture", cname: "bc15c9fb60fb54a0.vercel-dns-017.com" },
  { repo: "WorldForwardFoundation", subdomain: "worldforwardfoundation", cname: "13b2e9660166b3e0.vercel-dns-017.com" },
  { repo: "payer-delta-az", subdomain: "payerdelta", cname: "e7b72d534a413609.vercel-dns-017.com" },
  { repo: "givewiseinsights", subdomain: "givewiseinsights", cname: "247f628cbd18ae9c.vercel-dns-017.com" },
  { repo: "advibecentral", subdomain: "advibecentral", cname: "cname.vercel-dns.com" },
  { repo: "kineticaromatics", subdomain: "kineticaromatics", cname: "45f016f6865f51ca.vercel-dns-017.com" },
  { repo: "atlasassets", subdomain: "atlasassets", cname: "37a94b3bc410c465.vercel-dns-017.com" },
  { repo: "autocompcorp", subdomain: "autocompcorp", cname: "37a94b3bc410c465.vercel-dns-017.com" },
  { repo: "crestlinemetals", subdomain: "crestlinemetals", cname: "39c3b1260dc72904.vercel-dns-017.com" },
  { repo: "amelioras", subdomain: "amelioras", cname: "1aacf4990885f8b0.vercel-dns-017.com" },
  { repo: "eversteadliving", subdomain: "eversteadliving", cname: "32d5176801ce01b5.vercel-dns-017.com" },
  { repo: "qshipsupplyco", subdomain: "qshipsupplyco", cname: "7b0421a052712535.vercel-dns-017.com" },
  { repo: "solvanti", subdomain: "solvanti", cname: "c23bdb46018b0692.vercel-dns-017.com" },
  { repo: "techwater", subdomain: "techwater", cname: "18a9b25931cdfef3.vercel-dns-017.com" },
  { repo: "motoryn", subdomain: "motoryn", cname: "88691644697c3111.vercel-dns-017.com" },
  { repo: "experienceelsewhere", subdomain: "experienceelsewhere", cname: "844a1bb63633ae41.vercel-dns-017.com" },
  { repo: "kinora", subdomain: "kinora", cname: "15dbbea17ffdc795.vercel-dns-017.com" },
  { repo: "aliasalibi", subdomain: "aliasalibi", cname: "37a94b3bc410c465.vercel-dns-017.com" }
];

const CRED_PATHS = [
  "C:\\Users\\realj\\.summithill-credentials.json",
  "/mnt/c/Users/realj/.summithill-credentials.json",
  path.join(os.homedir(), ".summithill-credentials.json")
];

function readSavedCredentials() {
  for (const cp of CRED_PATHS) {
    try {
      if (fs.existsSync(cp)) {
        return JSON.parse(fs.readFileSync(cp, "utf8")) || {};
      }
    } catch {}
  }
  return {};
}

function saveCredentials(updates) {
  const current = { ...readSavedCredentials(), ...updates };
  for (const cp of CRED_PATHS) {
    try {
      fs.writeFileSync(cp, JSON.stringify(current, null, 2), "utf8");
    } catch {}
  }
}

function discoverVercelToken() {
  if (process.env.VERCEL_TOKEN && process.env.VERCEL_TOKEN.trim()) {
    const t = process.env.VERCEL_TOKEN.trim();
    saveCredentials({ vercelToken: t });
    return t;
  }
  const saved = readSavedCredentials();
  if (saved.vercelToken) return saved.vercelToken.trim();
  const candidates = [
    path.join(process.env.APPDATA || "", "xdg.data", "com.vercel.cli", "auth.json"),
    path.join(process.env.APPDATA || "", "com.vercel.cli", "Data", "auth.json"),
    "/mnt/c/Users/realj/AppData/Roaming/xdg.data/com.vercel.cli/auth.json",
    path.join(os.homedir(), ".local", "share", "com.vercel.cli", "auth.json")
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, "utf8"));
        if (data && data.token) return data.token.trim();
      }
    } catch {}
  }
  return "";
}

function discoverCloudflareToken() {
  if (process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_API_TOKEN.trim()) {
    const t = process.env.CLOUDFLARE_API_TOKEN.trim();
    saveCredentials({ cloudflareToken: t });
    return t;
  }
  const saved = readSavedCredentials();
  if (saved.cloudflareToken) return saved.cloudflareToken.trim();
  const candidates = [
    path.join(process.env.APPDATA || "", "xdg.config", ".wrangler", "config", "default.toml"),
    "/mnt/c/Users/realj/AppData/Roaming/xdg.config/.wrangler/config/default.toml",
    path.join(os.homedir(), ".wrangler", "config", "default.toml"),
    path.join(os.homedir(), ".config", ".wrangler", "config", "default.toml")
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const text = fs.readFileSync(p, "utf8");
        const m = text.match(/oauth_token\s*=\s*"([^"]+)"/);
        if (m && m[1]) return m[1].trim();
      }
    } catch {}
  }
  return "";
}

const cfToken = discoverCloudflareToken();
const cfEmail = (process.env.CLOUDFLARE_EMAIL || "").trim();
const cfGlobalKey = (process.env.CLOUDFLARE_API_KEY || "").trim();
const vercelToken = discoverVercelToken();

const defaultInbox = (process.env.CF_EMAIL_DESTINATION || "realjjemail@gmail.com").trim();
const EMAIL_ROUTES = [
  { address: `contact@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_CONTACT || defaultInbox, name: "Summit Hill Executive & Capital Contact" },
  { address: `hello@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_HELLO || defaultInbox, name: "Summit Hill General & Venture Hello" },
  { address: `support@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_SUPPORT || defaultInbox, name: "Summit Hill Portfolio & Client Support" }
];

function cfHeaders() {
  if (cfEmail && cfGlobalKey) {
    return { "X-Auth-Email": cfEmail, "X-Auth-Key": cfGlobalKey, "Content-Type": "application/json" };
  }
  if (cfToken) {
    return { Authorization: `Bearer ${cfToken}`, "Content-Type": "application/json" };
  }
  return null;
}

async function cfRequest(method, apiPath, body) {
  const headers = cfHeaders();
  if (!headers) throw new Error("No Cloudflare credentials found.");
  const res = await fetch(`https://api.cloudflare.com/client/v4${apiPath}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(`Cloudflare API ${method} ${apiPath} failed: ${JSON.stringify(json.errors)}`);
  }
  return json.result;
}

async function configureCloudflare() {
  if (!cfHeaders()) {
    log("[SKIP] Cloudflare credentials not provided or discovered.");
    return;
  }
  log(`\n=== 1. Configuring Cloudflare Zone: ${ZONE_NAME} ===`);
  const zones = await cfRequest("GET", `/zones?name=${ZONE_NAME}`);
  if (!zones || zones.length === 0) {
    throw new Error(`Zone ${ZONE_NAME} not found in Cloudflare account.`);
  }
  const zoneId = zones[0].id;
  log(`[+] Found Zone ID for ${ZONE_NAME}: ${zoneId}`);

  const existingRecords = await cfRequest("GET", `/zones/${zoneId}/dns_records?per_page=500`);

  async function upsertDnsRecord(type, name, content, proxied = false) {
    const fqdn = name === "@" ? ZONE_NAME : `${name}.${ZONE_NAME}`;
    const existing = existingRecords.find((r) => r.name === fqdn && (r.type === type || r.type === "A" || r.type === "CNAME"));
    const payload = { type, name: fqdn, content, proxied, ttl: 1 };
    if (existing) {
      await cfRequest("PUT", `/zones/${zoneId}/dns_records/${existing.id}`, payload);
      log(`  [UPDATED DNS] ${fqdn.padEnd(45)} -> ${type.padEnd(6)} ${content}`);
    } else {
      await cfRequest("POST", `/zones/${zoneId}/dns_records`, payload);
      log(`  [CREATED DNS] ${fqdn.padEnd(45)} -> ${type.padEnd(6)} ${content}`);
    }
  }

  await upsertDnsRecord("A", "@", VERCEL_APEX_IP, false);
  await upsertDnsRecord("CNAME", "www", "cname.vercel-dns.com", false);

  for (const v of VENTURE_DOMAIN_MAP) {
    await upsertDnsRecord("CNAME", v.subdomain, v.cname, false);
  }

  // Ensure SPF TXT record authorizes both Cloudflare Email Routing AND Google Gmail outbound SMTP (_spf.google.com)
  const spfContent = "v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all";
  const existingSpf = existingRecords.find(
    (r) => r.name === ZONE_NAME && r.type === "TXT" && typeof r.content === "string" && r.content.startsWith("v=spf1")
  );
  if (existingSpf) {
    await cfRequest("PUT", `/zones/${zoneId}/dns_records/${existingSpf.id}`, {
      type: "TXT",
      name: ZONE_NAME,
      content: spfContent,
      ttl: 1
    });
    log(`  [UPDATED SPF] ${ZONE_NAME.padEnd(45)} -> TXT    ${spfContent}`);
  } else {
    await cfRequest("POST", `/zones/${zoneId}/dns_records`, {
      type: "TXT",
      name: ZONE_NAME,
      content: spfContent,
      ttl: 1
    });
    log(`  [CREATED SPF] ${ZONE_NAME.padEnd(45)} -> TXT    ${spfContent}`);
  }

  log(`\n=== 2. Configuring Cloudflare Email Routing on ${ZONE_NAME} ===`);
  try {
    const existingRules = await cfRequest("GET", `/zones/${zoneId}/email/routing/rules?per_page=100`);
    for (const route of EMAIL_ROUTES) {
      const rulePayload = {
        name: route.name,
        enabled: true,
        matchers: [{ type: "literal", field: "to", value: route.address }],
        actions: [{ type: "forward", value: [route.destination] }]
      };
      const match = existingRules.find((r) =>
        (r.matchers || []).some((m) => m.field === "to" && m.value === route.address)
      );
      if (match) {
        await cfRequest("PUT", `/zones/${zoneId}/email/routing/rules/${match.tag || match.id}`, rulePayload);
        log(`  [UPDATED EMAIL] ${route.address.padEnd(36)} -> ${route.destination}`);
      } else {
        await cfRequest("POST", `/zones/${zoneId}/email/routing/rules`, rulePayload);
        log(`  [CREATED EMAIL] ${route.address.padEnd(36)} -> ${route.destination}`);
      }
    }
  } catch (err) {
    warn(`  [!] Email routing note: ${err.message}`);
  }
}

async function vercelRequest(method, apiPath, body) {
  const res = await fetch(`https://api.vercel.com${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json();
  return { status: res.status, data: json };
}

async function configureVercel() {
  if (!vercelToken) {
    log("\n[SKIP] Vercel credentials not provided or discovered.");
    return;
  }
  log(`\n=== 3. Configuring Vercel Custom Domains & Subdomains ===`);

  const allProjects = [];
  const seenIds = new Set();

  // 1. Personal/default scope projects
  const personalRes = await vercelRequest("GET", "/v9/projects?limit=100");
  if (personalRes.status === 401 || personalRes.status === 403) {
    throw new Error(`Vercel authentication failed (HTTP ${personalRes.status}): ${JSON.stringify(personalRes.data)}`);
  }
  for (const p of personalRes.data.projects || []) {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      allProjects.push({ ...p, _teamId: null });
    }
  }

  // 2. Team-scoped projects
  const teamsRes = await vercelRequest("GET", "/v2/teams?limit=100");
  for (const team of teamsRes.data.teams || []) {
    const teamProjRes = await vercelRequest("GET", `/v9/projects?limit=100&teamId=${encodeURIComponent(team.id)}`);
    for (const p of teamProjRes.data.projects || []) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        allProjects.push({ ...p, _teamId: team.id });
      }
    }
  }

  log(`[+] Found ${allProjects.length} total Vercel projects across account/teams.`);

  function findProject(repoName) {
    const lower = repoName.toLowerCase();
    return allProjects.find(
      (p) =>
        p.name.toLowerCase() === lower ||
        (p.link && p.link.repo && p.link.repo.toLowerCase() === lower)
    );
  }

  async function addDomainToProject(proj, domainPayload) {
    const qs = proj._teamId ? `?teamId=${encodeURIComponent(proj._teamId)}` : "";
    return vercelRequest("POST", `/v10/projects/${proj.id}/domains${qs}`, domainPayload);
  }

  const holdingProj = findProject("summithillholdings") || findProject("josephjilovec");
  if (holdingProj) {
    const res1 = await addDomainToProject(holdingProj, { name: ZONE_NAME });
    log(`  [HOLDING APEX] ${ZONE_NAME} -> project '${holdingProj.name}' (HTTP ${res1.status})`);

    const res2 = await addDomainToProject(holdingProj, {
      name: `www.${ZONE_NAME}`,
      redirect: ZONE_NAME,
      redirectStatusCode: 308
    });
    log(`  [HOLDING WWW]  www.${ZONE_NAME} -> project '${holdingProj.name}' (HTTP ${res2.status})`);
  } else {
    warn("  [!] Could not locate holding company Vercel project ('summithillholdings' or 'josephjilovec').");
  }

  for (const v of VENTURE_DOMAIN_MAP) {
    const fqdn = `${v.subdomain}.${ZONE_NAME}`;
    const proj = findProject(v.repo) || findProject(v.subdomain);
    if (!proj) {
      warn(`  [!] No matching Vercel project found for repo '${v.repo}' (${fqdn})`);
      continue;
    }
    const res = await addDomainToProject(proj, { name: fqdn });
    log(`  [VENTURE DOMAIN] ${fqdn.padEnd(44)} -> project '${proj.name.padEnd(24)}' (HTTP ${res.status})`);
  }
}

function flushLog() {
  const logPaths = [
    path.join(process.cwd(), "summithill-cutover-log.txt"),
    "C:\\Users\\realj\\Desktop\\summithill-cutover-log.txt",
    "C:\\Users\\realj\\OneDrive\\Desktop\\summithill-cutover-log.txt"
  ];
  for (const lp of logPaths) {
    try {
      fs.writeFileSync(lp, LOG_LINES.join("\n") + "\n", "utf8");
    } catch {}
  }
}

async function main() {
  log("=== Summit Hill Holdings Cutover Automation Started ===");
  try {
    await configureCloudflare();
  } catch (err) {
    warn(`Cloudflare step error: ${err.message || err}`);
  }
  try {
    await configureVercel();
  } catch (err) {
    warn(`Vercel step error: ${err.message || err}`);
  }
  log("\n[+] Cutover script execution complete.");
  flushLog();
}

main().catch((err) => {
  warn(`[FATAL] ${err.message || err}`);
  flushLog();
  process.exit(1);
});
