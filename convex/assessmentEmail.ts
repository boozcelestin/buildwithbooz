"use node";

import { v } from "convex/values";
import { Resend } from "resend";

import { buildAssessmentEmail } from "../src/features/assessment/email";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

function readRequiredEnvironmentValue(name: "RESEND_API_KEY" | "RESEND_FROM_EMAIL") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured in the Convex environment.`);
  }

  return value;
}

export const sendAssessmentEmail = internalAction({
  args: { orderId: v.id("assessmentOrders") },
  handler: async (context, args): Promise<void> => {
    try {
      const payload = await context.runQuery(internal.assessmentOrders.getEmailPayload, {
        orderId: args.orderId,
      });

      if (!payload) {
        return;
      }

      const resend = new Resend(readRequiredEnvironmentValue("RESEND_API_KEY"));
      const content = buildAssessmentEmail({ sessionId: payload.stripeSessionId });
      const { data, error } = await resend.emails.send(
        {
          from: readRequiredEnvironmentValue("RESEND_FROM_EMAIL"),
          to: payload.email,
          subject: content.subject,
          html: content.html,
          text: content.text,
        },
        { idempotencyKey: `assessment-${payload.stripeSessionId}` },
      );

      if (error || !data) {
        throw new Error(error?.message ?? "Resend did not return an email identifier.");
      }

      await context.runMutation(internal.assessmentOrders.markEmailSent, {
        orderId: args.orderId,
        resendEmailId: data.id,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Assessment email delivery failed.";

      await context.runMutation(internal.assessmentOrders.markEmailFailed, {
        orderId: args.orderId,
        message,
      });
    }
  },
});
