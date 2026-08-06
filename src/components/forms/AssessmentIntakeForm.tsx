"use client";

import { type FormEvent, useState } from "react";

import { TurnstileWidget } from "./TurnstileWidget";

type AssessmentIntakeFormProps = {
  sessionId: string;
  initialEmail: string;
};

type FieldName =
  | "name"
  | "email"
  | "trade"
  | "businessName"
  | "website"
  | "phone"
  | "monthlyLeads"
  | "averageJobValue"
  | "leadSources"
  | "busyCallHandling"
  | "quoteFollowUp"
  | "currentTools"
  | "biggestOpportunity"
  | "anythingElse";

const requiredFields: FieldName[] = ["name", "email", "trade"];

function getFormValue(data: FormData, name: FieldName) {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}

export function AssessmentIntakeForm({ sessionId, initialEmail }: AssessmentIntakeFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const nextErrors: Partial<Record<FieldName, string>> = {};

    for (const field of requiredFields) {
      if (!getFormValue(data, field).trim()) {
        nextErrors[field] = "Required.";
      }
    }

    if (nextErrors.email === undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getFormValue(data, "email"))) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(nextErrors).length > 0 || !turnstileToken) {
      setErrors(nextErrors);
      setFormError(!turnstileToken ? "Please complete the security check." : "");
      return;
    }

    setErrors({});
    setFormError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/assessment/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          turnstileToken,
          ...Object.fromEntries(
            [
              "name",
              "email",
              "trade",
              "businessName",
              "website",
              "phone",
              "monthlyLeads",
              "averageJobValue",
              "leadSources",
              "busyCallHandling",
              "quoteFollowUp",
              "currentTools",
              "biggestOpportunity",
              "anythingElse",
            ].map((field) => [field, getFormValue(data, field as FieldName)]),
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Intake could not be stored.");
      }

      setSubmitted(true);
    } catch {
      setFormError("We could not send your intake. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="rp-body" role="status">
        Got it. Your intake is in. I will read it against your real numbers and get your assessment
        back to you within 48 hours. Watch your inbox.
      </p>
    );
  }

  const fieldError = (field: FieldName) =>
    errors[field] ? <span id={`${field}-error`}>{errors[field]}</span> : null;
  const fieldDescribedBy = (field: FieldName, helper?: string) =>
    [helper ? `${field}-helper` : null, errors[field] ? `${field}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const label = (id: string, text: string, required = false) => (
    <label htmlFor={id}>
      {text}
      {required ? <><span aria-hidden="true"> *</span><span className="visually-hidden"> required</span></> : null}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="eyebrow">Tell me about your business</h2>

      <div className="field">
        {label("assessment-name", "Your name", true)}
        <input aria-describedby={fieldDescribedBy("name")} aria-invalid={Boolean(errors.name)} aria-required="true" autoComplete="name" id="assessment-name" name="name" required type="text" />
        {fieldError("name")}
      </div>

      <div className="field">
        {label("assessment-email", "Best email", true)}
        <input aria-describedby={fieldDescribedBy("email")} aria-invalid={Boolean(errors.email)} aria-required="true" autoComplete="email" defaultValue={initialEmail} id="assessment-email" inputMode="email" name="email" required type="email" />
        {fieldError("email")}
      </div>

      <div className="field">
        {label("assessment-trade", "What your business does", true)}
        <input aria-describedby={fieldDescribedBy("trade", "Your trade, for example HVAC, plumbing, electrical, roofing.")} aria-invalid={Boolean(errors.trade)} aria-required="true" id="assessment-trade" name="trade" required type="text" />
        <span id="trade-helper">Your trade, for example HVAC, plumbing, electrical, roofing.</span>
        {fieldError("trade")}
      </div>

      <div className="field">{label("assessment-business-name", "Business name")}<input id="assessment-business-name" name="businessName" type="text" /></div>
      <div className="field">{label("assessment-website", "Website")}<input id="assessment-website" name="website" type="url" /></div>
      <div className="field">{label("assessment-phone", "Best phone")}<input autoComplete="tel" id="assessment-phone" name="phone" type="tel" /></div>

      <div className="field">
        {label("assessment-monthly-leads", "Roughly how many leads or calls a month")}
        <input aria-describedby="monthlyLeads-helper" id="assessment-monthly-leads" name="monthlyLeads" type="text" />
        <span id="monthlyLeads-helper">A ballpark is fine. Your best guess beats a blank.</span>
      </div>
      <div className="field">
        {label("assessment-average-job-value", "Your average job value")}
        <input aria-describedby="averageJobValue-helper" id="assessment-average-job-value" name="averageJobValue" type="text" />
        <span id="averageJobValue-helper">Rough average ticket. Directional is enough.</span>
      </div>
      <div className="field">
        {label("assessment-lead-sources", "How leads reach you now")}
        <textarea aria-describedby="leadSources-helper" id="assessment-lead-sources" name="leadSources" rows={3} />
        <span id="leadSources-helper">Calls, web forms, referrals, repeat customers, a mix.</span>
      </div>
      <div className="field">
        {label("assessment-busy-call-handling", "What happens to a call when everyone is busy")}
        <textarea aria-describedby="busyCallHandling-helper" id="assessment-busy-call-handling" name="busyCallHandling" rows={3} />
        <span id="busyCallHandling-helper">Voicemail, a receptionist, an app, nothing.</span>
      </div>
      <div className="field">
        {label("assessment-quote-follow-up", "Do you follow up on quotes, and how")}
        <textarea aria-describedby="quoteFollowUp-helper" id="assessment-quote-follow-up" name="quoteFollowUp" rows={3} />
        <span id="quoteFollowUp-helper">By hand, on a schedule, not really.</span>
      </div>
      <div className="field">
        {label("assessment-current-tools", "What tools you use now")}
        <textarea aria-describedby="currentTools-helper" id="assessment-current-tools" name="currentTools" rows={3} />
        <span id="currentTools-helper">CRM, scheduling, invoicing, or none yet.</span>
      </div>
      <div className="field">
        {label("assessment-biggest-opportunity", "The one thing that, if fixed, would matter most")}
        <textarea aria-describedby="biggestOpportunity-helper" id="assessment-biggest-opportunity" name="biggestOpportunity" rows={4} />
        <span id="biggestOpportunity-helper">In your words. This tells me where to point first.</span>
      </div>
      <div className="field">
        {label("assessment-anything-else", "Anything else I should know")}
        <textarea id="assessment-anything-else" name="anythingElse" rows={4} />
      </div>

      <TurnstileWidget onToken={setTurnstileToken} />
      {formError ? <p aria-live="assertive" className="form-error" role="alert">{formError}</p> : null}
      <button className="btn btn-primary btn-lg btn-block" disabled={submitting} type="submit">
        Send my intake
      </button>
    </form>
  );
}
