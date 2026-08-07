# BuildWithBooz: build the /assessment sales page (Codex build prompt)

You are working in the BuildWithBooz Next.js codebase at `02_Website/`. Build the new dedicated sales page for the $1,000 Automation Assessment, and rewire the site so every assessment or audit call to action funnels through it. Build in stages, plan first, do not redesign anything.

## 0. The one rule

The design system is already built and live. Do not invent a new look. Assemble this page from the components and styles that already exist in this codebase (the same ones used on `/services` and `/sample-assessment`): the site header, footer, buttons, price cards, chips, dark call to action bands, eyebrow labels, numbered items, and checklist lists. Match the existing colors and fonts exactly (ink 111111, paper FAFAF8, yellow F2C522, green 22C55E, Hanken Grotesk, IBM Plex Mono). If something is unclear, copy how `/services` does it. Do not restyle the site.

## 1. What you are building, in one paragraph

A new route, `/assessment`, that is the dedicated sales page for the $1,000 Automation Assessment. Right now the $1,000 offer is sold as one section inside `/services`, and there is no page of its own. After this build, `/assessment` is where the offer is sold, and every place on the site that points a person toward the assessment or the audit links to `/assessment`. The only place Stripe checkout is triggered is the primary button on `/assessment`. So the flow becomes: any page, then the `/assessment` sales page, then Stripe.

## 2. Inputs provided (in `02_Website/`)

- `BWB_Assessment_Page_Copy.md` — the exact page copy. Use it verbatim. Do not rewrite, shorten, or embellish any sentence. Lines written as `(Button: ...)` are call to action buttons, not body text. Everything else is visible copy.
- `public/images/assessment/bucket-with-holes.svg` — the leak illustration (a bucket leaking money from three labeled holes). Use it as the hero and reframe image.
- Existing asset to reuse: `public/images/about/booz-celestin.webp` — Booz's headshot, for the "who is doing this" section.
- Existing Stripe path to reuse: the checkout is already wired at `app/api/stripe/checkout/route.ts` and is used today by the assessment button on `/services`. Reuse that exact mechanism. Do not change the Stripe price or env setup.

## 3. Route and metadata

- Create `app/assessment/page.tsx`, server rendered.
- Set metadata with the existing `createPageMetadata` helper: title "Automation Assessment", a description drawn from the hero subline, path `/assessment`. Include Open Graph, same pattern as other pages.
- Add `/assessment` to `app/sitemap.ts`.
- Add descriptive `alt` text to the bucket image, for example: "A bucket leaking money from three holes labeled missed call, quote not followed up, and invoice not chased."

## 4. Page structure, section by section

Build the sections in this order, using the copy from `BWB_Assessment_Page_Copy.md`. The goal is rhythm, so no more than about two text blocks pass before the eye hits a visual or the background flips between paper and a dark zone.

1. Hero. Headline, subline, two buttons (see section 5). Place the bucket SVG beside the text on desktop, below it on mobile. Background paper.
2. "You do not have a lead problem." Short prose with an eyebrow label such as "The real problem." Optionally a row of three small existing line icons for missed call, quote, invoice. Paper.
3. "More leads is the wrong lever." Set the line "pouring more water into a bucket with holes" as a large pull quote. This is the natural home for the bucket illustration if you did not use it in the hero. Use a dark zone here to mark the turn. Dark.
4. "Why a diagnosis, not a guess." Short prose. Render the x-ray line as a chip or callout. Paper.
5. "What you actually get." The four item list as a bordered checklist card on one side. On the other side, a framed preview that links to `/sample-assessment` (see section 7), with the "See a real sample assessment" button. Paper.
6. "You do not need more information. You need clarity." Large pull quote, generous whitespace, a visual breather. Tinted or dark.
7. "The price is on the page, on purpose." Use the existing price card component. Show $1,000 and the primary button. Paper.
8. "Read it first. Then decide if it was worth it." This is the risk reversal. Render it as a distinct bordered block with a subtle green accent, placed directly under the price section. Paper.
9. "The assessment is the answer, not the first of ten steps." Short prose. Paper.
10. "Who is doing this." Booz's headshot (`booz-celestin.webp`) beside the text. Paper.
11. "What happens after you pay." The four numbered steps as a numbered strip, reusing the numbered item style from `/sample-assessment`. Paper or light tint.
12. "Not sure you are ready." A small dark call to action band linking to the Gap Finder, reusing the band from the bottom of `/services`. Dark.
13. "Close." The final dark call to action band, larger, with the primary button. Dark.

Header and footer are the existing site header and footer, including the quiet enterprise footer door. Set the header active state appropriately.

## 5. The buttons and where they go

- Primary, labeled "Start the assessment. $1,000". Triggers Stripe checkout using the exact same mechanism the `/services` assessment button uses today (the form that posts to `app/api/stripe/checkout/route.ts`). This button appears in the hero, the price section, and the close.
- Secondary in the hero and in "what you get", labeled "See a real example first" and "See a real sample assessment". Links to `/sample-assessment`.
- In "not sure you are ready", labeled "Run the free Gap Finder". Links to `/gap-finder`.

## 6. Rewire the rest of the site (important)

Make `/assessment` the single front door to the paid assessment. Search the codebase and update every assessment or audit call to action so it points to `/assessment`, not to Stripe directly and not to `/services#assessment-title`. The only button that calls Stripe is the primary button on `/assessment` itself.

Known places to fix, plus anything else you find:

- `app/services/page.tsx`. The Automation Assessment entry currently posts straight to Stripe checkout. Change its primary button so it links to `/assessment` instead (for example "See the assessment"). Keep a short version of the assessment mention on Services as a teaser, but move the full sell to `/assessment`. Do not delete the section, just convert its button from a Stripe post to a link to `/assessment`. Leave the deeper Operations Blueprint and build rows as they are.
- `app/sample-assessment/page.tsx`. The bottom button "See the assessment and start" currently links to `/services#assessment-title`. Change it to `/assessment`.
- Header and navigation. If any nav item or button points at the assessment or at `/services#assessment`, point it at `/assessment`. Leave the "Run the Gap Finder" nav call to action as is.
- Home page and any other page. Any link or button referencing the assessment, the audit, or "$1,000" that is meant to start the assessment should link to `/assessment`. Grep for `assessment`, `#assessment`, `stripe/checkout`, and `$1,000` and reconcile each hit against this rule.

Net result to verify: from anywhere on the site, a person clicking toward the audit or assessment lands on `/assessment` first, and only the primary button there sends them to Stripe.

## 7. Images

- Bucket: reference `/images/assessment/bucket-with-holes.svg`. It is a clean vector, so render it at a comfortable size (roughly half the text column width on desktop). Add the alt text from section 3.
- Headshot: reuse `/images/about/booz-celestin.webp`.
- Sample assessment preview: if there is no existing thumbnail asset, do not fabricate a screenshot. Use a simple framed card that links to `/sample-assessment` (a bordered box with a short label like "See a real sample assessment"). A real screenshot can be added later.
- Do not add stock photography. Do not add any video. The autoplay demos already live on `/services`.

## 8. Voice and quality gates

- Zero dashes and zero hyphens anywhere in visible copy. This is a hard house rule. If a compound would normally be hyphenated, write it open.
- Use the copy verbatim from `BWB_Assessment_Page_Copy.md`. If a piece of copy seems missing for something you are building, ask, do not invent it.
- No fabricated proof. No testimonials, client logos, star ratings, or invented statistics. The sample assessment stays clearly labeled illustrative.
- Server side rendered and crawlable. Fast and fully responsive on mobile. The page must look and feel native to the existing site.

## 9. Definition of done

- `/assessment` exists as a real, crawlable route with correct metadata and an entry in the sitemap.
- The page renders all sections above, in order, using existing components, with the paper and dark rhythm and the pull quotes.
- The bucket SVG and the headshot render with alt text.
- The primary button starts Stripe checkout for the $1,000 assessment using the existing mechanism.
- Every other assessment or audit call to action across the site links to `/assessment`, and Stripe is reachable only from the `/assessment` primary button.
- `/services` assessment button and `/sample-assessment` bottom button both point to `/assessment`.
- No dashes in visible copy. No fabricated proof. Mobile clean. Matches the v9 look.
