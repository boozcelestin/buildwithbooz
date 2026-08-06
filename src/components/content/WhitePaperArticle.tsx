import ReactMarkdown from "react-markdown";

import type { ContentEntry } from "@/src/types/content";

import { ButtonLink } from "../site/ButtonLink";

type WhitePaperArticleProps = {
  entry: ContentEntry;
};

export function WhitePaperArticle({ entry }: WhitePaperArticleProps) {
  return (
    <article className="wp-wrap">
      <div className="wp-head">
        <p className="eyebrow">White paper</p>
        <h1 className="wp-title">{entry.frontmatter.title}</h1>
        <p className="wp-byline">By {entry.frontmatter.author ?? "Booz"}</p>
      </div>
      <div className="wp-summary">
        <p className="wp-summary-lbl">Summary</p>
        <p>{entry.frontmatter.summary}</p>
      </div>
      <div className="wp-body">
        <ReactMarkdown
          components={{
            blockquote: ({ children }) => <blockquote className="art-quote">{children}</blockquote>,
          }}
        >
          {entry.body}
        </ReactMarkdown>
      </div>
      <div className="art-cta dark-zone">
        <h3>Want this run on your business?</h3>
        <ButtonLink href="/sample-assessment" wrap>
          See a sample assessment
        </ButtonLink>
      </div>
    </article>
  );
}
