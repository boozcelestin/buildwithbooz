"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type PurchaseEventProps = {
  transactionId: string;
  value: number;
  currency: string;
  item: string;
};

export function PurchaseEvent({ transactionId, value, currency, item }: PurchaseEventProps) {
  useEffect(() => {
    const key = `ga_purchase_${transactionId}`;
    let alreadySent = false;

    try {
      alreadySent = window.sessionStorage.getItem(key) !== null;
      window.sessionStorage.setItem(key, "1");
    } catch {
      alreadySent = false;
    }

    if (alreadySent) {
      return;
    }

    sendGAEvent("event", "purchase", {
      transaction_id: transactionId,
      value,
      currency,
      items: [{ item_name: item }],
    });
  }, [transactionId, value, currency, item]);

  return null;
}
