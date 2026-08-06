"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    tokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) {
      return;
    }

    window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => tokenRef.current(token),
      "expired-callback": () => tokenRef.current(""),
      "error-callback": () => tokenRef.current(""),
    });
  }, [scriptReady, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        onLoad={() => setScriptReady(true)}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div aria-label="Security check" ref={containerRef} />
    </>
  );
}
