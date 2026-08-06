"use client";

import { useEffect } from "react";

import Clarity from "@microsoft/clarity";

export function ClarityInit() {
  useEffect(() => {
    Clarity.init("xy826jcy2c");
  }, []);

  return null;
}
