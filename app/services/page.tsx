import type { Metadata } from "next";

import { SystemDemo } from "@/src/components/services/SystemDemo";
import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "It starts with a diagnosis. Then we build only what pays.",
  path: "/services",
});

const systems = [
  {
    title: "Lead Response System",
    description: "Capture and answer every lead in seconds.",
    callout: "Never miss another job.",
    demo: "/demos/lead-response.html",
    demoTitle: "Lead Response System demonstration",
    demoHeight: 760,
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    title: "Quote and Follow Up System",
    description: "Send quotes and follow up on their own until the job is closed.",
    callout: "More closed jobs. Less chasing.",
    demo: "/demos/quote-follow-up.html",
    demoTitle: "Quote and Follow Up System demonstration",
    demoHeight: 850,
    icon: <path d="M12 2v20M17 6.5c0-2-2.2-3-5-3s-5 1-5 3 2 2.8 5 3.5 5 1.5 5 3.5-2.2 3-5 3-5-1-5-3" />,
  },
  {
    title: "Invoice and Payment System",
    description: "Automate invoicing and get paid without chasing.",
    callout: "Get paid faster.",
    demo: "/demos/invoice-payment.html",
    demoTitle: "Invoice and Payment System demonstration",
    demoHeight: 760,
    icon: <path d="M20 6 9 17l-5-5" />,
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <SiteHeader active="services" />
      <main id="main">
        <div className="container">
          <div className="page-head">
            <h1 className="page-h1">What we fix.</h1>
            <p className="page-sub">It starts with a diagnosis. Then we build only what pays.</p>
          </div>

          <div className="price-purpose">
            <p className="price-purpose-title">The price is on the page. On purpose.</p>
            <p>
              You should know what this costs before you ever get on a call with me. So here it is, in
              the open. Start where you are ready. Some owners just want the assessment, to see what is
              actually wrong. Some go straight to the deeper diagnostic, then the build, then hand the
              whole thing to me to run for them. You move at the pace that fits you, and you never sit
              through a sales call just to learn a number. I would rather be doing the work for my
              clients than booking calls.
            </p>
          </div>

          <section className="entry" aria-labelledby="assessment-title">
            <div>
              <h2 className="entry-h" id="assessment-title">
                The Automation Assessment
              </h2>
              <p className="entry-p">
                A full diagnosis of where your business leaks calls, estimates, and jobs, with three to
                seven fixes ranked by what makes the most money. Delivered in 48 hours.
              </p>
            </div>
            <div className="entry-side">
              <div className="svprice-lbl">Investment</div>
              <div className="svprice">$1,000</div>
              <div className="entry-actions">
                <form action="/api/stripe/checkout" method="post">
                  <button className="btn btn-primary btn-md btn-wrap" type="submit">
                    Start the assessment
                  </button>
                </form>
                <ButtonLink href="/sample-assessment" variant="outline" size="md" wrap>
                  See a sample assessment
                </ButtonLink>
              </div>
            </div>
          </section>

          <h2 className="sec-title">What we build after that.</h2>
          <p className="sec-sub services-intro">
            These are the fixes we build most often. Your assessment might point to one of these, a few
            together, or something else entirely. We build what pays, not a package.
          </p>
          <div className="svlist">
            {systems.map((system) => (
              <section className="svrow svrow-demo" key={system.title}>
                <div className="svicon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{system.icon}</svg>
                </div>
                <div className="svcontent">
                  <h3 className="sv-title">{system.title}</h3>
                  <p className="sv-desc">{system.description}</p>
                  <span className="chip sv-callout">{system.callout}</span>
                  <div className="svpricing svpricing-inline">
                    <div className="svprice-lbl">Investment</div>
                    <div className="svprice-note">Priced in your assessment</div>
                  </div>
                </div>
                <SystemDemo
                  src={system.demo}
                  title={system.demoTitle}
                  height={system.demoHeight}
                />
              </section>
            ))}
          </div>

          <section className="svupsell">
            <div className="svupsell-row">
              <div>
                <h2 className="svupsell-h">When you want the whole picture.</h2>
                <p>
                  The Strategic Diagnostic is a deep look at your entire operation. Every leak, every
                  leverage point, ranked and priced.
                </p>
              </div>
              <div>
                <div className="svprice-lbl">Investment</div>
                <div className="svprice">$5,000</div>
              </div>
            </div>
            <div className="svupsell-row">
              <div>
                <p>Full systems and custom dashboards, built around your entire operation.</p>
              </div>
              <div>
                <div className="svprice-lbl">Investment</div>
                <div className="svprice">$5,000 to $10,000 plus</div>
              </div>
            </div>
          </section>
        </div>

        <section className="fcta dark-zone">
          <div className="fcta-inner">
            <div>
              <h2>Not sure what you need?</h2>
              <p>Start with the Gap Finder. It points you to the leak that matters most.</p>
            </div>
            <ButtonLink href="/gap-finder" size="md">
              Run the Gap Finder
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
