import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

import { api } from "@/convex/_generated/api";
import { parseAssessmentIntake } from "@/src/features/assessment/validation";
import { getClientIp, verifyTurnstileToken } from "@/src/lib/turnstile";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const raw = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const turnstileToken = typeof raw.turnstileToken === "string" ? raw.turnstileToken : "";
  const ip = getClientIp(request);

  if (!(await verifyTurnstileToken(turnstileToken, ip))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const submission = parseAssessmentIntake(body);

  if (!submission) {
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
      route: "/api/assessment/intake",
    });

    if (!rate.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const intakeId = await client.mutation(api.assessmentIntake.submitAssessmentIntake, submission);
    return NextResponse.json({ ok: true, intakeId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
