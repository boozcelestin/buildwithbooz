import { getSiteUrl, siteDescription, siteName } from "@/src/lib/site";

// Public profiles that belong to BuildWithBooz and its founder. Search engines and AI
// assistants use these sameAs links to tie the name to the site. Add Instagram here once
// the account is set up.
const businessProfiles = ["https://www.linkedin.com/company/buildwithbooz/"];
const founderProfiles = ["https://www.linkedin.com/in/booz-celestin/"];

export function LocalBusinessJsonLd() {
  const siteUrl = getSiteUrl();
  const businessId = `${siteUrl}/#business`;
  const founderId = `${siteUrl}/#founder`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        logo: `${siteUrl}/icon.svg`,
        image: `${siteUrl}/images/about/booz-celestin.webp`,
        email: "booz@buildwithbooz.com",
        founder: { "@id": founderId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Miami",
          addressRegion: "FL",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Miami-Dade County, Florida",
        },
        priceRange: "$1,000 and up",
        sameAs: businessProfiles,
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: "Booz Celestin",
        jobTitle: "Founder",
        url: `${siteUrl}/about`,
        worksFor: { "@id": businessId },
        sameAs: founderProfiles,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        publisher: { "@id": businessId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}
