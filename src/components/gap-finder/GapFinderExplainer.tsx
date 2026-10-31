import Link from "next/link";

const faqs: { q: string; a: string }[] = [
  {
    q: "How long does it take?",
    a: "A couple of minutes. Seven questions, and you pick an answer for each one.",
  },
  {
    q: "Do I have to give my email?",
    a: "No. Your results show on the screen. If you want them sent to you with a short plan for your top leak, you can add your email after you see them. Your call.",
  },
  {
    q: "Is it really free?",
    a: "Yes. No card, no call, no catch.",
  },
  {
    q: "What happens to my answers?",
    a: "If you add your email, or send your results to me, your answers are saved so I can help and so the tool keeps improving. If you do not, nothing is stored. Your results show on your screen and clear when you close the page.",
  },
  {
    q: "I came here from the calculator. Why?",
    a: "The calculator shows what missed calls might be costing you. The Gap Finder checks whether missed calls are really your biggest leak, or whether something else should come first.",
  },
  {
    q: "What if I want help fixing what it finds?",
    a: "You can send your results to me straight from the page, and I read every one myself. You will not have to answer the same questions twice.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function GapFinderExplainer() {
  return (
    <section className="section-border" aria-labelledby="gf-about">
      <div className="art-wrap art-body">
        <h2 id="gf-about">What the Gap Finder is</h2>
        <p>
          The Gap Finder is a free check that shows where a trades business is most likely losing
          calls, quotes and jobs.
        </p>
        <p>
          You answer seven questions about how your shop actually runs. It tells you which leak to
          look at first, and why that one comes before the rest.
        </p>
        <p>No email to see your results. No sales call. A couple of minutes, and you can do it from the truck.</p>

        <h2>Why it starts with your goal</h2>
        <p>
          The first question is not about your phones. It asks what would make this a better
          business to run a year from now.
        </p>
        <p>
          That is on purpose. A leak only matters if it stands between you and where you want to go.
          The owner who wants his Saturdays back needs a different first fix than the owner who wants
          to put a second crew on the road. Same shop. Same problems. Different order.
        </p>
        <p>So the Gap Finder starts with where you are headed, then looks at where you are.</p>

        <h2>The seven questions, and what each one is looking for</h2>
        <ol>
          <li>
            <strong>A year from now, what would make this a better business to run?</strong> This
            sets the goal everything else is measured against.
          </li>
          <li>
            <strong>What kind of work do you do?</strong> An emergency plumbing call and a roof
            estimate leak in different places.
          </li>
          <li>
            <strong>Where does it feel stuck right now?</strong> Your own read. Owners are usually
            close to the answer, even when they cannot put a name on it.
          </li>
          <li>
            <strong>When a call or message comes in and nobody is free, what usually happens?</strong>{" "}
            The first leak in most shops. A homeowner with water on the kitchen floor does not wait
            for a callback. They dial the next name on the list.
          </li>
          <li>
            <strong>After you send a quote and the customer goes quiet, what happens?</strong> A
            quote nobody chases is a job you already did the work to win, then let walk.
          </li>
          <li>
            <strong>Day to day, who keeps the phone, the follow up, and the schedule from dropping?</strong>{" "}
            If the honest answer is you, the business can only grow as far as your day stretches.
          </li>
          <li>
            <strong>The customers you have already done good work for, how often do you reach back out?</strong>{" "}
            Past customers are the easiest work you will ever book. Most shops never call them again.
          </li>
        </ol>

        <h2>What you get back</h2>
        <p>A short, plain read of your answers:</p>
        <ul>
          <li>The areas where your shop is most likely leaking, in order.</li>
          <li>The one to look at first, and why it goes first.</li>
          <li>What fixing it usually involves, in plain words.</li>
        </ul>
        <p>
          There is no score out of 100. A number like that looks precise and tells you very little.
          Two shops can land on the same score and need completely different fixes. You get an order
          of attack instead, so you know what to do Monday morning.
        </p>

        <h2>Why it looks at what you already have</h2>
        <p>Most advice for a slow month sounds the same. Run more ads. Buy more leads.</p>
        <p>
          But if calls go to voicemail and quotes go cold, more leads just means more people falling
          through the same holes. You pay twice. Once for the ad, and again for the job you lost.
        </p>
        <p>
          So the Gap Finder looks at the work already coming to you first. The calls you already get.
          The quotes you already send. The customers who already like you. You already paid for all
          of it.
        </p>
        <p>
          Small fixes also stack. Say three parts of the shop each get 10% better: more calls
          answered, more quotes closed, more past customers booking again. Those gains multiply, so
          together they come to a little over 33%, not 30%. Nothing heroic. Three leaks, closed.
        </p>

        <h2>What it will not do</h2>
        <p>
          It does not see your numbers, so it cannot tell you what a leak costs in dollars. For a
          quick dollar figure on missed calls, use the{" "}
          <Link href="/tools/missed-call-revenue-calculator">Missed Call Revenue Calculator</Link>.
          For the full picture worked from your real figures, that is what the{" "}
          <Link href="/assessment">Automation Assessment</Link> is for.
        </p>
        <p>
          And sometimes the right answer is that nothing needs fixing yet. If your answers say the
          shop is in good shape, it will tell you that. I would rather say so than sell you something
          you do not need.
        </p>

        <h2>Who built it</h2>
        <p>
          I&apos;m Booz. I spent about ten years running Endgame Marketing, helping local businesses
          get more calls. The pattern I kept seeing was simple. The leads worked, and the businesses
          still struggled, because the money was leaking after the phone rang.
        </p>
        <p>The Gap Finder asks the questions I would ask if I were standing in your shop.</p>

        <h2>Questions owners ask</h2>
        {faqs.map((faq) => (
          <div key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  );
}
