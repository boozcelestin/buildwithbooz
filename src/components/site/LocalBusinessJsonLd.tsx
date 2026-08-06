import { getSiteUrl, siteDescription, siteName } from "@/src/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: getSiteUrl(),
    description: siteDescription,
    founder: {
      "@type": "Person",
      name: "Booz Celestin",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    priceRange: "$1,000 and up",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}
