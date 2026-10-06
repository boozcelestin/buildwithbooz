"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

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
      onSubmit={() => posthog.capture("checkout_started", { product })}
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
