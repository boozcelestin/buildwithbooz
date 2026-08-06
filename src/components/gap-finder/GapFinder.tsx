"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { ButtonLink } from "@/src/components/site/ButtonLink";
import {
  gapFinderQuestions,
  getAnswerLabel,
  getGoalId,
} from "@/src/features/gap-finder/questions";
import { rankLeaks } from "@/src/features/gap-finder/ranking";
import { assembleResults } from "@/src/features/gap-finder/results";
import type { GapFinderSourceContext } from "@/src/features/gap-finder/types";

type EmailStatus = "idle" | "saving" | "saved";

async function storeCompletion(
  completionToken: string,
  optionIds: string[],
  email: string | null,
  sourceContext?: GapFinderSourceContext,
) {
  const response = await fetch("/api/gap-finder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completionToken, optionIds, email, sourceContext }),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error("Gap Finder completion could not be stored.");
  }
}

function buildContactHref(
  completionToken: string,
  optionIds: string[],
  rankedLeaks: string[],
  sourceContext?: GapFinderSourceContext,
) {
  const params = new URLSearchParams({
    source: "gap_finder",
    gapFinderCompletion: completionToken,
    answers: optionIds.join(","),
    leaks: rankedLeaks.join(","),
    goal: optionIds[0],
  });

  if (sourceContext) {
    params.set("calculator", sourceContext.calculator);
    if (sourceContext.calculatorResult) {
      params.set("calculatorResult", sourceContext.calculatorResult);
    }
  }

  return `/contact?${params.toString()}`;
}

type GapFinderProps = {
  standalone?: boolean;
  sourceContext?: GapFinderSourceContext;
};

export function GapFinder({ sourceContext, standalone = false }: GapFinderProps) {
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [completionToken, setCompletionToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const complete = optionIds.length === gapFinderQuestions.length;
  const currentQuestion = gapFinderQuestions[Math.min(optionIds.length, gapFinderQuestions.length - 1)];
  const goal = complete ? getGoalId(optionIds) : null;
  const rankedLeaks = useMemo(
    () => (goal ? rankLeaks(goal, optionIds) : []),
    [goal, optionIds],
  );
  const results = useMemo(
    () => (goal ? assembleResults(goal, rankedLeaks) : []),
    [goal, rankedLeaks],
  );

  useEffect(() => {
    if (optionIds.length === 0) {
      return;
    }

    if (complete) {
      resultHeadingRef.current?.focus();
    } else {
      questionHeadingRef.current?.focus();
    }
  }, [complete, optionIds.length]);

  function answer(optionId: string) {
    if (complete) {
      return;
    }

    const nextOptionIds = [...optionIds, optionId];
    setOptionIds(nextOptionIds);

    if (nextOptionIds.length === gapFinderQuestions.length) {
      const token = crypto.randomUUID();
      setCompletionToken(token);
      void storeCompletion(token, nextOptionIds, null, sourceContext).catch(() => undefined);
    }
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!completionToken || emailStatus !== "idle") {
      return;
    }

    setEmailStatus("saving");

    try {
      await storeCompletion(completionToken, optionIds, email, sourceContext);
      setEmailStatus("saved");
    } catch {
      setEmailStatus("idle");
    }
  }

  const contactHref = completionToken
    ? buildContactHref(completionToken, optionIds, rankedLeaks, sourceContext)
    : "/contact";

  return (
    <section className="section section-border" id="gapfinder">
      <div className="container">
        {standalone ? (
          <h1 className="sec-title">Start here.</h1>
        ) : (
          <h2 className="sec-title">Start here.</h2>
        )}
        <p className="sec-sub">
          Answer seven quick questions. See where your business is most likely leaking, and what to
          look at first.
        </p>
        <div className="gf-grid">
          <div>
            {!complete ? (
              <div className="gf-card">
                <div className="gf-progress" aria-hidden="true">
                  {gapFinderQuestions.map((question, index) => (
                    <span
                      className={index < optionIds.length ? "done" : undefined}
                      key={question.id}
                    />
                  ))}
                </div>
                <p className="gf-count">
                  {optionIds.length + 1} / {gapFinderQuestions.length}
                </p>
                <h3 className="gf-q" ref={questionHeadingRef} tabIndex={-1}>
                  {currentQuestion.question}
                </h3>
                <div className="gf-opts">
                  {currentQuestion.options.map((option) => (
                    <button
                      className="gf-opt"
                      key={option.id}
                      onClick={() => answer(option.id)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="gf-buy">
                  <Link href="/services">See what the full assessment covers</Link>
                </div>
              </div>
            ) : (
              <div className="gf-result" role="status">
                <p className="gfr-intro">{results[0]?.block.introduction}</p>
                <div className="gfr-cards">
                  {results.map((result, index) => (
                    <div className="gfr-card" key={result.leak}>
                      <span className={`gfr-tag ${index === 0 ? "hi" : "mi"}`}>
                        {index === 0 ? "High" : "Worth a look"}
                      </span>
                      <h3
                        className="gfr-h"
                        ref={index === 0 ? resultHeadingRef : undefined}
                        tabIndex={index === 0 ? -1 : undefined}
                      >
                        {result.block.title}
                      </h3>
                      <p className="gfr-p">{result.block.body}</p>
                    </div>
                  ))}
                </div>
                <p className="gfr-note">
                  This is a read from seven answers, not a measurement. The assessment is where we
                  confirm it against your real numbers.
                </p>
                <div className="gfr-email">
                  {emailStatus === "saved" ? (
                    <p className="gfr-email-done">Got it.</p>
                  ) : (
                    <form onSubmit={submitEmail}>
                      <label htmlFor="gap-finder-email">
                        Want your results and a short plan for fixing your biggest leak sent to you?
                      </label>
                      <div className="gfr-email-row">
                        <input
                          autoComplete="email"
                          id="gap-finder-email"
                          inputMode="email"
                          name="email"
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@business.com"
                          required
                          type="email"
                          value={email}
                        />
                        <button
                          className="btn btn-primary btn-md"
                          disabled={emailStatus === "saving"}
                          type="submit"
                        >
                          Send it
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                <div className="gfr-actions">
                  <ButtonLink href="/services" size="md" wrap>
                    See what the full assessment covers
                  </ButtonLink>
                  <ButtonLink href={contactHref} size="md" variant="outline" wrap>
                    Send this to Booz
                  </ButtonLink>
                  <Link className="tlink" href="/process">
                    Read how this works
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="dash-wrap dark-zone">
            <div className="dash-card">
              <div className="dash-head">
                <span className="dash-title">Your read</span>
                <span className="dash-range">
                  <span className="live-dot" aria-hidden="true" />
                  Based on your seven answers
                </span>
              </div>
              <div className="dash-rows">
                {gapFinderQuestions.map((question, index) => {
                  const answerLabel = optionIds[index]
                    ? getAnswerLabel(index, optionIds[index])
                    : null;

                  return (
                    <div className="drow" key={question.id}>
                      <span className="drow-lbl">{question.label}</span>
                      <span className={`drow-val${answerLabel ? "" : " empty"}`}>
                        {answerLabel ?? "·"}
                      </span>
                    </div>
                  );
                })}
              </div>
              {complete ? (
                <div className="dash-areas">
                  {results.map((result, index) => (
                    <div className="darea" key={result.leak}>
                      <span className="darea-name">{result.block.title}</span>
                      <span className={`impact ${index === 0 ? "hi" : "mi"}`}>
                        {index === 0 ? "High" : "Worth a look"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
