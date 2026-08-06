# BuildWithBooz deployment checklist

This project is ready to hand to a Next.js host. Do not deploy until every launch gate below is closed.

## Host settings

- Root directory: `02_Website`
- Framework: Next.js
- Build command: `npm run build`
- Start command: `npm run start`
- Node.js: `24.19.0`
- npm: `11.17.0`
- Repository environment files stay untracked

## Application environment

Set these on the hosting provider. Never commit their values.

| Name | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Next.js host | Production origin, `https://buildwithbooz.com` |
| `CONVEX_DEPLOYMENT` | Next.js host | Production Convex deployment identifier |
| `NEXT_PUBLIC_CONVEX_URL` | Next.js host | Production Convex URL |
| `STRIPE_SECRET_KEY` | Next.js host | Live Stripe secret key |
| `STRIPE_PRICE_ID` | Next.js host | Active one time USD Price for exactly $1,000 |

Set these in the production Convex deployment environment.

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend delivery secret |
| `RESEND_FROM_EMAIL` | Verified sender on `resend.buildwithbooz.com` |
| `SITE_URL` | Absolute assessment CTA origin, `https://buildwithbooz.com` |

## Verification commands

From this directory:

```bash
npm ci
npm run check
npm audit --omit=dev
npm run test:e2e
```

The final check includes application TypeScript, Convex TypeScript, unit tests, and the production build.

## Launch gates still open

- Replace the Privacy and Terms placeholders with approved legal copy.
- Configure live Stripe values and test a new Checkout Session in live mode.
- Point `NEXT_PUBLIC_SITE_URL` and `SITE_URL` at the production domain.
- Complete the approved onboarding stage after assessment purchase.
- Replace placeholder Gap Finder result blocks with the final result kit copy.
- Replace placeholder Insights article bodies with the final articles.
- Decide and implement the approved Stripe success and onboarding confirmation copy.

No production deployment is performed by this checklist.

## After the site is live (LinkedIn go live)

- Change the BuildWithBooz company page button URL to point at the Gap Finder page (only works once the site is live).
- Publish the reintroduction post, and only then add BuildWithBooz to your personal work history. Doing the job change last means the automatic network alert and your launch post land together, for one combined wave of attention while the site and Gap Finder are live.
