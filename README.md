# Summit Hill Holdings

Private website source for the Summit Hill Holdings portfolio. The deployed website is public; the GitHub repository does not need to be public.

## Development

Node.js 24, Next.js 16, React 19, and TypeScript. Run `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`.

## Hosting

Connect this repository to the existing Vercel website project rather than creating a duplicate public source repository. The project root is `./`. Configure and verify summithillholdings.com and its www alias before replacing any production domain.

Existing individual venture sites keep their own source repositories and visual design. Their holding-company domain aliases are attached to their existing hosting projects. Independent brand domains remain valid where already used. Repository visibility and hosting domains are separate settings.

## Inquiry delivery

Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` only in server-side deployment configuration. Use a verified business sender. No personal operator email address or personal calendar is published by the source. Missing delivery configuration returns a clear failure, never a success acknowledgement.

`/api/inquiry?venture=<listed-slug>` accepts bounded general business inquiries from an explicit list of portfolio origins. It does not accept files or grant access to private documents. `/contact?venture=<listed-slug>` preselects the brand without putting inquiry text or personal data in a URL.

## Private operations

Business plans, domain-migration records, internal ownership records, and diligence material belong in the separate access-controlled operations repository. Customer records, personal evidence, and secrets do not belong in marketing source.

## Public identity

Organization metadata, branded contact routes, and portfolio artwork use Summit Hill Holdings. Public portfolio inclusion does not establish legal ownership, nonprofit status, or a transfer of assets. Legal entity and trade-name disclosures remain accurate and separate from the portfolio brand.

