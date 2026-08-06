import type {
  CalculatorDefinition,
  CalculatorResult,
  CalculatorSlug,
} from "./types";

export const calculatorSlugs: CalculatorSlug[] = [
  "missed-call-revenue-calculator",
  "lost-quote-calculator",
  "slow-payment-calculator",
  "customer-reactivation-calculator",
  "job-margin-calculator",
  "should-you-run-more-ads",
];

export const publicCalculatorSlugs: CalculatorSlug[] = ["missed-call-revenue-calculator"];

function formatCurrency(value: number) {
  const rounded = Math.round(value);
  const amount = `$${Math.abs(rounded).toLocaleString("en-US")}`;
  return rounded < 0 ? `−${amount}` : amount;
}

function formatCurrencyTwo(value: number) {
  const amount = `$${Math.abs(value).toFixed(2)}`;
  return value < 0 ? `−${amount}` : amount;
}

function formatInteger(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function formatRaw(value: number) {
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function contextNumber(value: number) {
  return String(Number(value.toFixed(2)));
}

function hasEveryValue(values: Record<string, number>, fields: string[]) {
  return fields.every((field) => Boolean(values[field]));
}

const missedCall: CalculatorDefinition = {
  slug: "missed-call-revenue-calculator",
  metaTitle: "Missed Call Revenue Calculator for Trades Businesses",
  metaDescription:
    "See what unanswered calls are costing your trades business every month. Free calculator, no signup.",
  title: "Missed Call Revenue Calculator",
  subtitle: "Find out what unanswered calls are quietly costing your business every month.",
  inputs: [
    { id: "calls", label: "Calls you get in a week", defaultValue: 40 },
    {
      id: "misspct",
      label: "Percent of those calls you miss or send to voicemail",
      defaultValue: 20,
      suffix: "%",
    },
    { id: "jobvalue", label: "Average value of a job", defaultValue: 450, prefix: "$" },
    {
      id: "closerate",
      label: "Of the callers you reach, the percent who become customers",
      defaultValue: 50,
      suffix: "%",
    },
  ],
  button: "Show me the number",
  message: [
    "Missed calls are costing you about ",
    { value: "monthly" },
    " every month. That is close to ",
    { value: "yearly" },
    " a year in work walking to whoever picked up.",
  ],
  insight:
    "Most people who reach a voicemail do not leave one. They call the next name on the list. A system that texts them back the second you miss the call turns most of these back into booked jobs.",
  primaryCta: "See where else your business is leaking",
  faqs: [
    {
      question: "How is the cost of a missed call calculated?",
      answer:
        "We take the calls you miss, apply how often you would have won that job, and multiply by the value of the job. It is an estimate to show the scale, not a promise.",
    },
    {
      question: "Do people really not leave a voicemail?",
      answer:
        "Most do not. When someone has an urgent problem, they call the next business. The one who answers, or texts back fast, usually wins the job.",
    },
    {
      question: "What fixes this?",
      answer:
        "An automatic text back the moment a call is missed, so the customer hears from you in seconds instead of never. That is the Lead Response system.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["calls", "misspct", "jobvalue", "closerate"])) {
      return null;
    }

    const missedPerWeek = values.calls * (values.misspct / 100);
    const missedPerMonth = missedPerWeek * 4.3;
    const recoverableJobs = missedPerMonth * (values.closerate / 100);
    const monthlyLoss = recoverableJobs * values.jobvalue;
    const yearlyLoss = monthlyLoss * 12;

    return {
      big: formatCurrency(monthlyLoss),
      tone: "bad",
      values: {
        monthly: formatCurrency(monthlyLoss),
        yearly: formatCurrency(yearlyLoss),
      },
      contextValue: contextNumber(monthlyLoss),
    };
  },
};

const lostQuote: CalculatorDefinition = {
  slug: "lost-quote-calculator",
  metaTitle: "Lost Quote Calculator for Contractors and Trades",
  metaDescription:
    "See how much revenue you lose to quotes that go quiet, and what following up could win back. Free tool.",
  title: "Lost Quote Calculator",
  subtitle: "See what quotes that go quiet are costing you, and what a few reminders could win back.",
  inputs: [
    { id: "quotes", label: "Quotes or estimates you send in a month", defaultValue: 20 },
    { id: "quotevalue", label: "Average value of a quote", defaultValue: 1200, prefix: "$" },
    {
      id: "winrate",
      label: "Percent of quotes that turn into jobs right now",
      defaultValue: 30,
      suffix: "%",
    },
    {
      id: "recoverpct",
      label: "Of the quotes that go quiet, the percent you believe a few reminders could win back",
      defaultValue: 20,
      suffix: "%",
    },
  ],
  button: "Show me the number",
  message: [
    "Following up on quiet quotes could be worth about ",
    { value: "monthly" },
    " a month. That is close to ",
    { value: "yearly" },
    " a year you are currently letting go cold.",
  ],
  insight:
    "A quote with no reply is not always a no. Often it is a maybe that never got a nudge. A few polite, automatic follow ups recover a real share of them, without you having to remember.",
  primaryCta: "See where else your business is leaking",
  faqs: [
    {
      question: "Why does following up recover jobs?",
      answer:
        "Most owners send one quote and move on. The customer gets busy and forgets. A short, friendly reminder brings a meaningful share of those back with no discount and no pressure.",
    },
    {
      question: "What number should I put for how many come back?",
      answer:
        "Start with 20 percent. It is a conservative estimate. Lower it if you want to be cautious, raise it if your work is in high demand.",
    },
    {
      question: "What fixes this?",
      answer:
        "An automatic follow up sequence that chases every quote for you, so nothing sits and goes cold. That is the Quote and Follow Up system.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["quotes", "quotevalue", "winrate", "recoverpct"])) {
      return null;
    }

    const quietQuotes = values.quotes * (1 - values.winrate / 100);
    const recoveredJobs = quietQuotes * (values.recoverpct / 100);
    const monthlyRecovered = recoveredJobs * values.quotevalue;
    const yearlyRecovered = monthlyRecovered * 12;

    return {
      big: formatCurrency(monthlyRecovered),
      tone: "good",
      values: {
        monthly: formatCurrency(monthlyRecovered),
        yearly: formatCurrency(yearlyRecovered),
      },
      contextValue: contextNumber(monthlyRecovered),
    };
  },
};

const slowPayment: CalculatorDefinition = {
  slug: "slow-payment-calculator",
  metaTitle: "Slow Payment and Unpaid Invoice Calculator for Trades",
  metaDescription:
    "See what late and unpaid invoices are costing your trades business every year. Free calculator.",
  title: "Slow Payment Calculator",
  subtitle: "See what late and unpaid invoices are really costing you.",
  inputs: [
    { id: "invoices", label: "Invoices you send in a month", defaultValue: 30 },
    { id: "invamount", label: "Average invoice amount", defaultValue: 600, prefix: "$" },
    {
      id: "neverpaid",
      label: "Percent of invoices that never get paid",
      defaultValue: 5,
      suffix: "%",
    },
    {
      id: "paidlate",
      label: "Percent of invoices that get paid late",
      defaultValue: 30,
      suffix: "%",
    },
  ],
  button: "Show me the number",
  message: [
    "You are writing off about ",
    { value: "monthly" },
    " a month in invoices that never get paid. That is close to ",
    { value: "yearly" },
    " a year, gone. On top of that, roughly ",
    { value: "late" },
    " invoices a month get paid late, tying up cash you have already earned.",
  ],
  insight:
    "Most unpaid and late invoices are not bad customers. They are busy ones who let it slip. Automatic reminders and a pay by text link get most invoices paid faster, and shrink the pile that never gets paid at all.",
  primaryCta: "See where else your business is leaking",
  faqs: [
    {
      question: "Why count late payments if they eventually pay?",
      answer:
        "Money you earned but have not collected is money you cannot use. Late payments quietly strangle cash flow even when nothing is written off.",
    },
    {
      question: "How do reminders help?",
      answer:
        "Most people pay the moment it is easy and top of mind. A gentle automatic reminder with a payment link does both, so you are not the one chasing.",
    },
    {
      question: "What fixes this?",
      answer:
        "Automatic invoice reminders and a tap to pay link. That is the Invoice and Payment system.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["invoices", "invamount", "neverpaid", "paidlate"])) {
      return null;
    }

    const writtenOffPerMonth = values.invoices * (values.neverpaid / 100) * values.invamount;
    const writtenOffPerYear = writtenOffPerMonth * 12;
    const latePerMonth = values.invoices * (values.paidlate / 100);

    return {
      big: formatCurrency(writtenOffPerMonth),
      tone: "bad",
      values: {
        monthly: formatCurrency(writtenOffPerMonth),
        yearly: formatCurrency(writtenOffPerYear),
        late: formatInteger(latePerMonth),
      },
      contextValue: contextNumber(writtenOffPerMonth),
    };
  },
};

const reactivation: CalculatorDefinition = {
  slug: "customer-reactivation-calculator",
  metaTitle: "Customer Reactivation Revenue Calculator for Trades",
  metaDescription:
    "See how much revenue is sitting in your past customer list. Free calculator, no signup.",
  title: "Customer Reactivation Calculator",
  subtitle: "See how much revenue is sitting quietly in your old customer list.",
  inputs: [
    { id: "pastcustomers", label: "Past customers in your list", defaultValue: 500 },
    { id: "jobvalue", label: "Average value of a job", defaultValue: 450, prefix: "$" },
    {
      id: "returnpct",
      label: "Percent you think would book again with a nudge",
      defaultValue: 10,
      suffix: "%",
    },
  ],
  button: "Show me the number",
  message: [
    "One good reach out to your old customers could be worth about ",
    { value: "campaign" },
    ". That is work sitting in a list you already own.",
  ],
  insight:
    "Your past customers already trust you. A simple, well timed message brings a real share of them back, and it costs almost nothing compared to chasing strangers.",
  primaryCta: "See where else your business is leaking",
  faqs: [
    {
      question: "How can old customers be worth this much?",
      answer:
        "You already paid to win them once. A short message reminding them you are there brings a steady share back, at almost no cost.",
    },
    {
      question: "What percent should I use?",
      answer:
        "Start with 10 percent for a single campaign. Lower it to be safe, raise it if your customers buy from you often.",
    },
    {
      question: "What fixes this?",
      answer:
        "A simple reactivation message to your list, sent on a schedule, so past customers come back on their own.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["pastcustomers", "jobvalue", "returnpct"])) {
      return null;
    }

    const returningJobs = values.pastcustomers * (values.returnpct / 100);
    const campaignValue = returningJobs * values.jobvalue;

    return {
      big: formatCurrency(campaignValue),
      tone: "good",
      values: { campaign: formatCurrency(campaignValue) },
      contextValue: contextNumber(campaignValue),
    };
  },
};

const jobMargin: CalculatorDefinition = {
  slug: "job-margin-calculator",
  metaTitle: "Job Margin Calculator for Contractors and Trades",
  metaDescription:
    "Work out the real profit and margin on any job. Free calculator for trades businesses.",
  title: "Job Margin Calculator",
  subtitle: "Work out what a job actually makes you, after everything.",
  inputs: [
    { id: "price", label: "Price you charge for the job", defaultValue: 3000, prefix: "$" },
    { id: "labor", label: "Labor cost", defaultValue: 1200, prefix: "$" },
    { id: "materials", label: "Materials cost", defaultValue: 800, prefix: "$" },
    {
      id: "overhead",
      label: "Overhead you put against this job",
      defaultValue: 300,
      prefix: "$",
    },
  ],
  button: "Show me the margin",
  message: [
    "This job makes you ",
    { value: "profit" },
    ", a margin of ",
    { value: "margin" },
    " percent.",
  ],
  insight:
    "If your margins look fine but the business still feels tight, the problem is usually not your price. It is volume slipping somewhere between the first call and the paid invoice.",
  primaryCta: "See where your business is leaking",
  faqs: [
    {
      question: "What counts as overhead on a job?",
      answer:
        "The slice of your fixed costs that this job should carry: your vehicle, insurance, phone, software, the time you spend quoting and scheduling. A rough share is fine.",
    },
    {
      question: "What is a good margin for trades work?",
      answer:
        "It varies by trade, but many healthy trades businesses aim for 20 to 35 percent net on a job. Below 10 is a warning sign.",
    },
    {
      question: "My margins are fine but money is tight. Why?",
      answer:
        "Good margins on paper do not help if jobs leak before they close or invoices go unpaid. That is a volume and collection problem, not a pricing one.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["price", "labor", "materials", "overhead"])) {
      return null;
    }

    const totalCost = values.labor + values.materials + values.overhead;
    const profit = values.price - totalCost;
    const margin = Math.round((profit / values.price) * 100);
    const marginText = `${margin < 0 ? "−" : ""}${Math.abs(margin).toLocaleString("en-US")}`;
    let verdict: string;

    if (margin < 10) {
      verdict = "That is thin. One slow day or one surprise cost can wipe out the whole profit.";
    } else if (margin < 20) {
      verdict = "Workable, but there is not much room for error. Small overruns hurt.";
    } else if (margin <= 35) {
      verdict = "A healthy margin for trades work. Protect it.";
    } else {
      verdict = "Strong. The question becomes whether you are winning enough of these.";
    }

    return {
      big: formatCurrency(profit),
      side: `${marginText}%`,
      tone: margin < 10 ? "bad" : margin >= 20 ? "good" : undefined,
      values: {
        profit: formatCurrency(profit),
        margin: marginText,
      },
      contextValue: contextNumber(profit),
      verdict,
    };
  },
};

const moreAds: CalculatorDefinition = {
  slug: "should-you-run-more-ads",
  metaTitle: "Should You Run More Ads? Free Calculator for Trades Businesses",
  metaDescription:
    "Before you spend more on ads, see whether your funnel can hold what you already pay for. Free tool.",
  title: "Should You Run More Ads?",
  subtitle: "Before you spend more on ads, see whether your funnel can hold the leads you already pay for.",
  inputs: [
    { id: "adspend", label: "What you spend on ads in a month", defaultValue: 2000, prefix: "$" },
    { id: "leads", label: "Leads those ads bring in a month", defaultValue: 50 },
    {
      id: "reachpct",
      label: "Percent of those leads you actually reach or reply to",
      defaultValue: 60,
      suffix: "%",
    },
    {
      id: "closepct",
      label: "Of the leads you reach, the percent who become jobs",
      defaultValue: 40,
      suffix: "%",
    },
    { id: "jobvalue", label: "Average value of a job", defaultValue: 450, prefix: "$" },
  ],
  button: "Run the numbers",
  message: [
    "Right now every dollar you spend on ads brings back about ",
    { value: "return" },
    ". But you are only reaching ",
    { value: "reach" },
    " percent of the leads you pay for. The ones you miss are worth about ",
    { value: "missed" },
    " a month.",
  ],
  insight:
    "More traffic does not fix a leaky funnel. It just pours more water into the same holes. The cheapest growth is usually catching what you already pay for.",
  primaryCta: "Find your biggest leak first",
  faqs: [
    {
      question: "Are you telling me not to run ads?",
      answer:
        "No. Ads work when the funnel behind them is tight. This tool just checks whether you are ready to spend more, or leaking what you already spend.",
    },
    {
      question: "What does return per dollar mean?",
      answer:
        "It is the revenue your ads bring divided by what you spend. Above one means the ads make money on paper. It says nothing about the leads you never reached.",
    },
    {
      question: "What fixes a leaky funnel?",
      answer:
        "Answering and following up fast and automatically, so the leads you paid for do not slip away. That starts with finding where the leak is.",
    },
  ],
  calculate(values) {
    if (!hasEveryValue(values, ["adspend", "leads", "reachpct", "closepct", "jobvalue"])) {
      return null;
    }

    const leadsReached = values.leads * (values.reachpct / 100);
    const jobs = leadsReached * (values.closepct / 100);
    const revenue = jobs * values.jobvalue;
    const returnPerDollar = revenue / values.adspend;
    const missedLeads = values.leads * (1 - values.reachpct / 100);
    const missedValue = missedLeads * (values.closepct / 100) * values.jobvalue;
    const verdict =
      values.reachpct < 70
        ? "Before you spend more on ads, plug the leak. You already paid for leads you are not catching. Fixing that is cheaper than buying more."
        : "Your funnel is fairly tight. More ads could pay. Just watch your response time as the volume climbs, because that is the first thing to slip.";

    return {
      big: formatCurrencyTwo(returnPerDollar),
      values: {
        return: formatCurrencyTwo(returnPerDollar),
        reach: formatRaw(values.reachpct),
        missed: formatCurrency(missedValue),
      },
      contextValue: contextNumber(returnPerDollar),
      verdict,
    };
  },
};

export const calculatorDefinitions: Record<CalculatorSlug, CalculatorDefinition> = {
  "missed-call-revenue-calculator": missedCall,
  "lost-quote-calculator": lostQuote,
  "slow-payment-calculator": slowPayment,
  "customer-reactivation-calculator": reactivation,
  "job-margin-calculator": jobMargin,
  "should-you-run-more-ads": moreAds,
};

export function getCalculatorDefinition(slug: string): CalculatorDefinition | null {
  return calculatorDefinitions[slug as CalculatorSlug] ?? null;
}

export function calculateDefaults(definition: CalculatorDefinition): CalculatorResult | null {
  return definition.calculate(
    Object.fromEntries(definition.inputs.map((input) => [input.id, input.defaultValue])),
  );
}
