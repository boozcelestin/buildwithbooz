import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Calculator } from "@/src/components/calculators/Calculator";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import {
  calculatorSlugs,
  getCalculatorDefinition,
  publicCalculatorSlugs,
} from "@/src/features/calculators/definitions";
import { createPageMetadata } from "@/src/lib/site";

type CalculatorPageProps = {
  params: Promise<{ tool: string }>;
};

export function generateStaticParams() {
  return calculatorSlugs.map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { tool } = await params;
  const definition = getCalculatorDefinition(tool);

  if (!definition) {
    return {};
  }

  const isPublic = publicCalculatorSlugs.includes(definition.slug);
  const title = `${definition.metaTitle} | BuildWithBooz`;
  const pageMetadata = createPageMetadata({
    title: definition.metaTitle,
    description: definition.metaDescription,
    path: `/tools/${definition.slug}`,
    index: isPublic,
  });

  return {
    ...pageMetadata,
    title: { absolute: title },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { tool } = await params;
  const definition = getCalculatorDefinition(tool);

  if (!definition) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="tool-page" id="main">
        <Calculator slug={definition.slug} />
      </main>
      <SiteFooter />
    </>
  );
}
