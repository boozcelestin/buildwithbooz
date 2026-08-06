import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCta } from "@/src/components/home/ClosingCta";
import { EditorialMoment } from "@/src/components/home/EditorialMoment";
import { GapFinder } from "@/src/components/gap-finder/GapFinder";
import { HomeHero } from "@/src/components/home/HomeHero";
import { ProcessBand } from "@/src/components/home/ProcessBand";
import { SampleAssessmentPreview } from "@/src/components/home/SampleAssessmentPreview";
import { ServicesTeaser } from "@/src/components/home/ServicesTeaser";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HomeHero />
        <GapFinder />
        <EditorialMoment>Most businesses do not have a lead problem. They have a systems problem.</EditorialMoment>
        <SampleAssessmentPreview />
        <ProcessBand />
        <ServicesTeaser />
        <EditorialMoment>We do not start with software. We start with understanding.</EditorialMoment>
        <section className="section-tight section-border">
          <div className="container center">
            <h2 className="sec-title">How this actually works.</h2>
            <p className="sec-sub">
              Plain reads on where local businesses leak money, and what to do about it.
            </p>
            <div className="tease-link">
              <Link className="tlink" href="/insights">
                Read the insights
              </Link>
            </div>
          </div>
        </section>
        <section className="section-tight section-border">
          <div className="container center">
            <p className="about-tease">I&apos;m not an agency. I&apos;m an operator.</p>
            <div className="tease-link">
              <Link className="tlink" href="/about">
                Read the story
              </Link>
            </div>
          </div>
        </section>
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
