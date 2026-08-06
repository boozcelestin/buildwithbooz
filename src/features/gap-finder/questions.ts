import type { GapFinderAnswer, GoalId } from "./types";

export const gapFinderQuestions = [
  {
    id: "goal",
    label: "Goal",
    question: "A year from now, what would make this a better business to run?",
    options: [
      { id: "more_booked_jobs", label: "More booked jobs" },
      { id: "more_from_existing_jobs", label: "More money from the jobs I already get" },
      { id: "more_time_less_chaos", label: "More time and less chaos" },
      { id: "steadier_cash_flow", label: "Steadier cash flow" },
      { id: "room_to_grow", label: "Room to grow or hire" },
    ],
  },
  {
    id: "trade",
    label: "Trade",
    question: "What kind of work do you do?",
    options: [
      { id: "hvac", label: "HVAC" },
      { id: "plumbing", label: "Plumbing" },
      { id: "electrical", label: "Electrical" },
      { id: "roofing", label: "Roofing" },
      { id: "general_contracting", label: "General contracting" },
      { id: "landscaping", label: "Landscaping" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "stuck",
    label: "Stuck",
    question: "Where does it feel stuck right now?",
    options: [
      { id: "not_enough_calls", label: "Not enough calls coming in" },
      { id: "calls_slip_away", label: "Calls come in but too many slip away" },
      { id: "slammed_and_dropping", label: "We are slammed and things fall through the cracks" },
      { id: "money_comes_slow", label: "Work gets done but the money comes in slow" },
      { id: "cannot_tell", label: "I honestly cannot tell where it is going" },
    ],
  },
  {
    id: "lead_response",
    label: "Lead response",
    question: "When a call or message comes in and nobody is free, what usually happens?",
    options: [
      { id: "within_minutes", label: "We text or call back within minutes" },
      { id: "same_day", label: "Same day" },
      { id: "next_day_or_two", label: "Next day or two" },
      { id: "voicemail_when_possible", label: "It goes to voicemail and we get to it when we can" },
    ],
  },
  {
    id: "estimate_follow_up",
    label: "Estimate follow up",
    question: "After you send a quote and the customer goes quiet, what happens?",
    options: [
      { id: "follow_every_one", label: "We follow up every one until we get an answer" },
      { id: "follow_some", label: "We follow up some" },
      { id: "wait_for_callback", label: "We mostly wait for them to call back" },
      { id: "do_not_track", label: "We do not really track it" },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    question: "Day to day, who keeps the phone, the follow up, and the schedule from dropping?",
    options: [
      { id: "owner_mostly", label: "Me, the owner, mostly" },
      { id: "office_person", label: "One office person" },
      { id: "split_across_crew", label: "Split across the crew" },
      { id: "nobody", label: "Nobody really, it just happens" },
    ],
  },
  {
    id: "past_customers",
    label: "Past customers",
    question: "The customers you have already done good work for, how often do you reach back out?",
    options: [
      { id: "regularly", label: "Regularly" },
      { id: "now_and_then", label: "Now and then" },
      { id: "rarely", label: "Rarely" },
      { id: "never_considered", label: "Never really thought about it" },
    ],
  },
] as const;

export function buildGapFinderAnswers(optionIds: string[]): GapFinderAnswer[] | null {
  if (optionIds.length !== gapFinderQuestions.length) {
    return null;
  }

  const answers: GapFinderAnswer[] = [];

  for (const [index, question] of gapFinderQuestions.entries()) {
    const option = question.options.find((candidate) => candidate.id === optionIds[index]);

    if (!option) {
      return null;
    }

    answers.push({
      questionId: question.id,
      question: question.question,
      optionId: option.id,
      answer: option.label,
    });
  }

  return answers;
}

export function getGoalId(optionIds: string[]): GoalId | null {
  const goal = gapFinderQuestions[0].options.find((option) => option.id === optionIds[0]);
  return goal ? goal.id : null;
}

export function getAnswerLabel(questionIndex: number, optionId: string): string | null {
  const question = gapFinderQuestions[questionIndex];
  return question?.options.find((option) => option.id === optionId)?.label ?? null;
}
