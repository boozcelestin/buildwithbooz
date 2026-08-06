import { describe, expect, it } from "vitest";

import { readContactContext } from "../../src/features/leads/contact-context";
import { parseLeadSubmission } from "../../src/features/leads/validation";

const submissionToken = "123e4567-e89b-42d3-a456-426614174000";
const completionToken = "223e4567-e89b-42d3-a456-426614174000";
const optionIds = [
  "more_booked_jobs",
  "hvac",
  "calls_slip_away",
  "voicemail_when_possible",
  "wait_for_callback",
  "office_person",
  "rarely",
];

const contactSubmission = {
  submissionToken,
  formKind: "contact",
  name: "  Booz  ",
  email: "  BOOZ@example.com  ",
  phone: "  (305) 555 0100  ",
  company: "",
  businessType: "HVAC",
  message: "  Calls keep slipping away.  ",
};

describe("lead submission validation", () => {
  it("normalizes a valid contact submission", () => {
    expect(parseLeadSubmission(contactSubmission)).toMatchObject({
      submissionToken,
      formKind: "contact",
      name: "Booz",
      email: "booz@example.com",
      phone: "(305) 555 0100",
      company: null,
      businessType: "HVAC",
      message: "Calls keep slipping away.",
    });
  });

  it("accepts a validated Gap Finder and calculator handoff", () => {
    const parsed = parseLeadSubmission({
      ...contactSubmission,
      context: {
        gapFinder: { completionToken, optionIds },
        calculator: {
          calculator: "missed-call-revenue-calculator",
          calculatorResult: "7740",
        },
      },
    });

    expect(parsed?.context).toEqual({
      gapFinder: { completionToken, optionIds },
      calculator: {
        calculator: "missed-call-revenue-calculator",
        calculatorResult: "7740",
      },
    });
  });

  it("does not attach handoff context to enterprise submissions", () => {
    const parsed = parseLeadSubmission({
      ...contactSubmission,
      formKind: "enterprise",
      context: {
        calculator: {
          calculator: "missed-call-revenue-calculator",
          calculatorResult: "7740",
        },
      },
    });

    expect(parsed?.context).toBeUndefined();
  });

  it("rejects missing reply details or a missing message", () => {
    expect(parseLeadSubmission({ ...contactSubmission, email: "not an email" })).toBeNull();
    expect(parseLeadSubmission({ ...contactSubmission, message: "  " })).toBeNull();
  });

  it("rejects altered handoff context", () => {
    expect(
      parseLeadSubmission({
        ...contactSubmission,
        context: { gapFinder: { completionToken, optionIds: [...optionIds.slice(0, 6), "bad"] } },
      }),
    ).toBeNull();
    expect(
      parseLeadSubmission({
        ...contactSubmission,
        context: { calculator: { calculator: "unknown", calculatorResult: "1" } },
      }),
    ).toBeNull();
  });
});

describe("contact route context", () => {
  it("rebuilds valid handoff context from the URL", () => {
    expect(
      readContactContext({
        gapFinderCompletion: completionToken,
        answers: optionIds.join(","),
        calculator: "missed-call-revenue-calculator",
        calculatorResult: "7740",
      }),
    ).toEqual({
      gapFinder: { completionToken, optionIds },
      calculator: {
        calculator: "missed-call-revenue-calculator",
        calculatorResult: "7740",
      },
    });
  });

  it("drops invalid route context", () => {
    expect(readContactContext({ gapFinderCompletion: "bad", answers: optionIds.join(",") })).toBeUndefined();
  });
});
