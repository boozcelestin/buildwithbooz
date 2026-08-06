# BuildWithBooz — Context and Principles (READ THIS BEFORE THE BUILD BRIEF)

Read this first. Then read BWB_Claude_Code_Build_Brief.md for the technical spec. This doc is the WHY and the guardrails, so you build with the grain of the business instead of making generic assumptions.

## What BuildWithBooz is
A one person AI automation consultancy for local trades and home service businesses: HVAC, plumbing, electrical, roofing, contracting, landscaping. Run by Booz, an operator who used to run a marketing agency. It is not a SaaS product and not a generic AI agency.

## Who the visitor is
A non technical trades business owner. Busy, practical, skeptical of hype, not a developer. Everything on the site must make sense to that person. Plain language, no jargon.

## The core idea (the whole thesis)
Local businesses usually do not lose money from a lack of leads. They lose it to leaks AFTER the lead: the missed call that goes to voicemail, the quote nobody followed up, the invoice nobody chased, the job that only moves when the owner is in the room. BuildWithBooz finds the one place a business is actually leaking and builds the fix. The tool is the cheap part. Knowing where to point it is the value.

## Principles that constrain the build (do not violate these)
- Transparent pricing, no sales calls. The price is on the page on purpose. People see it, pay, and onboard. There is no "book a call" anywhere on the site. Do not add one.
- The free Gap Finder is RULES BASED. It must never call an LLM or any AI API per visit. It is deterministic logic that maps 7 answers to ranked leak areas. Do not "upgrade" it to use AI. Real AI lives in the paid backend work, never on the free public tool.
- Honesty. There are no clients yet. Do NOT fabricate testimonials, client logos, case studies, star ratings, or statistics. The design keeps an honest, empty case study state on purpose. Any example, like a sample assessment, must be clearly labeled as illustrative, not a real client.
- Voice. Plain speech, a mix of short and long sentences. No hyphens, en dashes, or em dashes anywhere in visible copy. No corporate or AI buzzwords.
- The enterprise door is quiet. There is a low key enterprise contact path in the footer, not a loud section. Keep it understated.

## Do NOT
- Do not redesign anything. Match 04_Design/v9_design_prototype.html exactly.
- Do not invent or rewrite visible copy. Every word is already in the prototype. If copy seems missing for something you are building, ask, do not make it up.
- Do not add features, pages, sections, popups, chat widgets, cookie banners, or newsletter modals beyond what the brief specifies.
- Do not fabricate proof of any kind (see honesty above).
- Do not hardcode secrets. Keys go in environment variables.
- Do not turn the free Gap Finder into an AI or LLM call.

## Then
Read BWB_Claude_Code_Build_Brief.md for the stack, routes, Gap Finder engine spec, Convex, Resend, Stripe, SEO, and the acceptance checklist. Build in stages: plan first, wait for approval, then one stage at a time.
