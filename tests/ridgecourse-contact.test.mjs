import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
import { register } from "tsx/cjs/api";

register();
const require = createRequire(import.meta.url);
const { POST } = require("../app/api/contact/route.ts");
const basic = { name: "Test Office", email: "office@example.test", message: "Index a folder.", consent: "yes" };
const pilot = { ...basic, inquiryType: "ridgecourse-office-pilot", businessState: "Arizona", jobState: "Arizona", filePurpose: "office" };
const post = body => POST(new Request("https://example.test/api/contact", { method: "POST", body: JSON.stringify(body) }));

test("a claim, unclear purpose, or missing location stops a pilot inquiry before delivery", async t => {
  t.mock.method(globalThis, "fetch", () => assert.fail("Excluded pilot reached delivery"));
  for (const change of [{ filePurpose: "claim" }, { filePurpose: "unknown" }, { filePurpose: "" }, { businessState: "" }, { jobState: "" }]) {
    assert.equal((await post({ ...pilot, ...change })).status, 400);
  }
});

test("the accepted pilot includes both locations and ordinary contact mail keeps its existing format", async t => {
  const variables = ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"];
  const previous = variables.map(key => process.env[key]);
  variables.forEach(key => { process.env[key] = "test-only"; });
  t.after(() => variables.forEach((key, i) => {
    if (previous[i] === undefined) delete process.env[key];
    else process.env[key] = previous[i];
  }));
  const messages = [];
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    messages.push(JSON.parse(options.body).text);
    return new Response(null, { status: 200 });
  });
  assert.equal((await post({ ...pilot, jobState: "Nevada" })).status, 200);
  assert.match(messages[0], /Business state: Arizona/);
  assert.match(messages[0], /Job state: Nevada/);
  assert.match(messages[0], /Operator screening required/);
  assert.equal((await post(basic)).status, 200);
  assert.doesNotMatch(messages[1], /Ridgecourse office pilot/);
});
