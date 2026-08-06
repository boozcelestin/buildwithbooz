import { ButtonLink } from "@/src/components/site/ButtonLink";

export function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-one">
        <h1 className="hero-hl">
          <span className="y">More booked jobs.</span>
          <br />
          No new ads.
          <br />
          No new hires.
        </h1>
        <p className="hero-sub">
          The jobs are already coming to you. I find where they slip away before they reach your
          schedule, and fix what pays.
        </p>
        <ul className="hero-bullets">
          <li>Find the biggest leaks</li>
          <li>See what to fix first</li>
          <li>Know what each fix is worth</li>
        </ul>
        <div className="hero-cta">
          <ButtonLink href="/gap-finder" size="lg" wrap>
            See what is holding your business back
          </ButtonLink>
        </div>
        <div className="trust-row">
          <span>Free to start</span>
          <span>No long term commitment</span>
          <span>Confidential</span>
        </div>
      </div>
    </section>
  );
}
