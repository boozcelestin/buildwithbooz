import type { Metadata } from "next";

import { GapFinder } from "@/src/components/gap-finder/GapFinder";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { getCalculatorDefinition } from "@/src/features/calculators/definitions";
import type { GapFinderSourceContext } from "@/src/features/gap-finder/types";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Gap Finder",
  description:
    "Answer seven quick questions. See where your business is most likely leaking, and what to look at first.",
  path: "/gap-finder",
});

type GapFinderPageProps = {
  searchParams: Promise<{ calculator?: string; calculatorResult?: string }>;
};

export default async function GapFinderPage({ searchParams }: GapFinderPageProps) {
  const query = await searchParams;
  const calculator = query.calculator ? getCalculatorDefinition(query.calculator) : null;
  const sourceContext: GapFinderSourceContext | undefined = calculator
    ? {
        calculator: calculator.slug,
        ...(query.calculatorResult
          ? { calculatorResult: query.calculatorResult.slice(0, 100) }
          : {}),
      }
    : undefined;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <GapFinder sourceContext={sourceContext} standalone />
      </main>
      <SiteFooter />
    </>
  );
}
