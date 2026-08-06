import Image from "next/image";
import ReactMarkdown from "react-markdown";

import type { ContentEntry } from "@/src/types/content";

import { ButtonLink } from "../site/ButtonLink";
import { formatContentDate } from "./ContentCard";

type MarkdownArticleProps = {
  entry: ContentEntry;
  label?: "Article" | "Blog";
};

export function MarkdownArticle({ entry, label = "Article" }: MarkdownArticleProps) {
  const formattedDate = formatContentDate(entry.frontmatter.date);

  return (
    <article className="art-wrap">
      <p className="eyebrow">{label}</p>
      <h1 className="art-h1">{entry.frontmatter.title}</h1>
      <p className="art-meta">
        By {entry.frontmatter.author ?? "Booz"}
        {formattedDate ? ` · ${formattedDate}` : null}
      </p>
      <p className="placeholder-note">
        Placeholder layout · real writing replaces every paragraph below
      </p>
      <div className="art-body">
        <ReactMarkdown
          components={{
            blockquote: ({ children }) => <blockquote className="art-quote">{children}</blockquote>,
            img: ({ src, alt }) =>
              typeof src === "string" ? (
                <Image
                  alt={alt ?? ""}
                  className="content-image"
                  height={675}
                  sizes="(max-width: 680px) 100vw, 632px"
                  src={src}
                  width={1200}
                />
              ) : null,
          }}
        >
          {entry.body}
        </ReactMarkdown>
      </div>
      <div className="art-cta dark-zone">
        <h3>Want a read like this on your own business?</h3>
        <ButtonLink href="/gap-finder">Run the Gap Finder</ButtonLink>
      </div>
    </article>
  );
}
