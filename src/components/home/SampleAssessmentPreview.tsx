import { ButtonLink } from "@/src/components/site/ButtonLink";

export function SampleAssessmentPreview() {
  return (
    <section className="section section-border">
      <div className="container">
        <h2 className="sec-title center">See what you actually get.</h2>
        <p className="sec-sub center">
          A full sample of the paid assessment. Illustrative, not a real client.
        </p>
        <div className="rpv">
          <div className="rpv-doc">
            <span className="chip">Sample Assessment</span>
            <div className="rp-banner">
              Illustrative example, not a real client. The numbers are estimates that show the shape
              of the deliverable, not results we are claiming.
            </div>
            <div className="rp-sec">
              <p className="eyebrow">The business</p>
              <p className="rp-body">
                A residential HVAC shop, about twelve trucks, Miami metro. Service and repair, some
                replacements. Good crew, full schedule, strong reviews. The owner&apos;s goal, more
                booked jobs without hiring.
              </p>
            </div>
            <div className="rp-sec">
              <p className="eyebrow">Executive read</p>
              <p className="rp-body">
                The work is not the problem. Demand is not the problem. Jobs are already coming in and
                slipping out before they reach the schedule. The main constraint is lead response, the
                gap between a call arriving and a person being free to answer it.
              </p>
            </div>
          </div>
          <div className="rpv-fade" aria-hidden="true" />
        </div>
        <div className="rpv-cta">
          <ButtonLink href="/sample-assessment" variant="outline" size="md" wrap>
            See what the assessment covers
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
