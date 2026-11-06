const links = [
  "https://summithillholdings.com/",
  "https://myhealthyaura.com/",
  "https://swiftdealsolutions.com/",
  "https://djhotwax.summithillholdings.com/",
  "https://vantahelix.summithillholdings.com/",
  "https://www.cannacoreseeds.com/",
  "https://snarklogic.summithillholdings.com/",
  "https://summithillholdings.com/contact"
];

let failed = false;
for (const url of links) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "SummitHillHoldings-site-link-check/1.0" } });
    const protectedExternalPage = response.status === 403 && new URL(url).hostname === "medium.com";
    const ok = (response.status >= 200 && response.status < 400) || protectedExternalPage;
    console.log(`${protectedExternalPage ? "BLOCKED" : ok ? "OK" : "FAIL"} ${response.status} ${url}`);
    if (!ok) failed = true;
  } catch (error) {
    console.error(`FAIL ${url}: ${error.message}`);
    failed = true;
  }
}
if (failed) process.exit(1);
