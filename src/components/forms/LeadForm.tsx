"use client";

import { type FormEvent, useRef, useState } from "react";

import type { LeadContext, LeadFormKind } from "@/src/features/leads/types";

type LeadFormProps = {
  context?: LeadContext;
  kind: LeadFormKind;
};

function formText(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}

export function LeadForm({ context, kind }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submissionToken = useRef<string | null>(null);
  const enterprise = kind === "enterprise";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    submissionToken.current ??= crypto.randomUUID();
    const data = new FormData(event.currentTarget);
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionToken: submissionToken.current,
          formKind: kind,
          name: formText(data, "name"),
          email: formText(data, "email"),
          phone: formText(data, "phone"),
          company: formText(data, "company"),
          businessType: formText(data, "businessType"),
          message: formText(data, "message"),
          ...(context ? { context } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Lead could not be stored.");
      }

      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="startdone on" role="status">
        <div className="donecheck" aria-hidden="true">
          ✓
        </div>
        <h1 className="doneh">Got it.</h1>
        <p className="donep">
          {enterprise
            ? "I will get back to you personally."
            : "I read every one of these myself. If it looks like a fit, I will reach out soon. Either way I will point you toward something useful."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h1 className="starth">
        {enterprise ? "For larger and custom work." : "Let us find your biggest gap."}
      </h1>
      <p className="startsub">
        {enterprise
          ? "If you are running something bigger than a local shop, this is the place. Tell me what you are dealing with and I will get back to you personally."
          : "Sixty seconds. I read every one of these myself. No bots, no call center."}
      </p>

      <div className="field">
        <label htmlFor={`${kind}-name`}>Name</label>
        <input
          autoComplete="name"
          id={`${kind}-name`}
          name="name"
          placeholder="Your name"
          type="text"
        />
      </div>

      <div className="field">
        <label htmlFor={`${kind}-email`}>Email</label>
        <input
          autoComplete="email"
          id={`${kind}-email`}
          inputMode="email"
          name="email"
          placeholder="you@business.com"
          required
          type="email"
        />
      </div>

      <div className="field">
        <label htmlFor={`${kind}-phone`}>Phone</label>
        <input
          autoComplete="tel"
          id={`${kind}-phone`}
          inputMode="tel"
          name="phone"
          placeholder="(305) 555 0100"
          type="tel"
        />
      </div>

      {enterprise ? (
        <div className="field">
          <label htmlFor="enterprise-company">Company</label>
          <input
            autoComplete="organization"
            id="enterprise-company"
            name="company"
            placeholder="Your company"
            type="text"
          />
        </div>
      ) : (
        <div className="field">
          <label htmlFor="contact-business-type">Business type</label>
          <select id="contact-business-type" name="businessType" defaultValue="">
            <option value="">Choose one</option>
            <option>HVAC</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Roofing</option>
            <option>Contracting</option>
            <option>Landscaping</option>
            <option>Other</option>
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor={`${kind}-message`}>
          {enterprise ? "What are you dealing with?" : "What do you most want to fix or grow right now?"}
        </label>
        <textarea
          id={`${kind}-message`}
          name="message"
          placeholder={
            enterprise
              ? "The situation, the goal, and what you have already tried."
              : "Tell me what is going on. The more real detail, the sharper my reply."
          }
          required
          rows={enterprise ? 5 : 4}
        />
      </div>

      <button className="btn btn-primary btn-lg btn-block" disabled={submitting} type="submit">
        Send it
      </button>
      {!enterprise ? (
        <p className="starttrust">Delivered in 48 hours. No long term commitment. Confidential.</p>
      ) : null}
    </form>
  );
}
