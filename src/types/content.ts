export type ContentStream = "insights" | "blog";

export type ContentKind = "article" | "whitepaper" | "post";

export type ContentFrontmatter = {
  title: string;
  kind: ContentKind;
  order: number;
  author?: string;
  date?: string;
  summary?: string;
};

export type ContentEntry = {
  slug: string;
  body: string;
  frontmatter: ContentFrontmatter;
};
