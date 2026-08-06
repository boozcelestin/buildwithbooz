import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

import { api } from "@/convex/_generated/api";
import { getCalculatorDefinition } from "@/src/features/calculators/definitions";
import { buildGapFinderAnswers, getGoalId } from "@/src/features/gap-finder/questions";
import { rankLeaks } from "@/src/features/gap-finder/ranking";
import type { GapFinderSourceContext } from "@/src/features/gap-finder/types";
import { getClientIp, verifyTurnstileToken } from "@/src/lib/turnstile";

const completionTokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionBody = {
  completionToken?: unknown;
  optionIds?: unknown;
  email?: unknown;
  sourceContext?: unknown;
  turnstileToken?: unknown;
};

function readSourceContext(value: unknown): GapFinderSourceContext | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const context = value as Record<string, unknown>;
  if (
    typeof context.calculator !== "string" ||
    !getCalculatorDefinition(context.calculator) ||
    context.calculator.length > 100 ||
    (context.calculatorResult !== undefined && typeof context.calculatorResult !== "string") ||
    (typeof context.calculatorResult === "string" && context.calculatorResult.length > 100)
  ) {
    return null;
  }

  return {
    calculator: context.calculator,
    ...(typeof context.calculatorResult === "string"
      ? { calculatorResult: context.calculatorResult }
      : {}),
  };
}

export async function POST(request: Request) {
  let body: SubmissionBody;

  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const ip = getClientIp(request);

  if (!(await verifyTurnstileToken(turnstileToken, ip))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (
    typeof body.completionToken !== "string" ||
    !completionTokenPattern.test(body.completionToken) ||
    !Array.isArray(body.optionIds) ||
    !body.optionIds.every((optionId) => typeof optionId === "string") ||
    (body.email !== null && body.email !== undefined && typeof body.email !== "string")
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
  const sourceContext = readSourceContext(body.sourceContext);

  if (
    sourceContext === null ||
    (email !== null && (email.length > 320 || !emailPattern.test(email)))
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const answers = buildGapFinderAnswers(body.optionIds);
  const goal = getGoalId(body.optionIds);

  if (!answers || !goal) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const convexUrl = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const client = new ConvexHttpClient(convexUrl);

  try {
    const rate = await client.mutation(api.rateLimits.checkRateLimit, {
      ip,
      route: "/api/gap-finder",
    });

    if (!rate.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const completionId = await client.mutation(api.gapFinder.submitGapFinder, {
      completionToken: body.completionToken,
      answers,
      goal,
      rankedLeaks: rankLeaks(goal, body.optionIds),
      email,
      ...(sourceContext ? { sourceContext } : {}),
    });

    return NextResponse.json({ ok: true, completionId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
