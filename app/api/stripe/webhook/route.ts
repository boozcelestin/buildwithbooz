import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      appInfo: { name: "BuildWithBooz", version: "0.1.0" },
    });
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_details?.email ?? session.customer_email;

  if (
    session.payment_status !== "paid" ||
    session.metadata?.purchase !== "automation_assessment" ||
    !session.id ||
    !email ||
    typeof session.amount_total !== "number"
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const convexUrl = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const client = new ConvexHttpClient(convexUrl);
    await client.mutation(api.assessmentOrders.recordAssessmentOrder, {
      sessionId: session.id,
      eventId: event.id,
      email: email.trim().toLowerCase(),
      amount: session.amount_total,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
