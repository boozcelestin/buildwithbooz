import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalMutation, internalQuery, mutation } from "./_generated/server";

export const recordAssessmentOrder = mutation({
  args: {
    sessionId: v.string(),
    eventId: v.string(),
    email: v.string(),
    amount: v.number(),
  },
  handler: async (context, args) => {
    const existing = await context.db
      .query("assessmentOrders")
      .withIndex("by_stripe_session_id", (query) => query.eq("stripeSessionId", args.sessionId))
      .unique();

    if (existing) {
      return existing._id;
    }

    const orderId = await context.db.insert("assessmentOrders", {
      stripeSessionId: args.sessionId,
      stripeEventId: args.eventId,
      email: args.email,
      amount: args.amount,
      purchase: "automation_assessment",
      emailSentAt: null,
      emailStatus: "queued",
      emailAttempts: 0,
      createdAt: Date.now(),
    });

    await context.scheduler.runAfter(0, internal.assessmentEmail.sendAssessmentEmail, {
      orderId,
    });

    return orderId;
  },
});

export const getEmailPayload = internalQuery({
  args: { orderId: v.id("assessmentOrders") },
  handler: async (context, args) => {
    const order = await context.db.get(args.orderId);

    if (!order || order.emailStatus !== "queued" || order.emailSentAt !== null) {
      return null;
    }

    return {
      orderId: order._id,
      stripeSessionId: order.stripeSessionId,
      email: order.email,
    };
  },
});

export const markEmailSent = internalMutation({
  args: { orderId: v.id("assessmentOrders"), resendEmailId: v.string() },
  handler: async (context, args) => {
    const order = await context.db.get(args.orderId);

    if (!order || order.emailStatus !== "queued" || order.emailSentAt !== null) {
      return;
    }

    await context.db.patch(args.orderId, {
      emailStatus: "sent",
      emailSentAt: Date.now(),
      emailAttempts: order.emailAttempts + 1,
      emailLastError: undefined,
      resendEmailId: args.resendEmailId,
    });
  },
});

export const markEmailFailed = internalMutation({
  args: { orderId: v.id("assessmentOrders"), message: v.string() },
  handler: async (context, args) => {
    const order = await context.db.get(args.orderId);

    if (!order || order.emailStatus !== "queued" || order.emailSentAt !== null) {
      return;
    }

    const attempts = order.emailAttempts + 1;
    const shouldRetry = attempts < 3;

    await context.db.patch(args.orderId, {
      emailStatus: shouldRetry ? "queued" : "failed",
      emailAttempts: attempts,
      emailLastError: args.message.slice(0, 500),
    });

    if (shouldRetry) {
      await context.scheduler.runAfter(
        30_000 * 2 ** (attempts - 1),
        internal.assessmentEmail.sendAssessmentEmail,
        { orderId: args.orderId },
      );
    }
  },
});
