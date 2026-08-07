import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownArticle } from "@/src/components/content/MarkdownArticle";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { getAllContent, getContentBySlug, isDraftContent } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getAllContent("blog");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentBySlug("blog", slug);

  if (!entry) {
    return {};
  }

  return createPageMetadata({
    title: entry.frontmatter.title,
    description:
      entry.frontmatter.summary ??
      "Plain reads on building better systems for local service businesses.",
    path: `/blog/${entry.slug}`,
    index: !isDraftContent(entry),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const entry = await getContentBySlug("blog", slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main id="main">
        <MarkdownArticle entry={entry} label="Blog" />
      </main>
    </>
  );
}
