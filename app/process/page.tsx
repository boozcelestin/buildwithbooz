import type { Metadata } from "next";

import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Process",
  description: "Four steps to find what is actually broken.",
  path: "/process",
});

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    time: "45 minutes",
    description:
      "We learn exactly how your business runs. No pitch, no agenda. You talk about what is working and what is not. I listen for where the money goes.",
    emphasis: (
      <>
        You talk.
        <br />I listen.
      </>
    ),
    artifact: "A shared picture of how your business really runs.",
  },
  {
    number: "02",
    title: "The Diagnosis",
    time: "24 hours",
    description:
      "I go through your operation piece by piece. Every place time disappears. Every place money leaks. Every place leads go cold.",
    emphasis: (
      <>
        I dig deep.
        <br />I find the truth.
      </>
    ),
    artifact: "A plain list of where money leaks.",
  },
  {
    number: "03",
    title: "Your Report",
    time: "Delivered in 48 hours",
    description:
      "A clear list of three to seven fixes, ranked by what moves the most money. Specific. Priced. No filler.",
    emphasis: (
      <>
        Clear plan.
        <br />Big impact.
      </>
    ),
    artifact: "A ranked, priced plan you own.",
  },
  {
    number: "04",
    title: "Review Call",
    time: "30 minutes",
    description:
      "We go through every finding together. You decide what gets built first. I tell you what each fix is worth and what it costs. Nothing happens without your say.",
    emphasis: (
      <>
        You decide.
        <br />We execute.
      </>
    ),
    artifact: "Your call on what comes first.",
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <SiteHeader active="process" />
      <main id="main">
        <div className="container">
          <div className="page-head process-head">
            <h1 className="page-h1">
              Four steps to find
              <br />
              <em>what is actually broken.</em>
            </h1>
            <p className="page-sub">
              Most businesses do not have a growth problem. They have a leak problem. Money walks out
              every day through bad process. The assessment finds exactly where. Then we show you how
              to get it back.
            </p>
          </div>
          <div className="psteps-full">
            {steps.map((step) => (
              <section className="ps" key={step.number}>
                <div className="ps-num" aria-hidden="true">
                  {step.number}
                </div>
                <h2 className="ps-title">{step.title}</h2>
                <div className="ps-time">{step.time}</div>
                <p className="ps-desc">{step.description}</p>
                <p className="ps-italic">{step.emphasis}</p>
                <div className="ps-artifact">
                  <div className="a-box">
                    <p className="a-lbl">Artifact</p>
                    <p className="a-val">{step.artifact}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
          <section className="pnext">
            <div>
              <h2 className="pnext-h">What happens next?</h2>
              <p>If a fix is worth building, we build it. If it is not, I tell you that too.</p>
            </div>
            <ButtonLink href="/services" variant="outline" size="md">
              See services
            </ButtonLink>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
