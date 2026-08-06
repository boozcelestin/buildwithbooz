import { describe, expect, it } from "vitest";

import {
  buildGapFinderAnswers,
  gapFinderQuestions,
  getGoalId,
} from "../../src/features/gap-finder/questions";
import { rankLeaks } from "../../src/features/gap-finder/ranking";
import { assembleResults } from "../../src/features/gap-finder/results";
import type { GoalId, LeakId } from "../../src/features/gap-finder/types";

const completeAnswers = [
  "more_booked_jobs",
  "hvac",
  "calls_slip_away",
  "voicemail_when_possible",
  "wait_for_callback",
  "office_person",
  "rarely",
];

describe("Gap Finder questions", () => {
  it("keeps the exact seven question flow", () => {
    expect(gapFinderQuestions).toHaveLength(7);
    expect(buildGapFinderAnswers(completeAnswers)).toHaveLength(7);
  });

  it("rejects incomplete and unknown answer sets", () => {
    expect(buildGapFinderAnswers(completeAnswers.slice(0, 6))).toBeNull();
    expect(buildGapFinderAnswers([...completeAnswers.slice(0, 6), "unknown"])).toBeNull();
  });
});

describe("Gap Finder ranking", () => {
  const cases: Array<{ optionIds: string[]; expectedTopLeak: LeakId }> = [
    {
      optionIds: [
        "more_booked_jobs",
        "plumbing",
        "not_enough_calls",
        "within_minutes",
        "follow_every_one",
        "office_person",
        "regularly",
      ],
      expectedTopLeak: "demand",
    },
    { optionIds: completeAnswers, expectedTopLeak: "lead_response" },
    {
      optionIds: [
        "more_from_existing_jobs",
        "electrical",
        "calls_slip_away",
        "within_minutes",
        "do_not_track",
        "office_person",
        "regularly",
      ],
      expectedTopLeak: "estimate_follow_up",
    },
    {
      optionIds: [
        "steadier_cash_flow",
        "roofing",
        "money_comes_slow",
        "within_minutes",
        "follow_every_one",
        "office_person",
        "regularly",
      ],
      expectedTopLeak: "cash_flow",
    },
    {
      optionIds: [
        "more_time_less_chaos",
        "general_contracting",
        "slammed_and_dropping",
        "same_day",
        "follow_some",
        "owner_mostly",
        "now_and_then",
      ],
      expectedTopLeak: "owner_dependency",
    },
    {
      optionIds: [
        "more_from_existing_jobs",
        "landscaping",
        "cannot_tell",
        "within_minutes",
        "follow_every_one",
        "office_person",
        "never_considered",
      ],
      expectedTopLeak: "past_customer_follow_up",
    },
  ];

  it.each(cases)("ranks $expectedTopLeak first for its strongest answer pattern", ({ optionIds, expectedTopLeak }) => {
    const goal = getGoalId(optionIds);
    expect(goal).not.toBeNull();
    expect(rankLeaks(goal as GoalId, optionIds)).toHaveLength(3);
    expect(rankLeaks(goal as GoalId, optionIds)[0]).toBe(expectedTopLeak);
  });

  it("uses a stable tie order", () => {
    const optionIds = [
      "room_to_grow",
      "other",
      "cannot_tell",
      "within_minutes",
      "follow_every_one",
      "office_person",
      "regularly",
    ];

    expect(rankLeaks("room_to_grow", optionIds)).toEqual([
      "owner_dependency",
      "lead_response",
      "estimate_follow_up",
    ]);
  });
});

describe("Gap Finder result blocks", () => {
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

  it("contains a block for every goal and leak pair", () => {
    for (const goal of goals) {
      expect(assembleResults(goal, leaks)).toHaveLength(6);
    }
  });

  it("resolves ranked blocks by goal and leak", () => {
    const results = assembleResults("more_booked_jobs", [
      "lead_response",
      "estimate_follow_up",
      "past_customer_follow_up",
    ]);

    expect(results.map((result) => result.block.title)).toEqual([
      "Lead response",
      "Estimate follow up",
      "Past customer follow up",
    ]);
    expect(results[0].block.body).toContain(
      "This is the leak that quietly costs the most for almost every shop.",
    );
  });
});
