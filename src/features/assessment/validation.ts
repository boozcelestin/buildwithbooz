const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sessionPattern = /^cs_[A-Za-z0-9_]+$/;

type IntakeFields = {
  name: string;
  email: string;
  trade: string;
  businessName: string | null;
  website: string | null;
  phone: string | null;
  monthlyLeads: string | null;
  averageJobValue: string | null;
  leadSources: string | null;
  busyCallHandling: string | null;
  quoteFollowUp: string | null;
  currentTools: string | null;
  biggestOpportunity: string | null;
  anythingElse: string | null;
};

export type AssessmentIntakeSubmission = IntakeFields & { sessionId: string };

function requiredText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const text = value.trim();
  return text.length > 0 && text.length <= maxLength ? text : null;
}

function optionalText(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const text = value.trim();
  return text.length <= maxLength ? text || null : undefined;
}

export function parseAssessmentIntake(value: unknown): AssessmentIntakeSubmission | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const sessionId = requiredText(raw.sessionId, 200);
  const name = requiredText(raw.name, 200);
  const email = requiredText(raw.email, 320)?.toLowerCase() ?? null;
  const trade = requiredText(raw.trade, 200);
  const businessName = optionalText(raw.businessName, 200);
  const website = optionalText(raw.website, 500);
  const phone = optionalText(raw.phone, 100);
  const monthlyLeads = optionalText(raw.monthlyLeads, 500);
  const averageJobValue = optionalText(raw.averageJobValue, 500);
  const leadSources = optionalText(raw.leadSources, 2000);
  const busyCallHandling = optionalText(raw.busyCallHandling, 2000);
  const quoteFollowUp = optionalText(raw.quoteFollowUp, 2000);
  const currentTools = optionalText(raw.currentTools, 2000);
  const biggestOpportunity = optionalText(raw.biggestOpportunity, 3000);
  const anythingElse = optionalText(raw.anythingElse, 5000);

  if (
    !sessionId ||
    !sessionPattern.test(sessionId) ||
    !name ||
    !email ||
    !emailPattern.test(email) ||
    !trade ||
    website === undefined ||
    businessName === undefined ||
    phone === undefined ||
    monthlyLeads === undefined ||
    averageJobValue === undefined ||
    leadSources === undefined ||
    busyCallHandling === undefined ||
    quoteFollowUp === undefined ||
    currentTools === undefined ||
    biggestOpportunity === undefined ||
    anythingElse === undefined
  ) {
    return null;
  }

  return {
    sessionId,
    name,
    email,
    trade,
    businessName,
    website,
    phone,
    monthlyLeads,
    averageJobValue,
    leadSources,
    busyCallHandling,
    quoteFollowUp,
    currentTools,
    biggestOpportunity,
    anythingElse,
  };
}
