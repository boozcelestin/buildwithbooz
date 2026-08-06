export type GoalId =
  | "more_booked_jobs"
  | "more_from_existing_jobs"
  | "more_time_less_chaos"
  | "steadier_cash_flow"
  | "room_to_grow";

export type LeakId =
  | "demand"
  | "lead_response"
  | "estimate_follow_up"
  | "cash_flow"
  | "owner_dependency"
  | "past_customer_follow_up";

export type GapFinderAnswer = {
  questionId: string;
  question: string;
  optionId: string;
  answer: string;
};

export type ResultBlock = {
  title: string;
  introduction: string;
  body: string;
  plan: string;
};

export type RankedResult = {
  leak: LeakId;
  block: ResultBlock;
};

export type GapFinderSourceContext = {
  calculator: string;
  calculatorResult?: string;
};
