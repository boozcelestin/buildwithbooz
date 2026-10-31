"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";
import { sendGAEvent } from "@next/third-parties/google";

type CheckoutButtonProps = {
  children: ReactNode;
  product: "assessment" | "operations_blueprint";
  size?: "md" | "lg";
};

export function CheckoutButton({ children, product, size = "md" }: CheckoutButtonProps) {
  return (
    <form
      action="/api/stripe/checkout"
      method="post"
      onSubmit={() => {
        posthog.capture("checkout_started", { product });
        sendGAEvent("event", product === "assessment" ? "assessment_checkout" : "blueprint_checkout", { product });
      }}
    >
      {product === "operations_blueprint" ? (
        <input name="product" type="hidden" value="operations_blueprint" />
      ) : null}
      <button className={`btn btn-primary btn-${size} btn-wrap`} type="submit">
        {children}
      </button>
    </form>
  );
}
