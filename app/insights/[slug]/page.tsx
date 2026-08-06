import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownArticle } from "@/src/components/content/MarkdownArticle";
import { WhitePaperArticle } from "@/src/components/content/WhitePaperArticle";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { getAllContent, getContentBySlug, isPlaceholderContent } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/site";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getAllContent("insights");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentBySlug("insights", slug);

  if (!entry) {
    return {};
  }

  return createPageMetadata({
    title: entry.frontmatter.title,
    description:
      entry.frontmatter.summary ??
      "Plain reads on where service businesses leak money, and what to actually do about it. No theory. No fluff.",
    path: `/insights/${entry.slug}`,
    index: !isPlaceholderContent(entry),
  });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const entry = await getContentBySlug("insights", slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <SiteHeader active="insights" />
      <main id="main">
        {entry.frontmatter.kind === "whitepaper" ? (
          <WhitePaperArticle entry={entry} />
        ) : (
          <MarkdownArticle entry={entry} />
        )}
      </main>
    </>
  );
}
