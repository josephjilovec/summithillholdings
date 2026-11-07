#!/usr/bin/env node
/**
 * Summit Hill Holdings — Cloudflare DNS, Email Routing & Vercel Domain Cutover Automation
 *
 * Configures:
 * 1. Cloudflare DNS records for summithillholdings.com, www.summithillholdings.com,
 *    and all 27 venture subdomains (<venture>.summithillholdings.com).
 * 2. Cloudflare Email Routing rules for:
 *    - contact@summithillholdings.com
 *    - hello@summithillholdings.com
 *    - support@summithillholdings.com
 *    (Can funnel all 3 into one unified inbox or separate AI-managed inboxes.)
 * 3. Vercel custom domain bindings across the holding company project and all 27 venture projects.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN="..." VERCEL_TOKEN="..." CF_EMAIL_DESTINATION="realjjemail@gmail.com" node scripts/configure-cloudflare-vercel.mjs
 */

const ZONE_NAME = "summithillholdings.com";
const VERCEL_APEX_IP = "216.198.79.1";

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

const cfToken = process.env.CLOUDFLARE_API_TOKEN || "";
const cfEmail = process.env.CLOUDFLARE_EMAIL || "";
const cfGlobalKey = process.env.CLOUDFLARE_API_KEY || "";
const vercelToken = process.env.VERCEL_TOKEN || "";

const defaultInbox = process.env.CF_EMAIL_DESTINATION || "realjjemail@gmail.com";
const EMAIL_ROUTES = [
  { address: `contact@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_CONTACT || defaultInbox, name: "Summit Hill Executive & Capital Contact" },
  { address: `hello@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_HELLO || defaultInbox, name: "Summit Hill General & Venture Hello" },
  { address: `support@${ZONE_NAME}`, destination: process.env.CF_EMAIL_DEST_SUPPORT || defaultInbox, name: "Summit Hill Portfolio & Client Support" }
];

function cfHeaders() {
  if (cfToken) {
    return { Authorization: `Bearer ${cfToken}`, "Content-Type": "application/json" };
  }
  if (cfEmail && cfGlobalKey) {
    return { "X-Auth-Email": cfEmail, "X-Auth-Key": cfGlobalKey, "Content-Type": "application/json" };
  }
  return null;
}

async function cfRequest(method, path, body) {
  const headers = cfHeaders();
  if (!headers) throw new Error("No Cloudflare credentials provided.");
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(`Cloudflare API ${method} ${path} failed: ${JSON.stringify(json.errors)}`);
  }
  return json.result;
}

async function configureCloudflare() {
  if (!cfHeaders()) {
    console.log("[SKIP] Cloudflare credentials not set in environment (CLOUDFLARE_API_TOKEN).");
    return;
  }
  console.log(`\n=== 1. Configuring Cloudflare Zone: ${ZONE_NAME} ===`);
  const zones = await cfRequest("GET", `/zones?name=${ZONE_NAME}`);
  if (!zones || zones.length === 0) {
    throw new Error(`Zone ${ZONE_NAME} not found in Cloudflare account.`);
  }
  const zoneId = zones[0].id;
  console.log(`[+] Found Zone ID for ${ZONE_NAME}: ${zoneId}`);

  // Fetch existing DNS records
  const existingRecords = await cfRequest("GET", `/zones/${zoneId}/dns_records?per_page=500`);

  async function upsertDnsRecord(type, name, content, proxied = false) {
    const fqdn = name === "@" ? ZONE_NAME : `${name}.${ZONE_NAME}`;
    const existing = existingRecords.find((r) => r.name === fqdn && (r.type === type || r.type === "A" || r.type === "CNAME"));
    const payload = { type, name: fqdn, content, proxied, ttl: 1 };
    if (existing) {
      await cfRequest("PUT", `/zones/${zoneId}/dns_records/${existing.id}`, payload);
      console.log(`  [UPDATED DNS] ${fqdn.padEnd(45)} -> ${type.padEnd(6)} ${content}`);
    } else {
      await cfRequest("POST", `/zones/${zoneId}/dns_records`, payload);
      console.log(`  [CREATED DNS] ${fqdn.padEnd(45)} -> ${type.padEnd(6)} ${content}`);
    }
  }

  // 1a. Apex and www
  await upsertDnsRecord("A", "@", VERCEL_APEX_IP, false);
  await upsertDnsRecord("CNAME", "www", "cname.vercel-dns.com", false);

  // 1b. All 27 venture subdomains
  for (const v of VENTURE_DOMAIN_MAP) {
    await upsertDnsRecord("CNAME", v.subdomain, v.cname, false);
  }

  // 2. Email Routing rules
  console.log(`\n=== 2. Configuring Cloudflare Email Routing on ${ZONE_NAME} ===`);
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
      console.log(`  [UPDATED EMAIL] ${route.address.padEnd(36)} -> ${route.destination}`);
    } else {
      await cfRequest("POST", `/zones/${zoneId}/email/routing/rules`, rulePayload);
      console.log(`  [CREATED EMAIL] ${route.address.padEnd(36)} -> ${route.destination}`);
    }
  }
}

async function vercelRequest(method, path, body) {
  const res = await fetch(`https://api.vercel.com${path}`, {
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
    console.log("\n[SKIP] VERCEL_TOKEN not set in environment.");
    return;
  }
  console.log(`\n=== 3. Configuring Vercel Custom Domains & Subdomains ===`);
  const { data } = await vercelRequest("GET", "/v9/projects?limit=100");
  const projects = data.projects || [];
  console.log(`[+] Found ${projects.length} Vercel projects.`);

  function findProject(repoName) {
    const lower = repoName.toLowerCase();
    return projects.find(
      (p) =>
        p.name.toLowerCase() === lower ||
        (p.link && p.link.repo && p.link.repo.toLowerCase() === lower)
    );
  }

  // Attach summithillholdings.com and www.summithillholdings.com to the holding company project
  const holdingProj = findProject("summithillholdings") || findProject("josephjilovec");
  if (holdingProj) {
    const res1 = await vercelRequest("POST", `/v10/projects/${holdingProj.id}/domains`, {
      name: ZONE_NAME
    });
    console.log(`  [HOLDING APEX] ${ZONE_NAME} -> project '${holdingProj.name}' (HTTP ${res1.status})`);

    const res2 = await vercelRequest("POST", `/v10/projects/${holdingProj.id}/domains`, {
      name: `www.${ZONE_NAME}`,
      redirect: ZONE_NAME,
      redirectStatusCode: 308
    });
    console.log(`  [HOLDING WWW]  www.${ZONE_NAME} -> project '${holdingProj.name}' (HTTP ${res2.status})`);
  } else {
    console.warn("  [!] Could not locate holding company Vercel project ('summithillholdings' or 'josephjilovec').");
  }

  // Attach all 27 venture subdomains
  for (const v of VENTURE_DOMAIN_MAP) {
    const fqdn = `${v.subdomain}.${ZONE_NAME}`;
    const proj = findProject(v.repo) || findProject(v.subdomain);
    if (!proj) {
      console.warn(`  [!] No matching Vercel project found for repo '${v.repo}' (${fqdn})`);
      continue;
    }
    const res = await vercelRequest("POST", `/v10/projects/${proj.id}/domains`, {
      name: fqdn
    });
    console.log(`  [VENTURE DOMAIN] ${fqdn.padEnd(44)} -> project '${proj.name.padEnd(24)}' (HTTP ${res.status})`);
  }
}

async function main() {
  await configureCloudflare();
  await configureVercel();
  console.log("\n[+] Cutover script execution complete.");
}

main().catch((err) => {
  console.error("\n[ERROR]", err.message || err);
  process.exit(1);
});
