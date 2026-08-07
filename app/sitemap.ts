import type { MetadataRoute } from "next";

import { getAllContent, isDraftContent } from "@/src/lib/content";
import { getSiteUrl } from "@/src/lib/site";

type SitemapEntry = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const staticEntries: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/assessment", changeFrequency: "monthly", priority: 1 },
  { path: "/operations-blueprint", changeFrequency: "monthly", priority: 0.9 },
  { path: "/gap-finder", changeFrequency: "monthly", priority: 0.9 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
  { path: "/process", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/sample-assessment", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/enterprise", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/tools/missed-call-revenue-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [insights, blogPosts] = await Promise.all([
    getAllContent("insights"),
    getAllContent("blog"),
  ]);
  const contentEntries: SitemapEntry[] = [
    ...insights
      .filter((entry) => !isDraftContent(entry))
      .map((entry) => ({
        path: `/insights/${entry.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...blogPosts
      .filter((entry) => !isDraftContent(entry))
      .map((entry) => ({
        path: `/blog/${entry.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];

  return [...staticEntries, ...contentEntries].map((entry) => ({
    url: new URL(entry.path, siteUrl).toString(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
