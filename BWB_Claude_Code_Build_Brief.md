# BuildWithBooz — Claude Code Production Build Brief
### The spec Claude Code (with Opus 5) builds the real site from. The analog of the Fable prompt. Fable designed every pixel; you build every function; you never redesign.

## 0. The one rule
The design is already done and locked. Your job is to turn it into a real, working, deployed site without changing how it looks. Replicate the design exactly. Build the function underneath. When in doubt about layout, spacing, copy, or color, copy the prototype, do not invent.

## 1. Inputs and where things live
Repo (build target): `/Users/boozcelestin/Business/BuildWithBooz/02_Website/`
- `04_Design/v9_design_prototype.html` — the CANONICAL design source. Every page, color, font, and word comes from here.
- `04_Design/bwb_demo_lead_response.html`, `bwb_demo_quote_follow_up.html`, `bwb_demo_invoice_payment.html` — the 3 autoplay demos to embed.
- `04_Design/bwb_tool_*_calculator.html` (6 files) — the SEO calculators to turn into real pages.
- `README.md` — repo notes.
Build the real project INTO the root of `02_Website/`. Leave `04_Design/` as reference.
Companion doc: the Gap Finder result kit (the ~40 ranked-leak blocks) — used to build the dynamic Gap Finder result. (Separate file.)

## 2. Stack (recommended)
- Framework: Next.js (App Router) with server side rendering, so pages are crawlable. This matters for SEO.
- Styling: match the prototype exactly. Port its CSS variables (ink 111111, paper FAFAF8, yellow F2C522, green 22C55E, Hanken Grotesk, IBM Plex Mono). Reuse its component styles; do not restyle.
- Backend: Convex (schema + functions). Booz has an account; `npm install convex` then `npx convex dev` (first run does a browser login).
- Email: Resend, called from a Convex function. Domain `resend.buildwithbooz.com` is verified. API key goes in a Convex environment variable (secret), never in the repo.
- Payments: Stripe (Payment Link or Checkout) for the paid assessment.
- Host: Booz's choice (Vercel is the natural fit for Next.js; Replit also possible).
Booz prereqs: Node.js installed; Convex account (done); Resend API key (done); Stripe account (in progress).

## 3. Pages and routes (from the prototype)
Turn each prototype screen into a real route:
- `/` Home
- `/services` Services (with the 3 demos embedded beside their systems, autoplay; the transparent-pricing block; the "not a package" caveat)
- `/about` About (with the real headshot as an optimized image file, not base64)
- `/gap-finder` the free Gap Finder (see section 4)
- `/insights` article index + `/insights/[slug]` article pages (long form, supports inline images)
- `/blog` short-post index + `/blog/[slug]` (see section 5)
- `/contact` the hand-raise form (carries Gap Finder answers when arriving from a result — see 4)
- `/tools/[tool]` the 6 calculator pages (see section 6)
- Legal: `/privacy`, `/terms`
Nav and footer: exactly as the prototype, including the quiet enterprise footer door.

## 4. The Gap Finder (the core build)
- Keep the prototype's exact flow and look: the click-through of 7 questions, the live-filling dark result card.
- RULES ENGINE, not an LLM. No API call per visit, no score number shown. The 7 answers map to ranked leak areas by deterministic rules.
- DYNAMIC RESULT: the result must vary by the goal the visitor picked and the leak areas their 7 answers rank. Assemble the shown result from the Gap Finder result kit blocks (companion doc). The prototype's single hardcoded HVAC sample is a placeholder; production must produce the right blocks per person.
- EMAIL CAPTURE (after the result, never gated): under the on-screen result, show the offer line exactly: "Want your results and a short plan for fixing your biggest leak sent to you?" plus an email field. Storing the email is required; showing the result is not conditional on it.
- STORE every completion in Convex: the 7 answers, the computed ranked leaks, the goal, timestamp, and email if given.
- EMAIL (Resend, from a Convex function): send the person their result plus a short templated plan for their top leak (from the kit) plus a clear CTA to the paid $1,000 Automation Assessment. The email is a sales asset, not a receipt. The copy is assembled in code from the kit; Resend only delivers.
- CARRY ANSWERS ON HAND-RAISE: a "Send this to Booz" / contact action from the result must travel WITH the 7 answers and computed leaks, so the contact submission is never blank.

## 5. Content architecture (two streams)
Build BOTH, markdown driven (simple; no heavy CMS):
- `/blog` — shorter posts. The website echo of a LinkedIn post, slightly expanded.
- `/insights` — full long articles. The home of a LinkedIn article, uncut; supports inline images (e.g. an article with several image slots).
Each is a folder of markdown files rendered to SSR pages with per-page title, meta, and Open Graph. This is the owned-page SEO engine.

## 6. The 6 SEO calculators
- Turn each `bwb_tool_*_calculator.html` into a real page under `/tools/`, in the site shell (real nav and footer, not the minimal standalone header they ship with). Keep the math and copy exactly as designed.
- LAUNCH: only the Missed Call Revenue calculator is linked and live at launch. Build the other five but keep them unlinked/hidden (no nav or sitemap entry) so they can be released one at a time later.
- CTAs: wire the primary "See where else your business is leaking" to `/gap-finder`, and the secondary "Or tell me what you are dealing with" to `/contact`.
- ENHANCEMENT: when someone clicks through from a calculator, carry their number and which calculator into the Gap Finder or contact form (prefill/context), same spirit as carrying Gap Finder answers to the contact form.

## 7. Convex schema (minimum)
- `gapFinderCompletions`: answers (7), goal, rankedLeaks, email (nullable), createdAt.
- `leads`: name, email, message, source (contact / gap-finder handoff), gapFinderCompletionId (nullable), createdAt.
- Mutations: `submitGapFinder`, `submitLead`. Trigger the Resend send on gap-finder completion when an email is present.

## 8. SEO checklist (standard, do all)
Per-page title + meta description (present in the prototype, carry them), Open Graph tags, semantic HTML, `sitemap.xml` + `robots.txt`, fast + mobile responsive, server side rendering so it's crawlable, and LocalBusiness structured data (schema.org JSON-LD). ON BOOZ, separate: set up a Google Business Profile (lives in his Google account; you can't do it, but link to/from it).

## 9. Cleanup / swaps
- Strip all preview scaffolding from the prototype: the `.screen` switcher and the preview bar. Each screen becomes a real route.
- Replace the inline base64 About photo with a real optimized image file (WebP).
- Give the tool pages the real site nav/header (they ship with only a footer wordmark).
- Anything tagged BUILD in the change maps.

## 10. Pricing (PROPOSED split — Booz to confirm; safe to build with these)
- Gap Finder: FREE.
- Automation Assessment: $1,000. Produces the scoped, prioritized plan. This fee is CREDITED toward the build if they proceed (honest, removes friction, rewards commitment).
- Implementation / builds: quoted inside the assessment. Typical range $5,000 to $10,000 plus.
- Strategic Diagnostic: $5,000 (the deeper version for more complex businesses).
- Ongoing care plan (optional, after a build): a monthly retainer to run and maintain the systems, priced to what's being managed. Flag as optional.
Transparent pricing block and the "we build what pays, not a package" caveat stay exactly as designed. No sales calls: price on the page, pay, onboard.

## 11. Definition of done (acceptance)
- Every prototype screen is a real, crawlable route with correct meta.
- Gap Finder produces a DIFFERENT, correct result per set of answers, stores it, offers the email after (not gated), emails it via Resend, and carries answers to contact.
- Contact and lead capture write to Convex.
- Missed Call calculator live; other five built and hidden.
- 3 demos embedded and autoplaying on Services.
- Stripe pay path works for the $1,000 assessment.
- SEO checklist complete; sitemap and robots present; LocalBusiness JSON-LD in place.
- No preview scaffolding remains; real image file in About.
- Zero dashes anywhere in visible copy (house rule).
- Deploys and loads fast on mobile.
