import { describe, expect, it, vi } from "vitest";

import { isRateLimited } from "../../convex/rateLimits";
import { verifyTurnstileToken } from "../../src/lib/turnstile";

describe("public form security", () => {
  it("rejects a missing Turnstile token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    await expect(verifyTurnstileToken("", "203.0.113.10")).resolves.toBe(false);
  });

  it("rejects an invalid Turnstile response", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 })));

    await expect(verifyTurnstileToken("invalid", "203.0.113.10")).resolves.toBe(false);
  });

  it("accepts a valid Turnstile response", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 })));

    await expect(verifyTurnstileToken("valid", "203.0.113.10")).resolves.toBe(true);
  });

  it("rejects either fixed window at its threshold", () => {
    expect(isRateLimited(7, 29)).toBe(false);
    expect(isRateLimited(8, 0)).toBe(true);
    expect(isRateLimited(0, 30)).toBe(true);
  });
});
