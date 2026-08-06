import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  gapFinderCompletions: defineTable({
    completionToken: v.string(),
    answers: v.array(
      v.object({
        questionId: v.string(),
        question: v.string(),
        optionId: v.string(),
        answer: v.string(),
      }),
    ),
    goal: v.string(),
    rankedLeaks: v.array(v.string()),
    email: v.union(v.string(), v.null()),
    sourceContext: v.optional(
      v.object({
        calculator: v.string(),
        calculatorResult: v.optional(v.string()),
      }),
    ),
    emailDelivery: v.optional(
      v.object({
        status: v.union(v.literal("queued"), v.literal("sent"), v.literal("failed")),
        attempts: v.number(),
        queuedAt: v.number(),
        sentAt: v.optional(v.number()),
        resendEmailId: v.optional(v.string()),
        lastError: v.optional(v.string()),
      }),
    ),
    createdAt: v.number(),
  }).index("by_completion_token", ["completionToken"]),
  leads: defineTable({
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
    gapFinderCompletionId: v.union(v.id("gapFinderCompletions"), v.null()),
    calculatorContext: v.union(
      v.object({
        calculator: v.string(),
        calculatorResult: v.optional(v.string()),
      }),
      v.null(),
    ),
    createdAt: v.number(),
  })
    .index("by_submission_token", ["submissionToken"])
    .index("by_email", ["email"]),
  assessmentOrders: defineTable({
    stripeSessionId: v.string(),
    stripeEventId: v.string(),
    email: v.string(),
    amount: v.number(),
    purchase: v.string(),
    emailSentAt: v.union(v.number(), v.null()),
    emailStatus: v.union(v.literal("queued"), v.literal("sent"), v.literal("failed")),
    emailAttempts: v.number(),
    emailLastError: v.optional(v.string()),
    resendEmailId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_stripe_session_id", ["stripeSessionId"])
    .index("by_stripe_event_id", ["stripeEventId"]),
  assessmentIntake: defineTable({
    stripeSessionId: v.string(),
    orderId: v.id("assessmentOrders"),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_stripe_session_id", ["stripeSessionId"]),
  rateLimits: defineTable({
    ip: v.string(),
    route: v.string(),
    windowStart: v.number(),
    count: v.number(),
  }).index("by_ip_route_window", ["ip", "route", "windowStart"]),
});
