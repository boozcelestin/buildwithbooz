import Link from "next/link";

import { getCalculatorDefinition } from "@/src/features/calculators/definitions";

const faqs = getCalculatorDefinition("missed-call-revenue-calculator")?.faqs ?? [];

export function MissedCallHub() {
  return (
    <section className="section-border" aria-labelledby="mc-hub">
      <div className="art-wrap art-body">
        <h2 id="mc-hub">A missed call is a job someone else got</h2>
        <p>
          A missed call is not really a missed call. It is a job that went to whoever picked up
          next. The number above comes from your own figures, so it is a read on your shop, not an
          average of someone else&apos;s.
        </p>

        <h2>How the number is worked out</h2>
        <p>
          The calculator multiplies four things. The calls you get in a week. The share you miss or
          send to voicemail. How often a caller you reach becomes a customer. And what a job is
          worth to you. Then it turns that week into a month and a year.
        </p>
        <p>
          It assumes every caller you missed was as likely to hire you as the ones you reached. That
          is generous. Some were price shopping. Some called back. Some needed work you do not do.
          So set the close rate a little lower than your real one, and read the result as the size
          of the leak, not a promise.
        </p>

        <h2>What it costs in your trade</h2>
        <p>
          <strong>HVAC.</strong> HVAC calls do not come in evenly. They pile up on the first hot
          week of summer and the first hard freeze, when every phone in town rings at once, which is
          exactly when you are too busy to answer. A missed tune up is a lost afternoon. A missed no
          heat call in January is a bigger ticket, and that homeowner is not waiting for a callback.
          Put in the value of the calls you miss in a rush week, not your average for the year.
        </p>
        <p>
          <strong>Plumbing.</strong> A burst pipe is not a leave a message situation. Plumbing calls
          are some of the most urgent in the trades, so the homeowner dials the next plumber before
          your phone stops ringing. Run the numbers twice: once with a routine job, once with a real
          emergency job. The gap between the two answers is what one missed emergency costs you.
        </p>
        <p>
          <strong>Electrical.</strong> Fewer calls, bigger stakes. A dead panel, a safety problem,
          an EV charger install. When fewer calls come in, each one you miss is a bigger share of
          the week. If panel or EV work is where you want to grow, a missed call there is growth you
          handed to someone else.
        </p>
        <p>
          <strong>Roofing.</strong> Roofing phones run quiet, then a storm fills them for a week.
          Tickets are big, so one missed call can be the most expensive miss on this page. Set the
          job value to a real roof and the calls to a storm week to see what one week of voicemail
          costs.
        </p>

        <h2>What the calculator cannot see</h2>
        <p>
          It can be wrong in both directions. It may count a few callers who were never going to
          hire you. And it cannot see the ones you never knew about: the customer who got your
          voicemail, hung up and never called back, the referral that customer would have sent, or
          what it costs to be known as the shop that is hard to reach.
        </p>
        <p>
          Here is the best data we found.{" "}
          <a
            href="https://www.callrail.com/blog/missed-calls-cost-businesses-more-than-ever"
            rel="noopener noreferrer"
            target="_blank"
          >
            CallRail
          </a>{" "}
          asked 1,000 US consumers what they do when a business does not answer. Only 42% said they
          leave a voicemail, and 21% said they immediately call another business. Those are answers
          people gave about themselves, in a survey from a company that sells call tracking. Treat
          them as a direction, not a law.
        </p>
        <p>
          What nobody has measured well is how many missed calls turn into lost jobs. We looked. The
          figures you see repeated online, like &quot;85% never call back,&quot; have no study
          behind them that we could find. That is why the close rate field is yours to set.
        </p>

        <h2>What actually fixes it</h2>
        <p>
          There are four honest fixes, and each catches a different caller. A person who answers. An
          answering service. A missed call text back that reaches the caller in seconds. An AI
          receptionist.
        </p>
        <p>
          Each one also misses something. A text back does nothing for the caller with water on the
          kitchen floor who needs a person right now. An answering service costs you every month
          whether it books work or not. An AI receptionist can mishear an address, or book a time
          when no tech is free. And sometimes the cheapest fix is not a tool at all. A set callback
          window. A phone that rings two people instead of one.
        </p>
        <p>
          The right fix depends on where your calls leak, and when. If you are not sure which leak
          is costing you the most, the <Link href="/gap-finder">Gap Finder</Link> takes a couple of
          minutes and shows you where to look first.
        </p>

        <h2>Questions owners ask</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
