import type Stripe from "stripe";

export const assessmentAmountInCents = 100_000;

export type AssessmentCheckoutConfig = {
  secretKey: string;
  priceId: string;
};

type AssessmentPrice = Pick<Stripe.Price, "active" | "currency" | "type" | "unit_amount">;

export function readAssessmentCheckoutConfig(
  environment: {
    STRIPE_SECRET_KEY?: string;
    STRIPE_PRICE_ID?: string;
  },
): AssessmentCheckoutConfig | null {
  const secretKey = environment.STRIPE_SECRET_KEY?.trim();
  const priceId = environment.STRIPE_PRICE_ID?.trim();

  if (!secretKey || !priceId) {
    return null;
  }

  return { secretKey, priceId };
}

export function resolveSiteOrigin(requestUrl: string, configuredSiteUrl?: string) {
  const candidate = configuredSiteUrl?.trim() || new URL(requestUrl).origin;
  const url = new URL(candidate);
  const localHostname =
    url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";

  if (url.protocol !== "https:" && !(url.protocol === "http:" && localHostname)) {
    throw new Error("Stripe Checkout return URLs require HTTPS outside local development.");
  }

  return url.origin;
}

export function isAutomationAssessmentPrice(price: AssessmentPrice) {
  return (
    price.active &&
    price.type === "one_time" &&
    price.currency.toLowerCase() === "usd" &&
    price.unit_amount === assessmentAmountInCents
  );
}

export function buildAssessmentCheckoutSession(
  priceId: string,
  siteOrigin: string,
): Stripe.Checkout.SessionCreateParams {
  const successUrl = new URL("/assessment/thank-you", siteOrigin);
  successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");

  const cancelUrl = new URL("/services", siteOrigin);
  cancelUrl.searchParams.set("checkout", "cancelled");
  cancelUrl.hash = "assessment-title";

  const purchase = "automation_assessment";

  return {
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_creation: "always",
    submit_type: "pay",
    success_url: successUrl.toString(),
    cancel_url: cancelUrl.toString(),
    metadata: { purchase },
    payment_intent_data: { metadata: { purchase } },
  };
}
