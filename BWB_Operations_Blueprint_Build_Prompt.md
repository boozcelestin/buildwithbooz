# BuildWithBooz: build the /operations-blueprint sales page + rename the $5k tier (Codex build prompt)

You are working in the BuildWithBooz Next.js codebase at `02_Website/`. Build the new sales page for the $5,000 tier, wire its Stripe checkout, place its two images, and use the name "The Operations Blueprint" everywhere. Build in stages, plan first, do not redesign anything.

## 0. The one rule

The design system is already built and live. Do not invent a new look. Assemble this page from the components and styles already used on `/assessment`, `/services`, and `/sample-assessment`: the site header, footer, buttons, price cards, chips, dark call to action bands, eyebrow labels, numbered items, and checklist lists. Match the existing colors and fonts exactly (ink 111111, paper FAFAF8, yellow F2C522, green 22C55E, Hanken Grotesk, IBM Plex Mono). When unsure, copy how `/assessment` does it.

## 1. What you are building, in one paragraph

A new route, `/operations-blueprint`, that is the sales page for the $5,000 Operations Blueprint, the deeper whole operation product for bigger trades operators. The $5k currently exists only as a one line Operations Blueprint mention on `/services`. After this build, the Operations Blueprint has its own page, its own Stripe checkout for $5,000, and its before and after image.

## 2. Inputs provided (in `02_Website/`)

- `BWB_Operations_Blueprint_Copy.md` — the exact page copy (this is Version E). Use it verbatim. Do not rewrite or shorten any sentence. Lines written as `(Button: ...)` are call to action buttons, not body text. Everything else is visible copy.
- `public/images/operations-blueprint/blueprint-before.svg` — the "how your shop really runs" diagram: the operation leaking, money sitting unused, owner in the middle.
- `public/images/operations-blueprint/blueprint-after.svg` — the same map fixed: leaks sealed, money working, owner out of the middle.
- Reuse the existing Stripe checkout mechanism at `app/api/stripe/checkout/route.ts` (the one the $1k assessment uses), extended to charge $5,000 for this product.

## 3. Route and metadata

- Create `app/operations-blueprint/page.tsx`, server rendered.
- Metadata via the existing `createPageMetadata` helper: title "The Operations Blueprint", a description drawn from the hero subline, path `/operations-blueprint`. Open Graph, same pattern as other pages.
- Add `/operations-blueprint` to `app/sitemap.ts`.

## 4. Page structure, section by section

Build the sections in the order they appear in the copy file. Rhythm rule: no more than about two text blocks pass before the eye hits a visual or the background flips between paper and a dark zone.

1. Hero. Headline, subline, two buttons (see section 5). Background paper.
2. The before and after image pair, as one prominent block right under the hero. On desktop show `blueprint-before.svg` and `blueprint-after.svg` side by side with small labels "today" and "once it is fixed"; on mobile stack them, before on top. This is the visual anchor of the page. Alt text: before = "The shop today: calls, quotes, and invoices leaking, money sitting unused, and everything running through the owner." after = "The same operation fixed: every step sealed and flowing, the unused money working, and the owner out of the daily flow."
3. "Knowing was never your problem." Short prose, eyebrow label. Paper.
4. "Plans are free now. Doing is the scarce part." Set the line about plans being free as a pull quote. Dark zone.
5. "And it is not only leaking. A lot of it is hiding." Short prose. Paper.
6. "What actually breaks a stall." The three points as a clean numbered or three item block. Paper.
7. "I am an operator, not a plan." Booz's headshot (`/images/about/booz-celestin.webp`) beside the text. Paper.
8. "What you actually get." The five item list as a bordered checklist card. Paper.
9. "How it works." Short prose. Paper.
10. "The risk is on me." A distinct bordered block with a subtle green accent, directly after the price card. Paper.
11. "This is not the $1,000 assessment." A routing block. Link the words Automation Assessment to `/assessment`. Paper.
12. "What happens after you pay." The three numbered steps as a numbered strip. Paper or light tint.
13. "Close." A final dark call to action band with the primary button.

Put the price card (the existing `entry` price component, showing $5,000 and the primary button) at the "How it works" or "risk is on me" area, wherever it reads best while keeping the risk reversal directly under it.

## 5. The buttons and where they go

- Primary, labeled "Start the Blueprint. $5,000". Triggers Stripe checkout for the $5,000 product (see section 6). Appears in the hero, the price area, and the close.
- Hero secondary "See what is inside" is an anchor link that scrolls to the "What you actually get" section. It does not go to another page.
- There is no Blueprint sample page yet. So OMIT the "See a sample page of the Blueprint" button from the copy for now. Do not fabricate a sample. We will add it later when a real sample exists.

## 6. Stripe for the $5,000 product

- Reuse the existing checkout at `app/api/stripe/checkout/route.ts`. Extend it so it can charge either the $1,000 assessment or the $5,000 Operations Blueprint, selected by the button that calls it (for example a hidden field or a distinct route `app/api/stripe/checkout-blueprint/route.ts`, whichever is cleaner in this codebase).
- Add a new environment variable for the $5,000 price, for example `STRIPE_PRICE_ID_BLUEPRINT`, an active one time USD Price for exactly $5,000. Do not hardcode the price ID. Add it to `DEPLOYMENT_CHECKLIST.md` alongside the existing Stripe variables.
- The success and cancel routes return to `/operations-blueprint`, mirroring how the assessment returns to `/assessment`.

## 7. Use The Operations Blueprint everywhere

- Grep the whole `02_Website` codebase, case insensitive, for the former product name and replace every instance with "The Operations Blueprint". Report every file you changed.
- Known live spot: `app/services/page.tsx`, the $5k block near the bottom. Rewrite that block to use The Operations Blueprint, keep the $5,000 price, use a short description such as "The Operations Blueprint maps your entire operation, finds every leak and every dollar sitting unused, and hands you the ranked plan to fix it. For multiple crews, more than one location, a full office." and change its button to a link to `/operations-blueprint` labeled "See the Operations Blueprint". Do not post to Stripe from Services.
- Also update the internal doc `BWB_Claude_Code_Build_Brief.md` product line for consistency.

## 8. Routing between the two tiers

- On `/operations-blueprint`, the "This is not the $1,000 assessment" block links the Automation Assessment to `/assessment`.
- On `/assessment` and on `/services`, add one short mirror line for bigger operators pointing to `/operations-blueprint`, for example: "Running more than a couple of crews, more than one location, or a full office? The thousand dollar assessment will miss too much of a business your size. Start with the Operations Blueprint instead." Link it to `/operations-blueprint`.

## 9. Voice and quality gates

- Zero dashes and zero hyphens anywhere in visible copy. Hard house rule.
- Use the copy verbatim from `BWB_Operations_Blueprint_Copy.md`. If copy seems missing for something you are building, ask, do not invent it.
- No fabricated proof. No testimonials, logos, ratings, or invented numbers. The guarantee has no dollar figure on purpose, do not add one.
- Server side rendered and crawlable, fast, fully responsive on mobile, native to the existing site.

## 10. Definition of done

- `/operations-blueprint` exists as a real crawlable route with correct metadata and a sitemap entry.
- All sections render in order using existing components, with the before and after image pair under the hero.
- The primary button starts Stripe checkout for the $5,000 product using a new price env var.
- The former product name no longer appears anywhere in the codebase.
- The Services $5k block is renamed and links to `/operations-blueprint`.
- The two tiers cross link: the Blueprint page points down to `/assessment`, and `/assessment` and `/services` point up to `/operations-blueprint`.
- No dashes in visible copy. No fabricated proof. Mobile clean. Matches the site.
