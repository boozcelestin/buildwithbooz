import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

import { api } from "@/convex/_generated/api";
import { buildGapFinderAnswers, getGoalId } from "@/src/features/gap-finder/questions";
import { rankLeaks } from "@/src/features/gap-finder/ranking";
import type { LeadSource } from "@/src/features/leads/types";
import { parseLeadSubmission } from "@/src/features/leads/validation";
import { getClientIp, verifyTurnstileToken } from "@/src/lib/turnstile";

function getLeadSource(
  formKind: "contact" | "enterprise",
  hasGapFinder: boolean,
  hasCalculator: boolean,
): LeadSource {
  if (formKind === "enterprise") {
    return "enterprise";
  }

  if (hasGapFinder) {
    return "gap_finder_handoff";
  }

  return hasCalculator ? "calculator_handoff" : "contact";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const rawBody = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const turnstileToken = typeof rawBody.turnstileToken === "string" ? rawBody.turnstileToken : "";
  const ip = getClientIp(request);

  if (!(await verifyTurnstileToken(turnstileToken, ip))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const submission = parseLeadSubmission(body);

  if (!submission) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const convexUrl = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const gapFinder = submission.context?.gapFinder;
  const calculator = submission.context?.calculator;

  try {
    const rate = await client.mutation(api.rateLimits.checkRateLimit, {
      ip,
      route: "/api/leads",
    });

    if (!rate.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    if (gapFinder) {
      const answers = buildGapFinderAnswers(gapFinder.optionIds);
      const goal = getGoalId(gapFinder.optionIds);

      if (!answers || !goal) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }

      await client.mutation(api.gapFinder.submitGapFinder, {
        completionToken: gapFinder.completionToken,
        answers,
        goal,
        rankedLeaks: rankLeaks(goal, gapFinder.optionIds),
        email: submission.email,
        ...(calculator ? { sourceContext: calculator } : {}),
      });
    }

    const leadId = await client.mutation(api.leads.submitLead, {
      submissionToken: submission.submissionToken,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      company: submission.company,
      businessType: submission.businessType,
      message: submission.message,
      source: getLeadSource(submission.formKind, Boolean(gapFinder), Boolean(calculator)),
      ...(gapFinder ? { gapFinderCompletionToken: gapFinder.completionToken } : {}),
      calculatorContext: calculator ?? null,
    });

    return NextResponse.json({ ok: true, leadId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
