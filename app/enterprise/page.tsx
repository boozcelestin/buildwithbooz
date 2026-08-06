import type { Metadata } from "next";

import { LeadForm } from "@/src/components/forms/LeadForm";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Enterprise",
  description:
    "If you are running something bigger than a local shop, this is the place. Tell me what you are dealing with and I will get back to you personally.",
  path: "/enterprise",
});

export default function EnterprisePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="startwrap">
        <LeadForm kind="enterprise" />
      </main>
    </>
  );
}
