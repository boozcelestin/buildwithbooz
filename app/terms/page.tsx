import { readFile } from "node:fs/promises";
import path from "node:path";

import ReactMarkdown from "react-markdown";

import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata = createPageMetadata({
  title: "Terms",
  description: "Terms of Service for BuildWithBooz.",
  path: "/terms",
  index: true,
});

export default async function TermsPage() {
  const content = await readFile(path.join(process.cwd(), "content/terms.md"), "utf8");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container-narrow">
          <div className="page-head">
            <h1 className="page-h1">Terms</h1>
          </div>
          <div className="art-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
