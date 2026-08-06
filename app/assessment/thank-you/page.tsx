import type { Metadata } from "next";
import Stripe from "stripe";

import { AssessmentIntakeForm } from "@/src/components/forms/AssessmentIntakeForm";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Assessment received",
  description: "Your Automation Assessment is underway.",
  path: "/assessment/thank-you",
});

type ThankYouPageProps = {
  searchParams: Promise<{ session_id?: string | string[] }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const query = await searchParams;
  const sessionId = typeof query.session_id === "string" ? query.session_id : null;
  let paidSession: Stripe.Checkout.Session | null = null;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        appInfo: { name: "BuildWithBooz", version: "0.1.0" },
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (
        session.payment_status === "paid" &&
        session.metadata?.purchase === "automation_assessment"
      ) {
        paidSession = session;
      }
    } catch {
      paidSession = null;
    }
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="startwrap">
        {paidSession && sessionId ? (
          <>
            <p className="eyebrow">Payment received</p>
            <h1 className="starth">You are in. Here is what happens next.</h1>
            <div className="rp-body">
              <p>Thank you. Your Automation Assessment is now on my desk, and I want the next steps to feel like anything but a black box.</p>
              <p>Right now, answer the short intake below. It takes about ten minutes. The more real your numbers, the sharper your assessment. Every question is optional, but the ones you skip become the assumptions I have to make for you.</p>
              <p>Within 48 hours of getting your intake, you get the assessment. A full read of where your business leaks calls, quotes, and jobs, with three to seven fixes ranked by what makes you the most money. No fluff, no upsell theater.</p>
              <p>A receipt from Stripe is already in your inbox. A separate note from me is on its way. If anything looks off, reply to that note and it reaches me directly.</p>
            </div>
            <AssessmentIntakeForm
              initialEmail={paidSession.customer_details?.email ?? paidSession.customer_email ?? ""}
              sessionId={sessionId}
            />
          </>
        ) : (
          <p className="rp-body" role="alert">
            We could not confirm this payment. If you just paid, give it a moment and refresh. If it
            still does not show, reply to your Stripe receipt or email booz@buildwithbooz.com and I
            will sort it out fast.
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
