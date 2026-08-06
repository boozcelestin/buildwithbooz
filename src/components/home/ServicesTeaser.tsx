import { ButtonLink } from "@/src/components/site/ButtonLink";

const services = [
  { name: "Lead Response System", line: "Answer every lead in seconds." },
  { name: "Quote and Follow Up System", line: "Send quotes and chase them on their own." },
  { name: "Invoice and Payment System", line: "Get paid without chasing anyone." },
] as const;

export function ServicesTeaser() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="sec-title center">What we fix.</h2>
        <p className="sec-sub center">We do not sell you a tool. We find the leak, then build what pays.</p>
        <div className="steaser">
          {services.map((service) => (
            <div className="stitem" key={service.name}>
              <span className="stname">{service.name}</span>
              <span className="stline">{service.line}</span>
            </div>
          ))}
        </div>
        <div className="steaser-cta">
          <ButtonLink href="/services" variant="outline" size="md">
            See all services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
