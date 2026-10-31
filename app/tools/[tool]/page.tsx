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
import { createPageMetadata, getSiteUrl, siteName } from "@/src/lib/site";

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

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/tools/${definition.slug}`;

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: definition.title,
    description: definition.metaDescription,
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  };

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: definition.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const showTradeSections = definition.slug === "missed-call-revenue-calculator";

  return (
    <>
      <SiteHeader />
      <main className="tool-page" id="main">
        <Calculator slug={definition.slug} />
        {showTradeSections ? (
          <>
            {/*
              TRADE SECTIONS SLOT — content lane fills this later.
              Add short HVAC, plumbing, electrical and roofing sections here
              (server-rendered, H2 per trade). Leave empty until the copy is approved.
            */}
            <section id="trade-sections" data-content-slot="trade-sections" aria-hidden="true" />
          </>
        ) : null}
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </>
  );
}
