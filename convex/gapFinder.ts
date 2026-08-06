import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalMutation, internalQuery, mutation } from "./_generated/server";

const maxEmailAttempts = 3;

function emailDeliveryQueued() {
  return {
    status: "queued" as const,
    attempts: 0,
    queuedAt: Date.now(),
  };
}

export const submitGapFinder = mutation({
  args: {
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
  },
  handler: async (context, args) => {
    const existing = await context.db
      .query("gapFinderCompletions")
      .withIndex("by_completion_token", (query) => query.eq("completionToken", args.completionToken))
      .unique();

    if (existing) {
      const shouldQueueEmail = args.email !== null && existing.emailDelivery === undefined;

      if (
        (args.email !== null && args.email !== existing.email) ||
        (args.sourceContext !== undefined && existing.sourceContext === undefined) ||
        shouldQueueEmail
      ) {
        await context.db.patch(existing._id, {
          ...(args.email !== null ? { email: args.email } : {}),
          ...(args.sourceContext ? { sourceContext: args.sourceContext } : {}),
          ...(shouldQueueEmail ? { emailDelivery: emailDeliveryQueued() } : {}),
        });
      }

      if (shouldQueueEmail) {
        await context.scheduler.runAfter(0, internal.gapFinderEmail.sendGapFinderEmail, {
          completionId: existing._id,
        });
      }

      return existing._id;
    }

    const completionId = await context.db.insert("gapFinderCompletions", {
      ...args,
      ...(args.email !== null ? { emailDelivery: emailDeliveryQueued() } : {}),
      createdAt: Date.now(),
    });

    if (args.email !== null) {
      await context.scheduler.runAfter(0, internal.gapFinderEmail.sendGapFinderEmail, {
        completionId,
      });
    }

    return completionId;
  },
});

export const getEmailPayload = internalQuery({
  args: { completionId: v.id("gapFinderCompletions") },
  handler: async (context, args) => {
    const completion = await context.db.get(args.completionId);

    if (
      !completion ||
      completion.email === null ||
      completion.emailDelivery?.status !== "queued"
    ) {
      return null;
    }

    return {
      completionToken: completion.completionToken,
      email: completion.email,
      goal: completion.goal,
      rankedLeaks: completion.rankedLeaks,
    };
  },
});

export const markEmailSent = internalMutation({
  args: {
    completionId: v.id("gapFinderCompletions"),
    resendEmailId: v.string(),
  },
  handler: async (context, args) => {
    const completion = await context.db.get(args.completionId);

    if (!completion || completion.emailDelivery?.status !== "queued") {
      return;
    }

    await context.db.patch(args.completionId, {
      emailDelivery: {
        status: "sent",
        attempts: completion.emailDelivery.attempts + 1,
        queuedAt: completion.emailDelivery.queuedAt,
        sentAt: Date.now(),
        resendEmailId: args.resendEmailId,
      },
    });
  },
});

export const markEmailFailed = internalMutation({
  args: {
    completionId: v.id("gapFinderCompletions"),
    message: v.string(),
  },
  handler: async (context, args) => {
    const completion = await context.db.get(args.completionId);

    if (!completion || completion.emailDelivery?.status !== "queued") {
      return;
    }

    const attempts = completion.emailDelivery.attempts + 1;
    const shouldRetry = attempts < maxEmailAttempts;

    await context.db.patch(args.completionId, {
      emailDelivery: {
        status: shouldRetry ? "queued" : "failed",
        attempts,
        queuedAt: completion.emailDelivery.queuedAt,
        lastError: args.message.slice(0, 500),
      },
    });

    if (shouldRetry) {
      const retryDelay = 30_000 * 2 ** (attempts - 1);
      await context.scheduler.runAfter(retryDelay, internal.gapFinderEmail.sendGapFinderEmail, {
        completionId: args.completionId,
      });
    }
  },
});
