export type LeadFormKind = "contact" | "enterprise";

export type LeadSource =
  | "contact"
  | "gap_finder_handoff"
  | "calculator_handoff"
  | "enterprise";

export type LeadContext = {
  gapFinder?: {
    completionToken: string;
    optionIds: string[];
  };
  calculator?: {
    calculator: string;
    calculatorResult?: string;
  };
};

export type LeadSubmission = {
  submissionToken: string;
  formKind: LeadFormKind;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  businessType: string | null;
  message: string;
  context?: LeadContext;
};
