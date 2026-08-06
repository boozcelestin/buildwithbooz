import { getCalculatorDefinition } from "../calculators/definitions";
import { buildGapFinderAnswers } from "../gap-finder/questions";
import type { LeadContext, LeadFormKind, LeadSubmission } from "./types";

const tokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optionalText(value: unknown, maximumLength: number): string | null | undefined {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const text = value.trim();
  if (text.length > maximumLength) {
    return undefined;
  }

  return text || null;
}

function readContext(value: unknown): LeadContext | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const context: LeadContext = {};

  if (raw.gapFinder !== undefined) {
    if (!raw.gapFinder || typeof raw.gapFinder !== "object") {
      return null;
    }

    const gapFinder = raw.gapFinder as Record<string, unknown>;
    if (
      typeof gapFinder.completionToken !== "string" ||
      !tokenPattern.test(gapFinder.completionToken) ||
      !Array.isArray(gapFinder.optionIds) ||
      !gapFinder.optionIds.every((optionId) => typeof optionId === "string") ||
      !buildGapFinderAnswers(gapFinder.optionIds)
    ) {
      return null;
    }

    context.gapFinder = {
      completionToken: gapFinder.completionToken,
      optionIds: gapFinder.optionIds,
    };
  }

  if (raw.calculator !== undefined) {
    if (!raw.calculator || typeof raw.calculator !== "object") {
      return null;
    }

    const calculator = raw.calculator as Record<string, unknown>;
    if (
      typeof calculator.calculator !== "string" ||
      !getCalculatorDefinition(calculator.calculator) ||
      (calculator.calculatorResult !== undefined &&
        (typeof calculator.calculatorResult !== "string" ||
          calculator.calculatorResult.length > 100))
    ) {
      return null;
    }

    context.calculator = {
      calculator: calculator.calculator,
      ...(typeof calculator.calculatorResult === "string"
        ? { calculatorResult: calculator.calculatorResult }
        : {}),
    };
  }

  return context;
}

export function parseLeadSubmission(value: unknown): LeadSubmission | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;
  if (
    typeof raw.submissionToken !== "string" ||
    !tokenPattern.test(raw.submissionToken) ||
    (raw.formKind !== "contact" && raw.formKind !== "enterprise") ||
    typeof raw.email !== "string" ||
    typeof raw.message !== "string"
  ) {
    return null;
  }

  const formKind = raw.formKind as LeadFormKind;
  const email = raw.email.trim().toLowerCase();
  const message = raw.message.trim();
  const name = optionalText(raw.name, 200);
  const phone = optionalText(raw.phone, 100);
  const company = optionalText(raw.company, 200);
  const businessType = optionalText(raw.businessType, 100);
  const context = readContext(raw.context);

  if (
    email.length > 320 ||
    !emailPattern.test(email) ||
    message.length === 0 ||
    message.length > 5000 ||
    name === undefined ||
    phone === undefined ||
    company === undefined ||
    businessType === undefined ||
    context === null
  ) {
    return null;
  }

  return {
    submissionToken: raw.submissionToken,
    formKind,
    name,
    email,
    phone,
    company,
    businessType,
    message,
    ...(formKind === "contact" && context ? { context } : {}),
  };
}
