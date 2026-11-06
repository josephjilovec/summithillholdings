# Website Architecture

## Route architecture

The App Router is used throughout. Pages render on the server unless interactivity requires a client component.

### Server-first pages

- homepage
- ventures index shell
- venture detail pages
- founder
- studio
- technology
- creative
- writing
- contact shell

### Client components

- `SiteHeader` — mobile menu state
- `VentureConstellation` — selected venture state
- `VentureGrid` — category filtering
- `StudioLoop` — selected process step
- `FounderTimeline` — timeline selection
- `ContactForm` — progressive form submission state

## Data model

`lib/ventures.ts` is the single source of truth for public venture data. Individual project pages are statically generated from the slug list.

This keeps:

- project stage language consistent
- category filtering synchronized
- external URLs centralized
- metadata generation predictable
- future CMS migration straightforward

## Server capabilities

`POST /api/contact` and `POST /api/brief` run only on the server. They validate required fields, use a hidden honeypot field, limit payload length, and send email through Resend when the required environment variables are present.

## Security posture

- no API keys in browser bundles
- server-side Resend call only
- security response headers from `next.config.ts`
- API routes excluded from robots
- reply-to uses submitter email while From uses a verified sender
- no user input is rendered as HTML

For higher-volume public traffic, add a durable rate limiter and/or Cloudflare Turnstile before the contact endpoints.
