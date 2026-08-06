import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  constructEvent: vi.fn(),
  mutation: vi.fn(),
}));

vi.mock("stripe", () => ({
  default: class Stripe {
    webhooks = { constructEvent: mocks.constructEvent };
  },
}));

vi.mock("convex/browser", () => ({
  ConvexHttpClient: class ConvexHttpClient {
    mutation = mocks.mutation;
  },
}));

import { POST } from "../../app/api/stripe/webhook/route";

function request(body = "raw stripe body") {
  return new Request("https://buildwithbooz.com/api/stripe/webhook", {
    method: "POST",
    body,
    headers: { "stripe-signature": "valid-signature" },
  });
}

function completedEvent(eventId = "evt_assessment") {
  return {
    id: eventId,
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_assessment",
        payment_status: "paid",
        amount_total: 100_000,
        customer_email: "buyer@example.com",
        customer_details: { email: "buyer@example.com" },
        metadata: { purchase: "automation_assessment" },
      },
    },
  };
}

describe("Stripe assessment webhook", () => {
  beforeEach(() => {
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_test");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test");
    vi.stubEnv("CONVEX_URL", "https://example.convex.cloud");
    mocks.constructEvent.mockReset();
    mocks.mutation.mockReset();
  });

  it("rejects an invalid Stripe signature", async () => {
    mocks.constructEvent.mockImplementation(() => {
      throw new Error("invalid signature");
    });

    const response = await POST(request());

    expect(response.status).toBe(400);
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("returns 200 for an unrelated event without side effects", async () => {
    mocks.constructEvent.mockReturnValue({
      id: "evt_other",
      type: "payment_intent.succeeded",
      data: { object: {} },
    });

    const response = await POST(request());

    expect(response.status).toBe(200);
    expect(mocks.mutation).not.toHaveBeenCalled();
  });

  it("delegates replay idempotency to the Convex order mutation", async () => {
    const seenSessions = new Set<string>();
    let orderCount = 0;
    let emailCount = 0;
    mocks.constructEvent.mockReturnValue(completedEvent());
    mocks.mutation.mockImplementation(async (_reference, args) => {
      if (!seenSessions.has(args.sessionId)) {
        seenSessions.add(args.sessionId);
        orderCount += 1;
        emailCount += 1;
      }
      return "order_id";
    });

    expect((await POST(request())).status).toBe(200);
    expect((await POST(request())).status).toBe(200);
    expect(orderCount).toBe(1);
    expect(emailCount).toBe(1);
    expect(mocks.mutation).toHaveBeenCalledTimes(2);
  });
});
