import { describe, expect, it } from "vitest";

import { buildGapFinderEmail } from "../../src/features/gap-finder/email";
import type { GoalId, LeakId } from "../../src/features/gap-finder/types";

const goals: GoalId[] = [
  "more_booked_jobs",
  "more_from_existing_jobs",
  "more_time_less_chaos",
  "steadier_cash_flow",
  "room_to_grow",
];
const leaks: LeakId[] = [
  "demand",
  "lead_response",
  "estimate_follow_up",
  "cash_flow",
  "owner_dependency",
  "past_customer_follow_up",
];

describe("Gap Finder email", () => {
  const content = buildGapFinderEmail({
    goal: "more_booked_jobs",
    rankedLeaks: ["lead_response", "estimate_follow_up", "past_customer_follow_up"],
    assessmentUrl: "https://buildwithbooz.com/services",
  });

  it("assembles the ranked result and top leak plan from the result block kit", () => {
    expect(content.html).toContain("Lead response");
    expect(content.html).toContain("Estimate follow up");
    expect(content.html).toContain("Past customer follow up");
    expect(content.text).toContain(
      "Put something between the missed call and the lost job.",
    );
  });

  it("includes the email copy and the assessment call to action", () => {
    expect(content.text).toContain(
      "Thanks for running the Gap Finder. Below is the read from your seven answers, your most likely leak, why it matters, and a simple first step.",
    );
    expect(content.text).toContain(
      "When you are ready to go past the read, the Automation Assessment is the next step.",
    );
    expect(content.text).toContain("The $1,000 Automation Assessment");
    expect(content.text).toContain("Start the assessment");
    expect(content.html).toContain('href="https://buildwithbooz.com/services"');
  });

  it("keeps dash characters out of visible plain text copy", () => {
    for (const goal of goals) {
      for (const leak of leaks) {
        const result = buildGapFinderEmail({
          goal,
          rankedLeaks: [leak],
          assessmentUrl: "https://buildwithbooz.com/services",
        });

        expect(result.text).not.toMatch(/[-–—]/);
      }
    }
  });

  it("escapes the assessment URL before placing it in HTML", () => {
    const unsafe = buildGapFinderEmail({
      goal: "room_to_grow",
      rankedLeaks: ["owner_dependency"],
      assessmentUrl: 'https://example.com/" onclick="alert(1)',
    });

    expect(unsafe.html).not.toContain('href="https://example.com/" onclick=');
    expect(unsafe.html).toContain("&quot; onclick=&quot;");
  });
});
