import type { Metadata } from "next";

import { ButtonLink } from "@/src/components/site/ButtonLink";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { createPageMetadata } from "@/src/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Sample Assessment",
  description: "An illustrative example of the BuildWithBooz Automation Assessment.",
  path: "/sample-assessment",
});

const fixes = [
  {
    number: "1",
    title: "Instant lead response",
    rows: [
      ["What", "A missed call triggers an automatic text back within seconds offering the next open slots, with gentle follow ups."],
      ["Why", "The first shop to respond usually wins the job, voicemail loses it."],
      ["Impact", "Directional estimate, if the shop misses roughly fifteen to twenty five callable leads a month, recovering half at their average ticket is a meaningful monthly gain, their numbers to confirm."],
      ["Effort", "Low."],
      ["Test", "Two weeks, count texts, replies, booked jobs."],
      ["Stop point", "If replies are near zero, pause and look at call sourcing."],
    ],
  },
  {
    number: "2",
    title: "Quote follow up",
    rows: [
      ["What", "Every quote gets a short automatic sequence until the customer answers."],
      ["Why", "A silent quote is a job already half won, left on the table."],
      ["Impact", "A few points of close rate on quotes they already send."],
      ["Effort", "Low to medium."],
      ["Test", "One month, compare close rate against before."],
      ["Stop point", "If quotes already close well, deprioritize."],
    ],
  },
  {
    number: "3",
    title: "Reactivate past customers",
    rows: [
      ["What", "A scheduled reach out to past customers for maintenance and seasonal service."],
      ["Why", "The cheapest job to win is from someone you already served well."],
      ["Impact", "Extra bookings from an asset that costs nothing to hold."],
      ["Effort", "Low."],
      ["Test", "One message to a small batch."],
      ["Stop point", "If the list is small or cold, hold."],
    ],
  },
] as const;

export default function SampleAssessmentPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="report-wrap">
        <article className="report-doc">
          <span className="chip">Sample Assessment</span>
          <div className="rp-banner">
            Illustrative example, not a real client. The numbers are estimates that show the shape of
            the deliverable, not results we are claiming.
          </div>

          <section className="rp-sec">
            <h2 className="eyebrow">The business</h2>
            <p className="rp-body">
              A residential HVAC shop, about twelve trucks, Miami metro. Service and repair, some
              replacements. Good crew, full schedule, strong reviews. The owner&apos;s goal, more booked
              jobs without hiring.
            </p>
          </section>

          <section className="rp-sec">
            <h2 className="eyebrow">Executive read</h2>
            <p className="rp-body">
              The work is not the problem. Demand is not the problem. Jobs are already coming in and
              slipping out before they reach the schedule. The main constraint is lead response, the
              gap between a call arriving and a person being free to answer it. The biggest single leak
              is calls going to voicemail during busy hours and never getting called back in time. This
              is a read to confirm against the shop&apos;s real numbers, not a measurement.
            </p>
          </section>

          <section className="rp-sec">
            <h2 className="eyebrow">What we know, what we are assuming, what is still unknown</h2>
            <div className="kau">
              <div className="kau-col">
                <h3 className="kau-h">What we know</h3>
                <ul>
                  <li>Calls go to voicemail when the crew is busy.</li>
                  <li>Quote follow up is inconsistent.</li>
                  <li>The owner holds most of it together.</li>
                  <li>Past customers rarely get a second touch.</li>
                </ul>
              </div>
              <div className="kau-col">
                <h3 className="kau-h">What we are assuming</h3>
                <ul>
                  <li>
                    Average job value and missed call volume sit in the typical range for a shop this
                    size until the data says otherwise.
                  </li>
                </ul>
              </div>
              <div className="kau-col">
                <h3 className="kau-h">What is still unknown</h3>
                <ul>
                  <li>The exact missed call count.</li>
                  <li>The true average ticket.</li>
                  <li>The current quote close rate.</li>
                  <li>Repeat customer revenue.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rp-sec">
            <h2 className="eyebrow">The primary constraint</h2>
            <p className="rp-body">
              Lead response speed. Everything else is real but secondary. Fixing quoting or
              reactivation while calls still go cold would add work without moving the number that
              matters, booked jobs.
            </p>
          </section>

          <section className="rp-sec">
            <h2 className="eyebrow">The three fixes, ranked</h2>
            {fixes.map((fix) => (
              <div className="fix" key={fix.number}>
                <div className="fix-head">
                  <div className="fix-num" aria-hidden="true">
                    {fix.number}
                  </div>
                  <h3 className="fix-h">{fix.title}</h3>
                </div>
                <div className="fix-rows">
                  {fix.rows.map(([label, value]) => (
                    <div className="fx" key={label}>
                      <span className="fx-lbl">{label}</span>
                      <span className="fx-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="rp-sec">
            <h2 className="eyebrow">What could change this</h2>
            <p className="rp-body">
              The real missed call count, the true average ticket, and the current quote close rate. If
              demand turns out to be thin, the constraint moves from response to demand and the plan
              changes. Confirming these is the first step of the paid assessment.
            </p>
          </section>

          <section className="rp-sec rp-cta">
            <h2 className="eyebrow">Ready for your own?</h2>
            <p className="rp-body">
              This is an illustrative example. Yours is built on your real numbers, the same
              deliverable, ranked for your shop.
            </p>
            <ButtonLink href="/assessment" size="md">
              See the assessment and start
            </ButtonLink>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
