export type CalculatorSlug =
  | "missed-call-revenue-calculator"
  | "lost-quote-calculator"
  | "slow-payment-calculator"
  | "customer-reactivation-calculator"
  | "job-margin-calculator"
  | "should-you-run-more-ads";

export type CalculatorInput = {
  id: string;
  label: string;
  defaultValue: number;
  prefix?: "$";
  suffix?: "%";
};

export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type ResultMessagePart = string | { value: string };

export type CalculatorResult = {
  big: string;
  tone?: "good" | "bad";
  side?: string;
  values: Record<string, string>;
  contextValue: string;
  verdict?: string;
};

export type CalculatorDefinition = {
  slug: CalculatorSlug;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  inputs: CalculatorInput[];
  button: string;
  message: ResultMessagePart[];
  insight: string;
  primaryCta: string;
  faqs: CalculatorFaq[];
  calculate: (values: Record<string, number>) => CalculatorResult | null;
};
