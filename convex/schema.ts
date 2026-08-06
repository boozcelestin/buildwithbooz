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
});
