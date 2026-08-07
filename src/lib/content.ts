import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type {
  ContentEntry,
  ContentFrontmatter,
  ContentKind,
  ContentStream,
} from "@/src/types/content";

const contentRoot = path.join(process.cwd(), "content");
const validKinds = new Set<ContentKind>(["article", "whitepaper", "post"]);

function parseFrontmatter(slug: string, data: Record<string, unknown>): ContentFrontmatter {
  const { title, kind, order, author, date, summary } = data;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`Content entry ${slug} needs a title.`);
  }

  if (typeof kind !== "string" || !validKinds.has(kind as ContentKind)) {
    throw new Error(`Content entry ${slug} has an invalid kind.`);
  }

  if (typeof order !== "number" || !Number.isFinite(order)) {
    throw new Error(`Content entry ${slug} needs a numeric order.`);
  }

  if (author !== undefined && typeof author !== "string") {
    throw new Error(`Content entry ${slug} has an invalid author.`);
  }

  if (
    date !== undefined &&
    typeof date !== "string" &&
    !(date instanceof Date && Number.isFinite(date.getTime()))
  ) {
    throw new Error(`Content entry ${slug} has an invalid date.`);
  }

  const normalizedDate =
    date instanceof Date
      ? date.toISOString().slice(0, 10)
      : date;

  if (summary !== undefined && typeof summary !== "string") {
    throw new Error(`Content entry ${slug} has an invalid summary.`);
  }

  return {
    title,
    kind: kind as ContentKind,
    order,
    ...(author ? { author } : {}),
    ...(normalizedDate ? { date: normalizedDate } : {}),
    ...(summary ? { summary } : {}),
  };
}

async function readEntry(stream: ContentStream, fileName: string): Promise<ContentEntry> {
  const slug = fileName.replace(/\.md$/, "");
  const source = await readFile(path.join(contentRoot, stream, fileName), "utf8");
  const parsed = matter(source);

  return {
    slug,
    body: parsed.content.trim(),
    frontmatter: parseFrontmatter(slug, parsed.data),
  };
}

export async function getAllContent(stream: ContentStream): Promise<ContentEntry[]> {
  const directory = path.join(contentRoot, stream);
  const files = await readdir(directory);
  const entries = await Promise.all(
    files.filter((fileName) => fileName.endsWith(".md")).map((fileName) => readEntry(stream, fileName)),
  );

  return entries.sort((first, second) => first.frontmatter.order - second.frontmatter.order);
}

export async function getContentBySlug(
  stream: ContentStream,
  slug: string,
): Promise<ContentEntry | null> {
  const entries = await getAllContent(stream);
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export function isDraftContent(entry: ContentEntry) {
  return entry.body.includes("Draft text.");
}
