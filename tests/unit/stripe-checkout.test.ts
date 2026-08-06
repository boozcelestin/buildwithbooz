import { describe, expect, it } from "vitest";

import {
  assessmentAmountInCents,
  buildAssessmentCheckoutSession,
  isAutomationAssessmentPrice,
  readAssessmentCheckoutConfig,
  resolveSiteOrigin,
} from "../../src/features/stripe/checkout";

describe("Stripe assessment checkout", () => {
  it("requires both server side Stripe values", () => {
    expect(readAssessmentCheckoutConfig({})).toBeNull();
    expect(readAssessmentCheckoutConfig({ STRIPE_SECRET_KEY: "secret" })).toBeNull();
    expect(
      readAssessmentCheckoutConfig({
        STRIPE_SECRET_KEY: "  secret  ",
        STRIPE_PRICE_ID: "  price_assessment  ",
      }),
    ).toEqual({ secretKey: "secret", priceId: "price_assessment" });
  });

  it("accepts only the active one time USD price for exactly $1,000", () => {
    expect(assessmentAmountInCents).toBe(100_000);
    expect(
      isAutomationAssessmentPrice({
        active: true,
        currency: "usd",
        type: "one_time",
        unit_amount: 100_000,
      }),
    ).toBe(true);
    expect(
      isAutomationAssessmentPrice({
        active: true,
        currency: "usd",
        type: "one_time",
        unit_amount: 99_900,
      }),
    ).toBe(false);
    expect(
      isAutomationAssessmentPrice({
        active: true,
        currency: "usd",
        type: "recurring",
        unit_amount: 100_000,
      }),
    ).toBe(false);
  });

  it("uses the configured HTTPS origin and permits HTTP only for local development", () => {
    expect(
      resolveSiteOrigin("http://localhost:3000/api/stripe/checkout", "https://buildwithbooz.com/path"),
    ).toBe("https://buildwithbooz.com");
    expect(resolveSiteOrigin("http://localhost:3000/api/stripe/checkout")).toBe(
      "http://localhost:3000",
    );
    expect(() =>
      resolveSiteOrigin("https://buildwithbooz.com/api/stripe/checkout", "http://example.com"),
    ).toThrow();
  });

  it("creates a one item payment session with fixed return routes and purchase metadata", () => {
    const session = buildAssessmentCheckoutSession(
      "price_assessment",
      "https://buildwithbooz.com",
    );

    expect(session).toMatchObject({
      mode: "payment",
      line_items: [{ price: "price_assessment", quantity: 1 }],
      customer_creation: "always",
      submit_type: "pay",
      metadata: { purchase: "automation_assessment" },
      payment_intent_data: { metadata: { purchase: "automation_assessment" } },
    });
    expect(session.success_url).toBe(
      "https://buildwithbooz.com/assessment/thank-you?session_id=%7BCHECKOUT_SESSION_ID%7D",
    );
    expect(session.cancel_url).toBe(
      "https://buildwithbooz.com/services?checkout=cancelled#assessment-title",
    );
  });
});
