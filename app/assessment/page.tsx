import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Automation Assessment",
  description:
    "The Automation Assessment is a full diagnosis of where your business loses calls, quotes, and jobs, with the fixes ranked by what puts the most money back first.",
  path: "/assessment",
});

function AssessmentCheckoutButton({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <form action="/api/stripe/checkout" method="post">
      <button className={`btn btn-primary btn-${size} btn-wrap`} type="submit">
        Start the assessment. $1,000
      </button>
    </form>
  );
}

const checklist = [
  "The one constraint that is costing you the most, named plainly.",
  "Three to seven fixes, ranked so the one that makes the most money is first.",
  "For each fix: what it is, why it matters, a rough read on the impact, the effort to do it, and how to test it in two weeks so you are never betting blind.",
  "What I know, what I am assuming, and what is still unknown, in the open, so you can trust the read instead of taking it on faith.",
] as const;

const nextSteps = [
  "You pay. Right away you get a short set of questions, the real inputs I need. Your average job, roughly how many calls you miss, how quoting and invoicing work now.",
  "I read your business against your answers and find the leak that matters most.",
  "Within 48 hours you get the written assessment, ranked and ready.",
  "Want me to build the top fix? We start, and the thousand comes off. If not, no follow up, no pressure. You keep the plan either way.",
] as const;

export default function AssessmentPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="assessment-page">
        <section className="assessment-hero">
          <div className="container assessment-hero-inner">
            <div className="assessment-hero-copy">
              <h1 className="assessment-title">
                Find the one leak that is costing you the most. Then get the plan to fix it.
              </h1>
              <p className="assessment-lead">
                The Automation Assessment is a full diagnosis of where your business loses calls,
                quotes, and jobs, with the fixes ranked by what puts the most money back first. Built
                on your real numbers. Delivered in 48 hours. It is one thousand dollars, and it comes
                off the build if you decide to move forward.
              </p>
              <div className="assessment-actions">
                <AssessmentCheckoutButton size="lg" />
                <ButtonLink href="/sample-assessment" variant="outline" size="lg" wrap>
                  See a real example first
                </ButtonLink>
              </div>
              <p className="assessment-routing">
                Running more than a couple of crews, more than one location, or a full office? The
                thousand dollar assessment will miss too much of a business your size. Start with the{" "}
                <Link className="tlink" href="/operations-blueprint">
                  Operations Blueprint
                </Link>{" "}
                instead.
              </p>
            </div>
            <div className="assessment-bucket">
              <Image
                alt="A bucket leaking money from three holes labeled missed call, quote not followed up, and invoice not chased."
                height={420}
                priority
                src="/images/assessment/bucket-with-holes.svg"
                width={560}
              />
            </div>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">You do not have a lead problem</h2>
            <p className="assessment-body">
              Most shops do not. The jobs are coming in. They leak out after the call. The voicemail
              nobody returns. The quote nobody follows up. The invoice nobody chases. The job that
              only moves when you are standing in the room. Every one of those is money you already
              earned and did not keep.
            </p>
          </div>
        </section>

        <section className="assessment-dark dark-zone">
          <div className="container assessment-copy-wide">
            <h2 className="assessment-heading">More leads is the wrong lever</h2>
            <p className="assessment-body">
              So here is what most owners do about that leak. They reach for more. More ads, more
              leads, another promotion. It feels like progress. It is usually the most expensive way
              to fix the wrong thing.
            </p>
            <p className="assessment-body">
              Look at what actually happens. You are already getting the calls. Some go to voicemail
              and never get called back. Some become quotes nobody follows up. Pouring more leads
              into that is pouring more water into a bucket with holes. The water bill goes up. The
              bucket still leaks.
            </p>
            <blockquote className="assessment-quote">
              Pouring more leads into that is pouring more water into a bucket with holes.
            </blockquote>
            <p className="assessment-body">
              And your business does not have fifty problems of equal size. It has one that is costing
              you more than the rest combined. There is an old line about leverage. Give me a lever
              long enough and a place to stand, and I can move the world. The whole trick is knowing
              where to put the lever. The owners who pull ahead are not the ones who found more leads.
              They are the ones who found that one spot and put the lever there.
            </p>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">Why a diagnosis, not a guess</h2>
            <p className="assessment-body">
              The tool is the cheap part. Knowing where to point it is the whole game. Point good
              software at the wrong problem and all you have done is make a problem you did not have
              run faster, for a monthly fee. The assessment finds the one place you are actually
              leaking, so the money and effort you spend fixing it goes to the thing that pays you
              back.
            </p>
            <p className="assessment-callout">
              You would not let anyone operate before they looked at the x ray. Same idea. The plan
              comes after the diagnosis, not before.
            </p>
          </div>
        </section>

        <section className="assessment-section assessment-section-border">
          <div className="container">
            <h2 className="assessment-heading">What you actually get</h2>
            <div className="assessment-get-grid">
              <ul className="assessment-checklist">
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="assessment-preview">
                <span className="chip">Sample Assessment</span>
                <p>
                  Delivered in 48 hours. It is yours. Hand it to me to build, take it to someone else,
                  or run it yourself. The plan does not expire and it does not lock you into anything.
                </p>
                <ButtonLink href="/sample-assessment" variant="outline" size="md" wrap>
                  See a real sample assessment
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="assessment-dark assessment-breather dark-zone">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">You do not need more information. You need clarity.</h2>
            <p className="assessment-body">
              You can find a thousand videos telling you to automate this and install that. That is
              the problem, not the solution. More information is just more noise when you are busy
              running a business. What you need is someone to look at your shop and tell you the truth.
              Here is the one thing costing you the most. Here is what to do first. Here is what can
              wait.
            </p>
            <blockquote className="assessment-quote">
              That is what you are paying for. Not a pile of tactics. Clarity about the one that
              matters, and the order for the rest.
            </blockquote>
          </div>
        </section>

        <section className="assessment-section assessment-price-section">
          <div className="container">
            <h2 className="assessment-heading">The price is on the page, on purpose</h2>
            <p className="assessment-body assessment-copy-narrow">
              It is one thousand dollars. You see that before you ever talk to me, and that is
              deliberate. You should not have to sit through a sales call just to learn what something
              costs. I would rather be doing the work for my clients than booking calls to talk people
              into things. Serious owners do not need to be sold. They see the price, they decide, they
              go. If that is you, you already know.
            </p>
            <div className="entry assessment-price-card">
              <div>
                <h3 className="entry-h">The Automation Assessment</h3>
                <p className="entry-p">
                  A full diagnosis of where your business loses calls, quotes, and jobs, with the
                  fixes ranked by what puts the most money back first.
                </p>
              </div>
              <div className="entry-side">
                <div className="svprice-lbl">Investment</div>
                <div className="svprice">$1,000</div>
                <div className="entry-actions">
                  <AssessmentCheckoutButton />
                </div>
              </div>
            </div>
            <div className="assessment-risk">
              <h3 className="assessment-subheading">Read it first. Then decide if it was worth it.</h3>
              <p className="assessment-body">
                I take the risk here, not you. Pay, and within 48 hours you get the full assessment.
                Read the whole thing. If you do not believe it was worth the thousand, tell me within
                fourteen days and I will refund every dollar, and you keep the plan anyway. Before any
                refund, just tell me what was missing, so I can make it right first. On top of that, if
                you have me build the fixes, the thousand comes off the price. The only way this costs
                you anything is if it earns it.
              </p>
            </div>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">The assessment is the answer, not the first of ten steps</h2>
            <p className="assessment-body">
              I will not hand you a plan and then tell you there are five more things to buy before you
              can act. After 48 hours you know the one thing to fix and the order for the rest. That is
              enough to move.
            </p>
            <p className="assessment-body">
              From there, decisive owners do one of two things. Some run the plan themselves, and
              that is a real win. Others would rather not spend their nights building systems, so they
              have me do it, and the thousand comes off. Both are the same move. You got the answer and
              you acted on it.
            </p>
            <p className="assessment-body">
              The only person this does not serve is the one who collects answers and never uses any of
              them. If that is the honest truth about where you are, keep your money until you are ready
              to move. The plan only pays when you use it.
            </p>
          </div>
        </section>

        <section className="assessment-section assessment-section-border">
          <div className="container assessment-about-grid">
            <div className="assessment-headshot">
              <Image
                alt="Booz Celestin"
                fill
                sizes="(max-width: 700px) 280px, 320px"
                src="/images/about/booz-celestin.webp"
              />
            </div>
            <div className="assessment-copy-narrow">
              <h2 className="assessment-heading">Who is doing this</h2>
              <p className="assessment-body">
                I am not an agency and I am not a software company. I am an operator. I spent about ten
                years running a marketing business working with local companies, and the same thing
                kept quietly killing good ones. Not the leads. What happened to them after. So now I
                build the system that catches what falls through. When you buy the assessment, I am the
                one who reads your business and writes it. Not a junior, not a template.
              </p>
            </div>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container">
            <h2 className="assessment-heading">What happens after you pay</h2>
            <div className="assessment-steps">
              {nextSteps.map((step, index) => (
                <article className="ps" key={step}>
                  <div className="ps-num" aria-hidden="true">
                    {index + 1}
                  </div>
                  <p className="assessment-step-copy">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fcta dark-zone">
          <div className="fcta-inner">
            <div>
              <h2>Not sure you are ready</h2>
              <p>
                Start with the Gap Finder. Free, a few minutes, and it points you to the leak that
                probably matters most. The assessment is the paid, confirmed, ranked version of that,
                built on your real numbers.
              </p>
            </div>
            <ButtonLink href="/gap-finder" size="md">
              Run the free Gap Finder
            </ButtonLink>
          </div>
        </section>

        <section className="assessment-close dark-zone">
          <div className="container assessment-close-inner">
            <h2 className="assessment-heading">Close</h2>
            <p className="assessment-body">
              You are already doing the hard part. The work is good and the jobs are coming. The only
              question is how much of what you earn you actually keep. The assessment shows you where
              it is going and hands you the order to fix it. One thousand dollars, off the build if you
              proceed, in 48 hours.
            </p>
            <AssessmentCheckoutButton size="lg" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
