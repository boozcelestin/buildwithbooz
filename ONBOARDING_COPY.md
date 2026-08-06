# BuildWithBooz — Approved Onboarding Copy

Approved by Booz, Aug 6, 2026. Use verbatim. Voice: plain speech, no dashes or hyphens, transparent, no sales calls, no "book a call" anywhere.

---

## 1. Success page (`/assessment/thank-you`, shown only when the Stripe session is paid)

**Eyebrow:** Payment received

**Headline:** You are in. Here is what happens next.

**Body:**
Thank you. Your Automation Assessment is now on my desk, and I want the next steps to feel like anything but a black box.

Right now, answer the short intake below. It takes about ten minutes. The more real your numbers, the sharper your assessment. Every question is optional, but the ones you skip become the assumptions I have to make for you.

Within 48 hours of getting your intake, you get the assessment. A full read of where your business leaks calls, quotes, and jobs, with three to seven fixes ranked by what makes you the most money. No fluff, no upsell theater.

A receipt from Stripe is already in your inbox. A separate note from me is on its way. If anything looks off, reply to that note and it reaches me directly.

**Intake form heading:** Tell me about your business

**Submit button:** Send my intake

**Post submit confirmation (inline, after the form is sent):**
Got it. Your intake is in. I will read it against your real numbers and get your assessment back to you within 48 hours. Watch your inbox.

**Fallback state (session not paid or cannot be confirmed):**
We could not confirm this payment. If you just paid, give it a moment and refresh. If it still does not show, reply to your Stripe receipt or email booz@buildwithbooz.com and I will sort it out fast.

---

## 2. Confirmation email (sent from the webhook via Convex and Resend)

**Subject:** Your Automation Assessment is underway

**Preheader:** One short intake from you and the clock starts.

**Body** (greeting falls back to "Hi there," when Stripe has no name):

Hi {{firstName}},

Thank you for buying the Automation Assessment. This note confirms it is underway.

Here is the plan. If you have not filled the intake yet, that is the one thing I need from you. It takes about ten minutes, and it is what makes your assessment specific to your shop instead of generic.

{{intakeButton: Fill out your intake}}

Within 48 hours of getting your intake, you get the assessment. A full diagnosis of where the business leaks calls, quotes, and jobs, with three to seven fixes ranked by what pays.

There is no call to book and no hoop to jump through. If you have a question, reply to this email. It comes straight to me.

Booz
BuildWithBooz

**Plain text version:** same words; the button becomes a plain link labeled "Fill out your intake" followed by the URL.

---

## 3. Intake form fields

About ten minutes. Only three fields required so nobody bounces. Each field gets the helper line shown.

**Required:**
- Your name
- Best email — prefilled from the Stripe checkout, editable
- What your business does — helper: "Your trade, for example HVAC, plumbing, electrical, roofing."

**Optional** (the value lives here, but do not gate submission on them):
- Business name
- Website
- Best phone
- Roughly how many leads or calls a month — helper: "A ballpark is fine. Your best guess beats a blank."
- Your average job value — helper: "Rough average ticket. Directional is enough."
- How leads reach you now — helper: "Calls, web forms, referrals, repeat customers, a mix."
- What happens to a call when everyone is busy — helper: "Voicemail, a receptionist, an app, nothing."
- Do you follow up on quotes, and how — helper: "By hand, on a schedule, not really."
- What tools you use now — helper: "CRM, scheduling, invoicing, or none yet."
- The one thing that, if fixed, would matter most — helper: "In your words. This tells me where to point first."
- Anything else I should know

Accessibility: every field labeled, required fields marked and announced, errors tied to their field, visible focus. WCAG 2.2 AA.
