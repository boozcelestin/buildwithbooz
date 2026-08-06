import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const submitAssessmentIntake = mutation({
  args: {
    sessionId: v.string(),
    name: v.string(),
    email: v.string(),
    trade: v.string(),
    businessName: v.union(v.string(), v.null()),
    website: v.union(v.string(), v.null()),
    phone: v.union(v.string(), v.null()),
    monthlyLeads: v.union(v.string(), v.null()),
    averageJobValue: v.union(v.string(), v.null()),
    leadSources: v.union(v.string(), v.null()),
    busyCallHandling: v.union(v.string(), v.null()),
    quoteFollowUp: v.union(v.string(), v.null()),
    currentTools: v.union(v.string(), v.null()),
    biggestOpportunity: v.union(v.string(), v.null()),
    anythingElse: v.union(v.string(), v.null()),
  },
  handler: async (context, args) => {
    const order = await context.db
      .query("assessmentOrders")
      .withIndex("by_stripe_session_id", (query) => query.eq("stripeSessionId", args.sessionId))
      .unique();

    if (!order || order.email !== args.email) {
      throw new Error("Assessment order could not be found.");
    }

    const now = Date.now();
    const existing = await context.db
      .query("assessmentIntake")
      .withIndex("by_stripe_session_id", (query) => query.eq("stripeSessionId", args.sessionId))
      .unique();

    if (existing) {
      await context.db.patch(existing._id, {
        orderId: order._id,
        name: args.name,
        email: args.email,
        trade: args.trade,
        businessName: args.businessName,
        website: args.website,
        phone: args.phone,
        monthlyLeads: args.monthlyLeads,
        averageJobValue: args.averageJobValue,
        leadSources: args.leadSources,
        busyCallHandling: args.busyCallHandling,
        quoteFollowUp: args.quoteFollowUp,
        currentTools: args.currentTools,
        biggestOpportunity: args.biggestOpportunity,
        anythingElse: args.anythingElse,
        updatedAt: now,
      });
      return existing._id;
    }

    return context.db.insert("assessmentIntake", {
      stripeSessionId: args.sessionId,
      orderId: order._id,
      name: args.name,
      email: args.email,
      trade: args.trade,
      businessName: args.businessName,
      website: args.website,
      phone: args.phone,
      monthlyLeads: args.monthlyLeads,
      averageJobValue: args.averageJobValue,
      leadSources: args.leadSources,
      busyCallHandling: args.busyCallHandling,
      quoteFollowUp: args.quoteFollowUp,
      currentTools: args.currentTools,
      biggestOpportunity: args.biggestOpportunity,
      anythingElse: args.anythingElse,
      createdAt: now,
      updatedAt: now,
    });
  },
});
