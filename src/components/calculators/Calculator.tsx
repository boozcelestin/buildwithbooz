"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import posthog from "posthog-js";

import { calculatorDefinitions } from "@/src/features/calculators/definitions";
import type {
  CalculatorResult,
  CalculatorSlug,
  ResultMessagePart,
} from "@/src/features/calculators/types";

type CalculatorProps = {
  slug: CalculatorSlug;
};

function initialValues(slug: CalculatorSlug) {
  return Object.fromEntries(
    calculatorDefinitions[slug].inputs.map((input) => [input.id, String(input.defaultValue)]),
  );
}

function numericValues(values: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      const parsed = Number.parseFloat(value);
      return [key, Number.isNaN(parsed) ? 0 : parsed];
    }),
  );
}

function resultMessage(parts: ResultMessagePart[], result: CalculatorResult) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <strong key={`${part.value}-${index}`}>{result.values[part.value]}</strong>
    ),
  );
}

function contextHref(path: "/gap-finder" | "/contact", slug: CalculatorSlug, result: CalculatorResult | null) {
  const params = new URLSearchParams({
    source: "calculator",
    calculator: slug,
  });

  if (result) {
    params.set("calculatorResult", result.contextValue);
  }

  return `${path}?${params.toString()}`;
}

export function Calculator({ slug }: CalculatorProps) {
  const definition = calculatorDefinitions[slug];
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(slug));
  const [result, setResult] = useState<CalculatorResult | null>(() =>
    definition.calculate(numericValues(initialValues(slug))),
  );

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    posthog.capture("calculator_calculated", { calculator: slug });
    setResult(definition.calculate(numericValues(values)));
  }

  return (
    <div className="tool-wrap">
      <p className="eyebrow">Free Tool</p>
      <h1 className="page-h1">{definition.title}</h1>
      <p className="page-sub">{definition.subtitle}</p>

      <form className="tool-card" onSubmit={calculate}>
        <div className="tool-fields">
          {definition.inputs.map((input) => (
            <div className="tool-field" key={input.id}>
              <label htmlFor={input.id}>{input.label}</label>
              <div className="tool-igroup">
                {input.prefix ? (
                  <span className="tool-affix" aria-hidden="true">
                    {input.prefix}
                  </span>
                ) : null}
                <input
                  className={input.suffix ? "has-suffix" : undefined}
                  id={input.id}
                  inputMode="decimal"
                  min="0"
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [input.id]: event.target.value }))
                  }
                  step="any"
                  type="number"
                  value={values[input.id]}
                />
                {input.suffix ? (
                  <span className="tool-affix suffix" aria-hidden="true">
                    {input.suffix}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-lg btn-block btn-wrap tool-calc-button" type="submit">
          {definition.button}
        </button>
      </form>

      <div className="tool-result-card dark-zone" aria-live="polite">
        {result ? (
          <div>
            <p className={`tool-result-big${result.tone ? ` ${result.tone}` : ""}`}>
              {result.big}
              {result.side ? <span className="tool-result-side">{result.side}</span> : null}
            </p>
            <p className="tool-result-message">{resultMessage(definition.message, result)}</p>
            {result.verdict ? <p className="tool-verdict">{result.verdict}</p> : null}
          </div>
        ) : (
          <p className="tool-result-prompt">Fill in each field above to see your number.</p>
        )}
      </div>

      <p className="tool-insight">{definition.insight}</p>

      <div className="tool-cta">
        <Link
          className="btn btn-primary btn-md btn-wrap"
          href={contextHref("/gap-finder", slug, result)}
        >
          {definition.primaryCta}
        </Link>
        <Link className="tlink" href={contextHref("/contact", slug, result)}>
          Or tell me what you are dealing with
        </Link>
      </div>

      <section className="tool-faq">
        {definition.faqs.map((faq) => (
          <div className="tool-faq-item" key={faq.question}>
            <h2 className="tool-faq-question">{faq.question}</h2>
            <p className="tool-faq-answer">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
