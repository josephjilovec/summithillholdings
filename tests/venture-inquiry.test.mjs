import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleVentureInquiry, inquiryBrand, inquiryOriginAllowed } from '../lib/ventureInquiry.ts';

const address = 'https://summithillholdings.com/api/inquiry?venture=snarklogic';
const origin = 'https://snarklogic.summithillholdings.com';
const settings = { apiKey: 'test-key', recipient: 'private-recipient@example.com', sender: 'business@example.com' };
const fields = { name: 'Test Visitor', email: 'visitor@example.com', message: 'A general business question.' };
const request = (value = fields, extra = {}) => new Request(address, { method: 'POST', headers: { origin, 'content-type': 'application/json', accept: 'application/json', ...extra }, body: JSON.stringify(value) });
const accepted = async () => new Response('{}', { status: 200 });

test('only explicit portfolio origins and the current same-origin host are accepted', () => {
  assert.equal(inquiryOriginAllowed(origin, address), true);
  assert.equal(inquiryOriginAllowed('https://www.cannacoreseeds.com', address), true);
  for (const value of [null, 'null', 'https://unknown.summithillholdings.com', 'https://snarklogic.summithillholdings.com.attacker.example', 'http://snarklogic.summithillholdings.com']) assert.equal(inquiryOriginAllowed(value, address), false);
  assert.equal(inquiryBrand('unlisted'), undefined);
});

test('preflight is bounded to the approved origin and does not allow credentialed requests', async () => {
  const result = await handleVentureInquiry(new Request(address, { method: 'OPTIONS', headers: { origin } }), {});
  assert.equal(result.status, 204);
  assert.equal(result.headers.get('access-control-allow-origin'), origin);
  assert.equal(result.headers.get('access-control-allow-credentials'), null);
  assert.equal(result.headers.get('cache-control'), 'no-store');
});

test('unknown origins cannot trigger delivery', async () => {
  let called = false;
  const result = await handleVentureInquiry(request(fields, { origin: 'https://attacker.example' }), settings, async () => { called = true; return accepted(); });
  assert.equal(result.status, 403);
  assert.equal(called, false);
});

test('missing delivery configuration fails without claiming receipt or exposing destinations', async () => {
  const result = await handleVentureInquiry(request(), {}, accepted);
  assert.equal(result.status, 503);
  assert.equal((await result.json()).success, false);
});

test('the browser cannot set the destination and a success requires provider acceptance', async () => {
  let sent;
  const result = await handleVentureInquiry(request({ ...fields, to: 'attacker@example.com' }), settings, async (url, options) => { sent = { url, options, payload: JSON.parse(options.body) }; return accepted(); });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).success, true);
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.deepEqual(sent.payload.to, [settings.recipient]);
  assert.equal(sent.payload.reply_to, fields.email);
  assert.equal(sent.options.redirect, 'error');
  assert.equal(sent.options.signal instanceof AbortSignal, true);
});

test('provider rejection leaves the inquiry unsent', async () => {
  const result = await handleVentureInquiry(request(), settings, async () => new Response('provider failure', { status: 500 }));
  assert.equal(result.status, 502);
  assert.equal((await result.json()).success, false);
});

test('network errors leave the inquiry unsent', async () => {
  const result = await handleVentureInquiry(request(), settings, async () => { throw new Error('network'); });
  assert.equal(result.status, 502);
});

test('invalid email and nested payloads are rejected before delivery', async () => {
  for (const value of [{ ...fields, email: 'not an email' }, { ...fields, message: { nested: true } }, []]) {
    const result = await handleVentureInquiry(request(value), settings, accepted);
    assert.equal(result.status, 400);
  }
});

test('the byte limit applies without a content-length header', async () => {
  const result = await handleVentureInquiry(request({ ...fields, message: 'é'.repeat(5000) }), settings, accepted);
  assert.equal(result.status, 413);
});

test('a declared oversize body is rejected', async () => {
  const result = await handleVentureInquiry(request(fields, { 'content-length': '9000' }), settings, accepted);
  assert.equal(result.status, 413);
});

test('a stream crossing the byte limit is rejected and canceled', async () => {
  let canceled = false;
  let count = 0;
  const stream = new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array(4096)); if (++count === 4) controller.close(); }, cancel() { canceled = true; } });
  const input = new Request(address, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: stream, duplex: 'half' });
  const result = await handleVentureInquiry(input, settings, accepted);
  assert.equal(result.status, 413);
  assert.equal(canceled, true);
});

test('attachments are rejected instead of forwarded', async () => {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => data.set(key, value));
  data.set('file', new File(['private records'], 'records.txt'));
  const result = await handleVentureInquiry(new Request(address, { method: 'POST', headers: { origin }, body: data }), settings, accepted);
  assert.equal(result.status, 400);
});

test('HTML form submissions redirect only after accepted delivery, without PII in the URL', async () => {
  const input = new Request(address, { method: 'POST', headers: { origin, accept: 'text/html' }, body: new URLSearchParams(fields) });
  const result = await handleVentureInquiry(input, settings, accepted);
  assert.equal(result.status, 303);
  assert.equal(result.headers.get('location'), '/contact?received=1&venture=snarklogic');
});

test('HTML failures are uncached and do not echo submitted details or private configuration', async () => {
  const input = new Request(address, { method: 'POST', headers: { origin, accept: 'text/html' }, body: new URLSearchParams(fields) });
  const result = await handleVentureInquiry(input, {}, accepted);
  const html = await result.text();
  assert.equal(result.status, 503);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.equal(html.includes(fields.email), false);
  assert.equal(html.includes(settings.recipient), false);
  assert.match(html, /has not been sent/);
});

test('unlisted ventures and honeypots do not report success', async () => {
  const missing = new Request(address.replace('snarklogic', 'unlisted'), { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(fields) });
  assert.equal((await handleVentureInquiry(missing, settings, accepted)).status, 400);
  assert.equal((await handleVentureInquiry(request({ ...fields, _honey: 'spam' }), settings, accepted)).status, 400);
});
