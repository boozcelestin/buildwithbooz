import type { Metadata } from "next";

import { ContentCard } from "@/src/components/content/ContentCard";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { getAllContent } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description:
    "Plain reads on where service businesses leak money, and what to actually do about it. No theory. No fluff.",
  path: "/insights",
});

const articleBars = [
  [
    { color: "yellow" as const, width: "70%" },
    { color: "ink" as const },
    { width: "100%" },
    { color: "green" as const, width: "55%" },
  ],
  [
    { color: "ink" as const },
    { color: "yellow" as const, width: "70%" },
    { color: "green" as const, width: "55%" },
  ],
  [
    { color: "yellow" as const, width: "70%" },
    { width: "100%" },
    { color: "ink" as const },
    { color: "green" as const, width: "55%" },
  ],
  [
    { color: "green" as const, width: "55%" },
    { color: "yellow" as const, width: "70%" },
    { color: "ink" as const },
  ],
];

export default async function InsightsPage() {
  const entries = await getAllContent("insights");
  const articles = entries.filter((entry) => entry.frontmatter.kind === "article");
  const whitePaper = entries.find((entry) => entry.frontmatter.kind === "whitepaper");

  return (
    <>
      <SiteHeader active="insights" />
      <main id="main">
        <div className="blog-hero">
          <h1 className="blog-h1">Insights.</h1>
          <p className="blog-sub">
            Plain reads on where service businesses leak money, and what to actually do about it.
            No theory. No fluff.
          </p>
        </div>

        <div className="editorial">
          <p>The cheapest job to win is one you already earned.</p>
        </div>

        <div className="ins-label">
          <p className="eyebrow">Articles</p>
        </div>
        <div className="blog-grid">
          {articles.map((entry, index) => (
            <ContentCard
              bars={articleBars[index] ?? articleBars[0]}
              href={`/insights/${entry.slug}`}
              key={entry.slug}
              label="Article"
              title={entry.frontmatter.title}
            />
          ))}
        </div>

        <div className="ins-label">
          <p className="eyebrow">White paper</p>
        </div>
        {whitePaper ? (
          <div className="blog-grid">
            <ContentCard
              bars={[
                { color: "ink", width: "60%" },
                { width: "100%" },
                { width: "85%" },
                { color: "yellow", width: "40%" },
              ]}
              href={`/insights/${whitePaper.slug}`}
              label="White paper"
              title={whitePaper.frontmatter.title}
            />
          </div>
        ) : null}

        <p className="comingsoon">The first pieces are on the way.</p>

        <div className="ins-label">
          <p className="eyebrow">Case studies</p>
        </div>
        <div className="ins-pad">
          <div className="emptystate">
            Real client stories will live here once the work is done. I would rather show you
            nothing than show you numbers I made up.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
