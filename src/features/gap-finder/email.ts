import { assembleResults } from "./results";
import type { GoalId, LeakId } from "./types";

type GapFinderEmailInput = {
  goal: GoalId;
  rankedLeaks: LeakId[];
  assessmentUrl: string;
};

export type GapFinderEmailContent = {
  subject: string;
  html: string;
  text: string;
};

const placeholderIntroduction =
  "Thanks for running the Gap Finder. Below is the read from your seven answers, your most likely leak, why it matters, and a simple first step. It is a starting point, not a full measurement, but it usually points at the right place to look first.";
const placeholderAssessment =
  "When you are ready to go past the read, the Automation Assessment is the next step. I go through your actual numbers and hand you a prioritized plan for fixing your biggest leaks, worst first, ranked by what puts the most money back the fastest. The fee is credited toward the build if you decide to move forward, so it is not money spent twice.";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildGapFinderEmail({
  goal,
  rankedLeaks,
  assessmentUrl,
}: GapFinderEmailInput): GapFinderEmailContent {
  const results = assembleResults(goal, rankedLeaks);
  const [topResult, ...otherResults] = results;

  if (!topResult) {
    throw new Error("A Gap Finder email needs at least one ranked leak.");
  }

  const safeAssessmentUrl = escapeHtml(assessmentUrl);
  const resultCards = otherResults
    .map(
      ({ block }) => `
        <div style="border-top:1px solid #deded8;padding:22px 0 0;margin-top:22px;">
          <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;color:#777777;margin:0 0 8px;">Worth a look</p>
          <h3 style="font-size:20px;line-height:1.2;margin:0 0 10px;color:#111111;">${escapeHtml(block.title)}</h3>
          <p style="font-size:15px;line-height:1.7;margin:0;color:#555555;">${escapeHtml(block.body)}</p>
        </div>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your BuildWithBooz Gap Finder result</title>
  </head>
  <body style="margin:0;background:#fafaf8;color:#111111;font-family:'Hanken Grotesk',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${placeholderIntroduction}</div>
    <div style="max-width:620px;margin:0 auto;padding:32px 18px 48px;">
      <div style="background:#111111;color:#ffffff;padding:18px 22px;border-bottom:5px solid #f2c522;">
        <p style="font-size:20px;font-weight:700;margin:0;">BuildWithBooz<span style="color:#f2c522;">.</span></p>
      </div>
      <div style="background:#ffffff;border:1px solid #deded8;padding:32px 26px;">
        <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;color:#777777;margin:0 0 10px;">Your Gap Finder result</p>
        <h1 style="font-size:30px;line-height:1.1;letter-spacing:-0.7px;margin:0 0 18px;">Your biggest likely leak</h1>
        <p style="font-size:16px;line-height:1.7;color:#555555;margin:0 0 28px;">${placeholderIntroduction}</p>

        <div style="background:#111111;color:#ffffff;padding:24px;border-left:5px solid #f2c522;">
          <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;color:#f2c522;margin:0 0 8px;">High</p>
          <h2 style="font-size:24px;line-height:1.2;margin:0 0 12px;">${escapeHtml(topResult.block.title)}</h2>
          <p style="font-size:15px;line-height:1.7;margin:0 0 12px;color:#e8e8e5;">${escapeHtml(topResult.block.introduction)}</p>
          <p style="font-size:15px;line-height:1.7;margin:0;color:#e8e8e5;">${escapeHtml(topResult.block.body)}</p>
        </div>

        <div style="background:#fff8d6;border:1px solid #f2c522;padding:22px;margin-top:22px;">
          <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;color:#5b4a00;margin:0 0 8px;">A short plan</p>
          <p style="font-size:15px;line-height:1.7;margin:0;color:#111111;">${escapeHtml(topResult.block.plan)}</p>
        </div>

        ${resultCards}

        <p style="font-size:13px;line-height:1.6;color:#777777;margin:28px 0 0;">This is a read from seven answers, not a measurement. The assessment is where we confirm it against your real numbers.</p>
      </div>

      <div style="background:#f2c522;padding:28px 26px;">
        <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;color:#5b4a00;margin:0 0 8px;">The Automation Assessment</p>
        <h2 style="font-size:26px;line-height:1.15;margin:0 0 6px;">$1,000</h2>
        <p style="font-size:15px;line-height:1.65;margin:0 0 20px;">${placeholderAssessment}</p>
        <a href="${safeAssessmentUrl}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 20px;">Start the assessment</a>
      </div>

      <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888888;text-align:center;margin:22px 0 0;">BuildWithBooz</p>
    </div>
  </body>
</html>`;

  const textResults = otherResults
    .map(({ block }) => `Worth a look\n${block.title}\n${block.body}`)
    .join("\n\n");
  const text = [
    "Your BuildWithBooz Gap Finder result",
    placeholderIntroduction,
    `Your biggest likely leak\n${topResult.block.title}`,
    topResult.block.introduction,
    topResult.block.body,
    `A short plan\n${topResult.block.plan}`,
    textResults,
    "This is a read from seven answers, not a measurement. The assessment is where we confirm it against your real numbers.",
    `The $1,000 Automation Assessment\n${placeholderAssessment}`,
    `Start the assessment\n${assessmentUrl}`,
    "BuildWithBooz",
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    subject: "Your BuildWithBooz Gap Finder result",
    html,
    text,
  };
}
