import { describe, expect, it } from "vitest";

import {
  calculateDefaults,
  calculatorDefinitions,
  calculatorSlugs,
  publicCalculatorSlugs,
} from "../../src/features/calculators/definitions";

describe("calculator launch visibility", () => {
  it("builds all six tools and exposes only Missed Call Revenue", () => {
    expect(calculatorSlugs).toHaveLength(6);
    expect(publicCalculatorSlugs).toEqual(["missed-call-revenue-calculator"]);
  });
});

describe("calculator formulas", () => {
  it("matches the Missed Call Revenue prototype defaults", () => {
    const result = calculateDefaults(calculatorDefinitions["missed-call-revenue-calculator"]);

    expect(result).toMatchObject({
      big: "$7,740",
      tone: "bad",
      contextValue: "7740",
      values: { monthly: "$7,740", yearly: "$92,880" },
    });
  });

  it("matches the Lost Quote prototype defaults", () => {
    const result = calculateDefaults(calculatorDefinitions["lost-quote-calculator"]);

    expect(result).toMatchObject({
      big: "$3,360",
      tone: "good",
      contextValue: "3360",
      values: { monthly: "$3,360", yearly: "$40,320" },
    });
  });

  it("matches the Slow Payment prototype defaults", () => {
    const result = calculateDefaults(calculatorDefinitions["slow-payment-calculator"]);

    expect(result).toMatchObject({
      big: "$900",
      tone: "bad",
      contextValue: "900",
      values: { monthly: "$900", yearly: "$10,800", late: "9" },
    });
  });

  it("matches the Customer Reactivation prototype defaults", () => {
    const result = calculateDefaults(
      calculatorDefinitions["customer-reactivation-calculator"],
    );

    expect(result).toMatchObject({
      big: "$22,500",
      tone: "good",
      contextValue: "22500",
      values: { campaign: "$22,500" },
    });
  });

  it("matches the Job Margin prototype defaults", () => {
    const result = calculateDefaults(calculatorDefinitions["job-margin-calculator"]);

    expect(result).toMatchObject({
      big: "$700",
      side: "23%",
      tone: "good",
      contextValue: "700",
      values: { profit: "$700", margin: "23" },
      verdict: "A healthy margin for trades work. Protect it.",
    });
  });

  it("matches the More Ads prototype defaults", () => {
    const result = calculateDefaults(calculatorDefinitions["should-you-run-more-ads"]);

    expect(result).toMatchObject({
      big: "$2.70",
      contextValue: "2.7",
      values: { return: "$2.70", reach: "60", missed: "$3,600" },
      verdict:
        "Before you spend more on ads, plug the leak. You already paid for leads you are not catching. Fixing that is cheaper than buying more.",
    });
  });

  it("shows the tight funnel verdict at seventy percent reach", () => {
    const result = calculatorDefinitions["should-you-run-more-ads"].calculate({
      adspend: 2000,
      leads: 50,
      reachpct: 70,
      closepct: 40,
      jobvalue: 450,
    });

    expect(result?.verdict).toBe(
      "Your funnel is fairly tight. More ads could pay. Just watch your response time as the volume climbs, because that is the first thing to slip.",
    );
  });

  it.each(calculatorSlugs)("shows the empty prompt when %s has a zero field", (slug) => {
    const definition = calculatorDefinitions[slug];
    const values = Object.fromEntries(
      definition.inputs.map((input, index) => [input.id, index === 0 ? 0 : input.defaultValue]),
    );

    expect(definition.calculate(values)).toBeNull();
  });
});
