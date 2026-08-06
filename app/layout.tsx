import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { ReactNode } from "react";

import { ClarityInit } from "@/src/components/site/ClarityInit";
import { LocalBusinessJsonLd } from "@/src/components/site/LocalBusinessJsonLd";
import { getSiteUrl, siteDescription, siteName } from "@/src/lib/site";

import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BuildWithBooz · More booked jobs. No new ads. No new hires.",
    template: "%s · BuildWithBooz",
  },
  description:
    siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
  },
  verification: {
    other: {
      "msvalidate.01": "84AF155FA6459051175EBA620F93D50A",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body>
        <LocalBusinessJsonLd />
        <ClarityInit />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <GoogleAnalytics gaId="G-46RJX0G3N6" />
      </body>
    </html>
  );
}
