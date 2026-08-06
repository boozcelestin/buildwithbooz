import { describe, expect, it } from "vitest";

import { createPageMetadata, productionSiteUrl, siteDescription } from "../../src/lib/site";

describe("site metadata", () => {
  it("keeps the production origin and exact site description in one place", () => {
    expect(productionSiteUrl).toBe("https://buildwithbooz.com");
    expect(siteDescription).toBe(
      "More booked jobs. No new ads. No new hires. I find where your business leaks calls, estimates, and jobs, then I build the systems that stop it.",
    );
  });

  it("builds canonical and social metadata for a public page", () => {
    expect(
      createPageMetadata({
        title: "Services",
        description: "It starts with a diagnosis. Then we build only what pays.",
        path: "/services",
      }),
    ).toMatchObject({
      title: "Services",
      alternates: { canonical: "/services" },
      openGraph: {
        title: "Services · BuildWithBooz",
        url: "/services",
      },
      twitter: {
        card: "summary",
        title: "Services · BuildWithBooz",
      },
    });
  });

  it("keeps placeholder pages out of search results", () => {
    expect(
      createPageMetadata({
        title: "Terms",
        description: "Placeholder legal copy.",
        path: "/terms",
        index: false,
      }),
    ).toMatchObject({ robots: { index: false, follow: false } });
  });
});
