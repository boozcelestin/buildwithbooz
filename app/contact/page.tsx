import type { Metadata } from "next";

import { LeadForm } from "@/src/components/forms/LeadForm";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { readContactContext } from "@/src/features/leads/contact-context";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Sixty seconds. I read every one of these myself. No bots, no call center.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const context = readContactContext(await searchParams);

  return (
    <>
      <SiteHeader />
      <main id="main" className="startwrap">
        <LeadForm context={context} kind="contact" />
      </main>
    </>
  );
}
