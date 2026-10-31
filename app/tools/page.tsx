import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import {
  getCalculatorDefinition,
  publicCalculatorSlugs,
} from "@/src/features/calculators/definitions";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Free Tools",
  description:
    "Free calculators for trades businesses. See what missed calls and other leaks quietly cost you. No signup.",
  path: "/tools",
});

const tools = publicCalculatorSlugs
  .map((slug) => getCalculatorDefinition(slug))
  .filter((definition): definition is NonNullable<typeof definition> => Boolean(definition));

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container">
          <div className="page-head">
            <h1 className="page-h1">Free tools</h1>
            <p className="page-sub">
              Quick calculators that show where a trades business is leaking money. No signup, no
              email.
            </p>
          </div>
          <ul className="tools-list">
            {tools.map((tool) => (
              <li className="tools-item" key={tool.slug}>
                <h2 className="tools-item-title">
                  <Link href={`/tools/${tool.slug}`}>{tool.title}</Link>
                </h2>
                <p className="tools-item-sub">{tool.subtitle}</p>
                <Link className="tlink" href={`/tools/${tool.slug}`}>
                  Open the calculator
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
