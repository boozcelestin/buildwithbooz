import { getCalculatorDefinition } from "../calculators/definitions";
import { buildGapFinderAnswers } from "../gap-finder/questions";
import type { LeadContext } from "./types";

const completionTokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ContactSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function readContactContext(query: ContactSearchParams): LeadContext | undefined {
  const context: LeadContext = {};
  const completionToken = first(query.gapFinderCompletion);
  const answers = first(query.answers);

  if (completionToken && completionTokenPattern.test(completionToken) && answers) {
    const optionIds = answers.split(",");
    if (buildGapFinderAnswers(optionIds)) {
      context.gapFinder = { completionToken, optionIds };
    }
  }

  const calculatorSlug = first(query.calculator);
  const calculatorResult = first(query.calculatorResult);
  const calculator = calculatorSlug ? getCalculatorDefinition(calculatorSlug) : null;

  if (calculator) {
    context.calculator = {
      calculator: calculator.slug,
      ...(calculatorResult ? { calculatorResult: calculatorResult.slice(0, 100) } : {}),
    };
  }

  return context.gapFinder || context.calculator ? context : undefined;
}
