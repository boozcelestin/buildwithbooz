import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "I am not an agency. I am an operator.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />
      <main id="main">
        <div className="container">
          <div className="ahero">
            <div>
              <h1 className="aheadline">
                I&apos;m not an agency.
                <br />
                <em>I&apos;m an operator.</em>
              </h1>
              <div className="abody">
                <p>
                  For years I lived in marketing. That was Endgame. I got good at getting people more
                  leads. And I learned something the hard way.
                </p>
                <p>
                  Most businesses do not lose money because their marketing is broken. They lose it
                  after the lead comes in. The call that goes to voicemail. The estimate nobody follows
                  up on. The job that quietly slips because the owner is the only one holding it all
                  together.
                </p>
                <p>More leads do not fix that. More ads do not fix that. Better systems do.</p>
              </div>
            </div>
            <div className="aphoto">
              <Image
                src="/images/about/booz-celestin.webp"
                alt="Booz Celestin"
                fill
                priority
                sizes="(max-width: 700px) 300px, 300px"
              />
            </div>
          </div>

          <div className="editorial about-editorial">
            <p>More leads do not fix a leak that happens after the lead.</p>
          </div>

          <div className="abody about-body-center">
            <p>So I built BuildWithBooz.</p>
            <p>
              I find where your business leaks calls, estimates, and jobs, then I build the systems
              that stop it. This is not AI for the sake of AI. It is the opposite. Find the leak. Prove
              what it costs. Fix what pays. Sometimes the honest answer is to leave something alone.
            </p>
            <p>
              I am not here to sell you software. I am here to figure out what is actually holding your
              business back, then build the fix. Then I stick around to make sure it works.
            </p>
          </div>

          <section className="aclose">
            <p>
              If any of this sounds like your shop, start with the Gap Finder. No commitment. Just a
              clear read on where your money is going.
            </p>
            <ButtonLink href="/gap-finder" size="md">
              Run the Gap Finder
            </ButtonLink>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
