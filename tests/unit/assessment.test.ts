import { describe, expect, it } from "vitest";

import { buildAssessmentEmail } from "../../src/features/assessment/email";
import { parseAssessmentIntake } from "../../src/features/assessment/validation";

const validIntake = {
  sessionId: "cs_test_123",
  name: "Booz Celestin",
  email: "BOOZ@example.com",
  trade: "HVAC",
  businessName: "BuildWithBooz",
  website: "https://buildwithbooz.com",
  phone: "3055550100",
  monthlyLeads: "40",
  averageJobValue: "500",
  leadSources: "Calls and referrals",
  busyCallHandling: "Voicemail",
  quoteFollowUp: "By hand",
  currentTools: "CRM",
  biggestOpportunity: "Missed calls",
  anythingElse: "Nothing else",
};

describe("assessment intake validation", () => {
  it("accepts the required fields and preserves optional answers", () => {
    expect(parseAssessmentIntake(validIntake)).toEqual({
      ...validIntake,
      email: "booz@example.com",
    });
  });

  it("requires name, email, trade, and a checkout session", () => {
    expect(parseAssessmentIntake({ ...validIntake, name: "" })).toBeNull();
    expect(parseAssessmentIntake({ ...validIntake, email: "not an email" })).toBeNull();
    expect(parseAssessmentIntake({ ...validIntake, trade: "" })).toBeNull();
    expect(parseAssessmentIntake({ ...validIntake, sessionId: "bad" })).toBeNull();
  });
});

describe("assessment email", () => {
  it("uses the approved subject, body, and intake link", () => {
    const email = buildAssessmentEmail({ sessionId: "cs_test_123" });

    expect(email.subject).toBe("Your Automation Assessment is underway");
    expect(email.text).toContain("Hi there,");
    expect(email.text).toContain(
      "Fill out your intake\nhttps://buildwithbooz.com/assessment/thank-you?session_id=cs_test_123",
    );
    expect(email.html).toContain("Fill out your intake");
  });
});
