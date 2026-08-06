import { NextResponse } from "next/server";
import Stripe from "stripe";

import {
  buildAssessmentCheckoutSession,
  isAutomationAssessmentPrice,
  readAssessmentCheckoutConfig,
  resolveSiteOrigin,
} from "@/src/features/stripe/checkout";

export const runtime = "nodejs";

function returnToAssessment(request: Request) {
  const servicesUrl = new URL("/services", request.url);
  servicesUrl.hash = "assessment-title";
  return NextResponse.redirect(servicesUrl, 303);
}

export async function POST(request: Request) {
  const config = readAssessmentCheckoutConfig({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
  });

  if (!config) {
    return returnToAssessment(request);
  }

  try {
    const siteOrigin = resolveSiteOrigin(request.url, process.env.NEXT_PUBLIC_SITE_URL);
    const stripe = new Stripe(config.secretKey, {
      appInfo: { name: "BuildWithBooz", version: "0.1.0" },
    });
    const price = await stripe.prices.retrieve(config.priceId);

    if (!isAutomationAssessmentPrice(price)) {
      return returnToAssessment(request);
    }

    const session = await stripe.checkout.sessions.create(
      buildAssessmentCheckoutSession(config.priceId, siteOrigin),
    );

    if (!session.url) {
      return returnToAssessment(request);
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return returnToAssessment(request);
  }
}
