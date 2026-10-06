import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CheckoutButton } from "@/src/components/forms/CheckoutButton";
import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "The Operations Blueprint",
  description:
    "You know your business runs through you. The Operations Blueprint ends that: a read of your whole business you cannot argue with, the one first move that breaks the stall, and an operator who sits with you until the business runs without you.",
  path: "/operations-blueprint",
});

function BlueprintCheckoutButton({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <CheckoutButton product="operations_blueprint" size={size}>
      Start the Blueprint. $5,000
    </CheckoutButton>
  );
}

const blueprintItems = [
  "Your whole operation drawn out, every workflow, how it really runs today. Most owners have never seen it on one page.",
  "Every leak found and priced, and every pile of unused money found and priced, all from your own numbers.",
  "The one constraint holding the whole business back, and the single first move to make on it.",
  "The short, ranked list of what to fix and in what order, so there is never a question of what is next.",
  "The money math, under promised on purpose, and how fast it pays for itself.",
] as const;

const nextSteps = [
  "You pay. We book up to five working sessions inside thirty days with you and the heads of staff.",
  "Over about a week I find how your whole business really makes and loses money.",
  "Around two weeks in you get the written Blueprint, and the first move to make. Build it with me and the five thousand comes off, or take the plan and run it yourself.",
] as const;

export default function OperationsBlueprintPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="assessment-page blueprint-page">
        <section className="assessment-hero">
          <div className="container assessment-hero-inner">
            <div className="assessment-hero-copy">
              <h1 className="assessment-title">
                You already know what is wrong. This is the thing that finally fixes it.
              </h1>
              <p className="assessment-lead">
                You know your business runs through you. You know calls slip, quotes go quiet,
                invoices sit, and there is money hiding in there you never get to. You have known for
                a while. And here you still are. The Operations Blueprint ends that: a read of your
                whole business you cannot argue with, the one first move that breaks the stall, and an
                operator who sits with you until the business runs without you. Five thousand dollars,
                credited toward the build.
              </p>
              <div className="assessment-actions">
                <BlueprintCheckoutButton size="lg" />
                <ButtonLink href="#what-you-get" variant="outline" size="lg" wrap>
                  See what is inside
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="blueprint-diagrams" aria-label="The operation before and after">
          <div className="container blueprint-diagram-grid">
            <figure className="blueprint-diagram">
              <Image
                alt="The shop today: calls, quotes, and invoices leaking, money sitting unused, and everything running through the owner."
                height={640}
                priority
                src="/images/operations-blueprint/blueprint-before.svg"
                width={1000}
              />
              <figcaption>today</figcaption>
            </figure>
            <figure className="blueprint-diagram">
              <Image
                alt="The same operation fixed: every step sealed and flowing, the unused money working, and the owner out of the daily flow."
                height={640}
                priority
                src="/images/operations-blueprint/blueprint-after.svg"
                width={1000}
              />
              <figcaption>once it is fixed</figcaption>
            </figure>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">Knowing was never your problem</h2>
            <p className="assessment-body">
              For years people have told you to work on the business, not in it. You nodded. Nothing
              changed. That is not because you are lazy, you are one of the hardest working people you
              know. It is because knowing a problem and fixing it are two different things, and
              everything about running a busy shop pushes the fix to next week, every week. The block
              was never a lack of awareness. It was that nobody ever made moving easier than staying
              stuck.
            </p>
          </div>
        </section>

        <section className="assessment-dark dark-zone">
          <div className="container assessment-copy-wide">
            <h2 className="assessment-heading">Plans are free now. Doing is the scarce part.</h2>
            <p className="assessment-body">
              Here is the trap of right now. Everyone has a tool that hands them a plan in thirty
              seconds. Ask any AI how to fix your business and it spits out a tidy list. So plans are
              everywhere, and almost nobody acts on them, because a plan was never the hard part. The
              hard part is deciding, starting, and finishing, while the phone is ringing and a truck is
              down and payroll is Friday. What got scarce is not information. It is someone who will
              actually make it happen with you.
            </p>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">And it is not only leaking. A lot of it is hiding.</h2>
            <p className="assessment-body">
              Most owners think the problem is leads, then learn it is leaks, the calls and quotes and
              invoices that slip. That is real, and we find every one. But there is a third pile of
              money most owners never see, because it never looks like a fire. The customers you served
              once and never called again. The referrals nobody asks for. The gap between what your
              best crew closes and what the rest do. Added up, it is usually bigger than the leaks. And
              you do not have to double anything to change your year. A little better in the right five
              places multiplies.
            </p>
          </div>
        </section>

        <section className="assessment-section assessment-section-border">
          <div className="container">
            <h2 className="assessment-heading">What actually breaks a stall</h2>
            <p className="assessment-body assessment-copy-narrow">
              Three things, and not one of them is more information.
            </p>
            <div className="assessment-get-grid blueprint-three-items">
              <div className="assessment-checklist">
                <p>First, a read of your whole business you cannot argue with. Every workflow drawn out, every leak and every hidden pile of money priced from your own numbers. Most owners have never seen their operation on one page.</p>
              </div>
              <div className="assessment-checklist">
                <p>Second, the single first move. Not a list of twenty. The one thing to do first, so there is no deciding left, just doing.</p>
              </div>
              <div className="assessment-checklist">
                <p>Third, a person on the hook with you. Someone who sits in the room, forces the call, and stays in it until it moves. That is the part no tool on earth gives you.</p>
              </div>
            </div>
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
              <h2 className="assessment-heading">I am an operator, not a plan</h2>
              <p className="assessment-body">
                This is the difference between me and the deck a consultant emails you and disappears.
                I do not hand you a document and wish you luck. I sit down with you and the heads of
                staff who run each part of the business, find the real thing, name the first move, and
                stay in it while it gets built.
              </p>
              <p className="assessment-body">
                About ten years doing this with local businesses taught me the same lesson every time.
                The owner already knew. What they never had was someone accountable standing next to
                them who did not leave when the plan was written. In a world drowning in free advice,
                that is the thing worth paying for.
              </p>
            </div>
          </div>
        </section>

        <section id="what-you-get" className="assessment-section assessment-section-border">
          <div className="container">
            <h2 className="assessment-heading">What you actually get</h2>
            <p className="assessment-body assessment-copy-narrow">
              A written Blueprint, built on real sessions with your team and your own numbers, not a
              template. Inside it:
            </p>
            <ul className="assessment-checklist blueprint-full-checklist">
              {blueprintItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="assessment-body">
              Delivered in about two weeks. It is yours to keep, build with me, or run yourself.
            </p>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">How it works</h2>
            <p className="assessment-body">
              Up to five working sessions inside thirty days, with you and the heads of staff who
              actually run each part of the business, whoever owns the phones and the schedule, whoever
              runs the office and the billing, the lead in the field. They know where it really breaks,
              and what really works. I sit with them, find the real thing, and put numbers on all of it.
            </p>
            <div className="entry assessment-price-card">
              <div>
                <h3 className="entry-h">The Operations Blueprint</h3>
                <p className="entry-p">
                  A written Blueprint, built on real sessions with your team and your own numbers, not
                  a template.
                </p>
              </div>
              <div className="entry-side">
                <div className="svprice-lbl">Investment</div>
                <div className="svprice">$5,000</div>
                <div className="entry-actions">
                  <BlueprintCheckoutButton />
                </div>
              </div>
            </div>
            <div className="assessment-risk">
              <h3 className="assessment-subheading">The risk is on me</h3>
              <p className="assessment-body">
                The Blueprint finds far more in leaks and unused money than it costs you, from your own
                numbers, or you do not pay. Build the fixes with me and the five thousand comes off the
                price. The only way this costs you is if it earns it.
              </p>
            </div>
          </div>
        </section>

        <section className="assessment-section">
          <div className="container assessment-copy-narrow">
            <h2 className="assessment-heading">This is not the $1,000 assessment</h2>
            <p className="assessment-body">
              If you run one crew and a phone, this is not for you. Start with the{" "}
              <Link className="tlink" href="/assessment">
                Automation Assessment
              </Link>
              , it finds your biggest leak for a thousand dollars. But multiple crews, more than one
              location, an office full of people? One leak is not your problem. Ten of them are, plus
              all the money sitting unused, spread across the whole operation, and no single fix touches
              that. That is what the Blueprint is for.
            </p>
          </div>
        </section>

        <section className="assessment-section assessment-section-border">
          <div className="container">
            <h2 className="assessment-heading">What happens after you pay</h2>
            <div className="assessment-steps blueprint-steps">
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

        <section className="assessment-close dark-zone">
          <div className="container assessment-close-inner">
            <h2 className="assessment-heading">Close</h2>
            <p className="assessment-body">
              You did not start this to be the reason it works. You have known that for a while, and
              knowing was never going to fix it, and another free plan from a robot will not either. What
              breaks a years long stall is a read you cannot argue with, the one first move, and someone
              standing next to you who does not leave, until the business finally runs without you. That
              is the Blueprint. Five thousand dollars, off the build if you proceed, in two weeks.
            </p>
            <BlueprintCheckoutButton size="lg" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
