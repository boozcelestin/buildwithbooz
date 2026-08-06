import type { GoalId, LeakId } from "./types";

const leakPriority: LeakId[] = [
  "lead_response",
  "estimate_follow_up",
  "owner_dependency",
  "cash_flow",
  "past_customer_follow_up",
  "demand",
];

const goalWeights: Record<GoalId, Partial<Record<LeakId, number>>> = {
  more_booked_jobs: {
    demand: 2,
    lead_response: 2,
    estimate_follow_up: 1,
    past_customer_follow_up: 1,
  },
  more_from_existing_jobs: {
    estimate_follow_up: 3,
    past_customer_follow_up: 2,
    cash_flow: 1,
  },
  more_time_less_chaos: {
    owner_dependency: 4,
    lead_response: 1,
    estimate_follow_up: 1,
  },
  steadier_cash_flow: {
    cash_flow: 4,
    estimate_follow_up: 1,
    past_customer_follow_up: 1,
  },
  room_to_grow: {
    owner_dependency: 3,
    lead_response: 1,
    estimate_follow_up: 1,
  },
};

const answerWeights: Record<string, Partial<Record<LeakId, number>>> = {
  not_enough_calls: { demand: 7 },
  calls_slip_away: { lead_response: 7, estimate_follow_up: 2 },
  slammed_and_dropping: { owner_dependency: 7, lead_response: 1, estimate_follow_up: 1 },
  money_comes_slow: { cash_flow: 7 },
  cannot_tell: { owner_dependency: 2, cash_flow: 1 },
  within_minutes: {},
  same_day: { lead_response: 2 },
  next_day_or_two: { lead_response: 5 },
  voicemail_when_possible: { lead_response: 7 },
  follow_every_one: {},
  follow_some: { estimate_follow_up: 3 },
  wait_for_callback: { estimate_follow_up: 5 },
  do_not_track: { estimate_follow_up: 7 },
  owner_mostly: { owner_dependency: 5 },
  office_person: { owner_dependency: 1 },
  split_across_crew: { owner_dependency: 3 },
  nobody: { owner_dependency: 7 },
  regularly: {},
  now_and_then: { past_customer_follow_up: 2 },
  rarely: { past_customer_follow_up: 5 },
  never_considered: { past_customer_follow_up: 7 },
};

function addWeights(
  scores: Record<LeakId, number>,
  weights: Partial<Record<LeakId, number>> | undefined,
) {
  if (!weights) {
    return;
  }

  for (const leak of leakPriority) {
    scores[leak] += weights[leak] ?? 0;
  }
}

export function rankLeaks(goal: GoalId, optionIds: string[]): LeakId[] {
  const scores: Record<LeakId, number> = {
    demand: 0,
    lead_response: 0,
    estimate_follow_up: 0,
    cash_flow: 0,
    owner_dependency: 0,
    past_customer_follow_up: 0,
  };

  addWeights(scores, goalWeights[goal]);

  for (const optionId of optionIds) {
    addWeights(scores, answerWeights[optionId]);
  }

  return [...leakPriority]
    .sort((first, second) => scores[second] - scores[first])
    .slice(0, 3);
}
