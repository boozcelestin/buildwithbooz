import { NextResponse } from "next/server";
import Stripe from "stripe";

import {
  buildAssessmentCheckoutSession,
  buildOperationsBlueprintCheckoutSession,
  isOperationsBlueprintPrice,
  isAutomationAssessmentPrice,
  readAssessmentCheckoutConfig,
  readBlueprintCheckoutConfig,
  resolveSiteOrigin,
} from "@/src/features/stripe/checkout";

export const runtime = "nodejs";

function returnToProduct(request: Request, product: "assessment" | "blueprint") {
  return NextResponse.redirect(
    new URL(product === "blueprint" ? "/operations-blueprint" : "/assessment", request.url),
    303,
  );
}

export async function POST(request: Request) {
  let product: "assessment" | "blueprint" = "assessment";
  try {
    const formData = await request.formData();
    if (formData.get("product") === "operations_blueprint") {
      product = "blueprint";
    }
  } catch {
    // Assessment checkout forms do not need a request body.
  }

  const config =
    product === "blueprint"
      ? readBlueprintCheckoutConfig({
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
          STRIPE_PRICE_ID_BLUEPRINT: process.env.STRIPE_PRICE_ID_BLUEPRINT,
        })
      : readAssessmentCheckoutConfig({
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
          STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
        });

  if (!config) {
    return returnToProduct(request, product);
  }

  try {
    const siteOrigin = resolveSiteOrigin(request.url, process.env.NEXT_PUBLIC_SITE_URL);
    const stripe = new Stripe(config.secretKey, {
      appInfo: { name: "BuildWithBooz", version: "0.1.0" },
    });
    const price = await stripe.prices.retrieve(config.priceId);

    const validPrice =
      product === "blueprint" ? isOperationsBlueprintPrice(price) : isAutomationAssessmentPrice(price);
    if (!validPrice) {
      return returnToProduct(request, product);
    }

    const session = await stripe.checkout.sessions.create(
      product === "blueprint"
        ? buildOperationsBlueprintCheckoutSession(config.priceId, siteOrigin)
        : buildAssessmentCheckoutSession(config.priceId, siteOrigin),
    );

    if (!session.url) {
      return returnToProduct(request, product);
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return returnToProduct(request, product);
  }
}
