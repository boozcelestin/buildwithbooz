import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const submitLead = mutation({
  args: {
    submissionToken: v.string(),
    name: v.union(v.string(), v.null()),
    email: v.string(),
    phone: v.union(v.string(), v.null()),
    company: v.union(v.string(), v.null()),
    businessType: v.union(v.string(), v.null()),
    message: v.string(),
    source: v.union(
      v.literal("contact"),
      v.literal("gap_finder_handoff"),
      v.literal("calculator_handoff"),
      v.literal("enterprise"),
    ),
    gapFinderCompletionToken: v.optional(v.string()),
    calculatorContext: v.union(
      v.object({
        calculator: v.string(),
        calculatorResult: v.optional(v.string()),
      }),
      v.null(),
    ),
  },
  handler: async (context, args) => {
    const existing = await context.db
      .query("leads")
      .withIndex("by_submission_token", (query) =>
        query.eq("submissionToken", args.submissionToken),
      )
      .unique();

    if (existing) {
      return existing._id;
    }

    const gapFinderCompletionToken = args.gapFinderCompletionToken;
    const gapFinderCompletion = gapFinderCompletionToken
      ? await context.db
          .query("gapFinderCompletions")
          .withIndex("by_completion_token", (query) =>
            query.eq("completionToken", gapFinderCompletionToken),
          )
          .unique()
      : null;

    return context.db.insert("leads", {
      submissionToken: args.submissionToken,
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      businessType: args.businessType,
      message: args.message,
      source: args.source,
      gapFinderCompletionId: gapFinderCompletion?._id ?? null,
      calculatorContext: args.calculatorContext,
      createdAt: Date.now(),
    });
  },
});
