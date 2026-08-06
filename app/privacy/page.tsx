import { readFile } from "node:fs/promises";
import path from "node:path";

import ReactMarkdown from "react-markdown";

import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for BuildWithBooz.",
  path: "/privacy",
  index: true,
});

export default async function PrivacyPage() {
  const content = await readFile(path.join(process.cwd(), "content/privacy.md"), "utf8");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container-narrow">
          <div className="page-head">
            <h1 className="page-h1">Privacy Policy</h1>
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
