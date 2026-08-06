import type { Metadata } from "next";

import { ContentCard } from "@/src/components/content/ContentCard";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { getAllContent } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Plain reads on building better systems for local service businesses.",
  path: "/blog",
});

const blogBars = [
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

export default async function BlogPage() {
  const entries = await getAllContent("blog");
  const posts = [...entries].sort((first, second) =>
    (second.frontmatter.date ?? "").localeCompare(first.frontmatter.date ?? ""),
  );

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="blog-hero">
          <h1 className="blog-h1">Blog.</h1>
          <p className="blog-sub">
            Plain reads on building better systems for local service businesses.
          </p>
        </div>
        <div className="blog-grid">
          {posts.map((entry, index) => (
            <ContentCard
              author={entry.frontmatter.author}
              bars={blogBars[index % blogBars.length]}
              date={entry.frontmatter.date}
              href={`/blog/${entry.slug}`}
              key={entry.slug}
              label="Article"
              title={entry.frontmatter.title}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
