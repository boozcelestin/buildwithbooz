import { ButtonLink } from "@/src/components/site/ButtonLink";

export function ClosingCta() {
  return (
    <section className="fcta dark-zone">
      <div className="fcta-inner">
        <div>
          <h2>Clarity first. Growth next.</h2>
          <p>Fix what costs you. Build what pays you.</p>
          <div className="trust-row">
            <span>Free to start</span>
            <span>No long term commitment</span>
            <span>Confidential</span>
          </div>
        </div>
        <ButtonLink href="/gap-finder" size="lg">
          Run the Gap Finder
        </ButtonLink>
      </div>
    </section>
  );
}
