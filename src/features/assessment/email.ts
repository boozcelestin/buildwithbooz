const intakePath = "/assessment/thank-you";

export function buildAssessmentEmail({
  sessionId,
  firstName,
}: {
  sessionId: string;
  firstName?: string;
}) {
  const siteUrl = (process.env.SITE_URL ?? "https://buildwithbooz.com").replace(/\/+$/, "");
  const intakeUrl = `${siteUrl}${intakePath}?session_id=${encodeURIComponent(sessionId)}`;
  const greeting = `Hi ${firstName?.trim() || "there"},`;
  const subject = "Your Automation Assessment is underway";
  const preheader = "One short intake from you and the clock starts.";
  const text = `${greeting}

Thank you for buying the Automation Assessment. This note confirms it is underway.

Here is the plan. If you have not filled the intake yet, that is the one thing I need from you. It takes about ten minutes, and it is what makes your assessment specific to your shop instead of generic.

Fill out your intake
${intakeUrl}

Within 48 hours of getting your intake, you get the assessment. A full diagnosis of where the business leaks calls, quotes, and jobs, with three to seven fixes ranked by what pays.

There is no call to book and no hoop to jump through. If you have a question, reply to this email. It comes straight to me.

Booz
BuildWithBooz`;
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111111;max-width:600px">
<p style="color:#666666">${preheader}</p>
<p>${greeting}</p>
<p>Thank you for buying the Automation Assessment. This note confirms it is underway.</p>
<p>Here is the plan. If you have not filled the intake yet, that is the one thing I need from you. It takes about ten minutes, and it is what makes your assessment specific to your shop instead of generic.</p>
<p><a href="${intakeUrl}" style="display:inline-block;background:#111111;color:#ffffff;padding:12px 18px;text-decoration:none">Fill out your intake</a></p>
<p>Within 48 hours of getting your intake, you get the assessment. A full diagnosis of where the business leaks calls, quotes, and jobs, with three to seven fixes ranked by what pays.</p>
<p>There is no call to book and no hoop to jump through. If you have a question, reply to this email. It comes straight to me.</p>
<p>Booz<br />BuildWithBooz</p>
</div>`;

  return { subject, preheader, html, text };
}
