import type { Metadata } from "next";

export const siteName = "BuildWithBooz";
export const siteDescription =
  "More booked jobs. No new ads. No new hires. I find where your business leaks calls, estimates, and jobs, then I build the systems that stop it.";
export const productionSiteUrl = "https://buildwithbooz.com";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || productionSiteUrl;
  return new URL(configuredUrl).origin;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} · ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      title: socialTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
    ...(!index ? { robots: { index: false, follow: false } } : {}),
  };
}
