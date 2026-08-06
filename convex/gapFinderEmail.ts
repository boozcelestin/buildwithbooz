"use node";

import { v } from "convex/values";
import { Resend } from "resend";

import { buildGapFinderEmail } from "../src/features/gap-finder/email";
import type { GoalId, LeakId } from "../src/features/gap-finder/types";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const goalIds = new Set<GoalId>([
  "more_booked_jobs",
  "more_from_existing_jobs",
  "more_time_less_chaos",
  "steadier_cash_flow",
  "room_to_grow",
]);
const leakIds = new Set<LeakId>([
  "demand",
  "lead_response",
  "estimate_follow_up",
  "cash_flow",
  "owner_dependency",
  "past_customer_follow_up",
]);

function isGoalId(value: string): value is GoalId {
  return goalIds.has(value as GoalId);
}

function areLeakIds(values: string[]): values is LeakId[] {
  return values.length > 0 && values.every((value) => leakIds.has(value as LeakId));
}

function readRequiredEnvironmentValue(name: "RESEND_API_KEY" | "RESEND_FROM_EMAIL") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured in the Convex environment.`);
  }

  return value;
}

function assessmentUrl() {
  const siteUrl = (process.env.SITE_URL ?? "https://buildwithbooz.com").replace(/\/+$/, "");
  return `${siteUrl}/services`;
}

export const sendGapFinderEmail = internalAction({
  args: { completionId: v.id("gapFinderCompletions") },
  handler: async (context, args): Promise<void> => {
    try {
      const payload = await context.runQuery(internal.gapFinder.getEmailPayload, {
        completionId: args.completionId,
      });

      if (!payload) {
        return;
      }

      if (!isGoalId(payload.goal) || !areLeakIds(payload.rankedLeaks)) {
        throw new Error("Stored Gap Finder result cannot be assembled for email.");
      }

      const resend = new Resend(readRequiredEnvironmentValue("RESEND_API_KEY"));
      const content = buildGapFinderEmail({
        goal: payload.goal,
        rankedLeaks: payload.rankedLeaks,
        assessmentUrl: assessmentUrl(),
      });
      const { data, error } = await resend.emails.send(
        {
          from: readRequiredEnvironmentValue("RESEND_FROM_EMAIL"),
          to: payload.email,
          subject: content.subject,
          html: content.html,
          text: content.text,
        },
        { idempotencyKey: `gap-finder-${payload.completionToken}` },
      );

      if (error || !data) {
        throw new Error(error?.message ?? "Resend did not return an email identifier.");
      }

      await context.runMutation(internal.gapFinder.markEmailSent, {
        completionId: args.completionId,
        resendEmailId: data.id,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gap Finder email delivery failed.";

      await context.runMutation(internal.gapFinder.markEmailFailed, {
        completionId: args.completionId,
        message,
      });
    }
  },
});
