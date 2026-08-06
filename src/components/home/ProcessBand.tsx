const steps = [
  {
    number: "1",
    title: "Discovery Call",
    description: "You talk, I listen. I learn exactly how your business runs.",
    artifact: "A shared picture of how your business really runs.",
  },
  {
    number: "2",
    title: "The Diagnosis",
    description: "I go through your operation and find where the money leaks.",
    artifact: "A plain list of where money leaks.",
  },
  {
    number: "3",
    title: "Your Report",
    description: "Three to seven fixes, ranked by what makes the most money.",
    artifact: "A ranked, priced plan you own.",
  },
  {
    number: "4",
    title: "Review Call",
    description: "We go through it together. You decide what gets built first.",
    artifact: "Your call on what comes first.",
  },
] as const;

export function ProcessBand() {
  return (
    <section className="section process-band dark-zone">
      <div className="container">
        <h2 className="sec-title center sec-title-light">Four steps to find what is actually broken.</h2>
        <div className="psteps">
          {steps.map((step, index) => (
            <div className="pstep" key={step.number}>
              <div className="pnum" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="ptitle">{step.title}</h3>
              <p className="pstep-desc">{step.description}</p>
              <div className="pstep-art">
                <div className="a-box">
                  <p className="a-lbl">Artifact</p>
                  <p className="a-val">{step.artifact}</p>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <span className="pstep-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
