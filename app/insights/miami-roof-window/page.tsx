import type { Metadata } from "next";
import Link from "next/link";

import { RoofWindowStage } from "@/src/components/roof-window/RoofWindowStage";
import styles from "@/src/components/roof-window/roof-window.module.css";
import { SiteFooter } from "@/src/components/site/SiteFooter";
import { SiteHeader } from "@/src/components/site/SiteHeader";
import { ROOF_WINDOW_DATA, ROOF_WINDOW_PERMITS } from "@/src/features/roof-window/data";
import { getSiteUrl, siteName } from "@/src/lib/site";

const path = "/insights/miami-roof-window";
const title = "How Many Cool, Dry Hours Does a Miami Roofer Get Each Month?";
const description =
  "11 years of hourly NOAA readings at Miami International: about 11 dry daylight hours under a 90°F heat index in March, about 1 in August.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    siteName,
    title,
    description,
    url: path,
    publishedTime: "2026-11-13",
    authors: ["Booz Celestin"],
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const MAX = 14;
const permitMax = Math.max(...ROOF_WINDOW_PERMITS);

function ArticleJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How many cool, dry hours does a Miami roofer get each month?",
    description,
    datePublished: "2026-11-13",
    dateModified: "2026-11-13",
    author: { "@type": "Person", name: "Booz Celestin", url: `${siteUrl}/about` },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    mainEntityOfPage: `${siteUrl}${path}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}

export default function RoofWindowPage() {
  return (
    <>
      <SiteHeader active="insights" />
      <main id="main" className={styles.page}>
        <ArticleJsonLd />
        <div className={styles.wrap}>
          <header>
            <div className={styles.kicker}>
              <span>The Roof Window</span>
              <span>Miami weather, 2014 to 2024</span>
              <span>Updated November 13, 2026</span>
            </div>
            <h1>How many cool, dry hours does a Miami roofer get each month?</h1>
            <p className={styles.thesis}>
              From 2014 to 2024, the average March day at Miami International had about{" "}
              <b>11 dry daylight hours</b> with the heat index under 90°F, the National Weather
              Service&apos;s Extreme Caution line. The average August day had about <b>one</b>, though
              under the 103°F Danger line August still kept about 10, against about 12 in April.
            </p>
            <p className={`${styles.sub} ${styles.subTop}`}>
              Averages of 11 years and 96,310 hourly readings, measured in the shade at the airport.
              Every one of those years landed in a narrow band: March between 10.9 and 11.7 hours under
              90°F, August between 0.5 and 2.0.
            </p>
          </header>

          <RoofWindowStage />

          <section>
            <h2>How many dry daylight hours fall under each heat line?</h2>
            <p className={styles.sub}>
              Dry daylight hours on an average day, 2014 to 2024. From June to September the solid bar,
              under 90°F, falls to between 1.1 and 3.6 hours. The outline, under 103°F, stays between
              10.0 and 11.2.
            </p>
            <div className={styles.bars}>
              {ROOF_WINDOW_DATA.map((mo) => (
                <div className={styles.row} key={mo.m}>
                  <span className={styles.mo}>{mo.m}</span>
                  <div className={styles.track}>
                    <div className={styles.b103} style={{ width: `${(mo.w103 / MAX) * 100}%` }} />
                    <div className={styles.b90} style={{ width: `${(mo.w90 / MAX) * 100}%` }} />
                  </div>
                  <span className={styles.val}>{`${mo.w90.toFixed(1)} / ${mo.w103.toFixed(1)}`}</span>
                </div>
              ))}
              <div className={styles.axis}>
                <span />
                <div className={styles.ticks}>
                  {[0, 2, 4, 6, 8, 10, 12, 14].map((v) => (
                    <span key={v} style={{ left: `${(v / MAX) * 100}%` }}>
                      {v}
                    </span>
                  ))}
                </div>
                <span className={`${styles.val} ${styles.axisUnit}`}>h a day</span>
              </div>
            </div>
            <div className={styles.keyline}>
              <span>
                <i className={styles.k1} />
                Under 90°F (Extreme Caution line)
              </span>
              <span>
                <i className={styles.k2} />
                Under 103°F (Danger line)
              </span>
            </div>
          </section>

          <section className={styles.permits}>
            <h2>When do Miami roofing permits peak?</h2>
            <p className={styles.sub}>
              In the county permit feed, roofing permits averaged about 1,130 in March and 1,190 in April,
              the two busiest months, against about 870 to 900 a month from November to January. March and
              April are also the two months with the most dry daylight hours under 90°F. That is a pattern,
              not a cause. Permits also come after the phone call, since a permit gets pulled once the job
              is sold. County building department permits only, mostly unincorporated Miami Dade; the City
              of Miami, Hialeah and Miami Beach issue their own. Source: BuildWithBooz Miami Trades Data
              Brief, Nov 5, 2026, averages of November 2024 to October 2026.
            </p>
            <div className={styles.prow}>
              {ROOF_WINDOW_PERMITS.map((v, i) => (
                <div
                  className={i === 2 || i === 3 ? styles.hi : undefined}
                  key={ROOF_WINDOW_DATA[i].m}
                  style={{ height: `${(v / permitMax) * 100}%` }}
                  title={`${ROOF_WINDOW_DATA[i].m}: about ${v} roofing permits`}
                />
              ))}
            </div>
            <div className={styles.plab}>
              {ROOF_WINDOW_DATA.map((mo) => (
                <span key={mo.m}>{mo.m}</span>
              ))}
            </div>
          </section>

          <section className={styles.act}>
            <h2>What can a roofer do with this?</h2>
            <ul>
              <li>
                <b>Put the big tear offs in March and April.</b> Over these 11 years they averaged about
                11.3 and 10.6 dry daylight hours under 90°F, and in 16,074 routine hourly readings from
                those two months the heat index never once reached 103°F.
              </li>
              <li>
                <b>In July and August, start at first light.</b> At 7 a.m. in August the heat index was
                under 90°F on about 4 days in 10. By 9 a.m. it was 90°F or more on about 13 days in 14.
              </li>
              <li>
                <b>Keep estimates and inspections out of midday in summer.</b> In August, Danger level heat
                showed up most from 11 a.m. to 3 p.m., on up to about 1 day in 5, and rain or thunder
                peaked from 1 to 4 p.m., on about 1 day in 5 to 1 day in 4.
              </li>
            </ul>
          </section>

          <section className={styles.notes}>
            <div>
              <h4>What does this measure?</h4>
              <p>
                Hourly readings from the NOAA weather station at Miami International Airport, January 2014
                to December 2024, shown in local clock time with daylight saving applied.
              </p>
              <p>
                Heat index uses the National Weather Service formula. Categories follow the NWS: Caution 80
                to 90°F, Extreme Caution 90 to 103°F, Danger 103 to 124°F, Extreme Danger 125°F or higher.
              </p>
            </div>
            <div>
              <h4>What doesn&apos;t it measure?</h4>
              <p>
                Station readings are taken in the shade. The NWS says full sunshine can raise the heat
                index by up to 15°F. A roof in full sun is hotter than this chart.
              </p>
              <p>
                An hour counts as rainy when the airport logged measurable rain or reported rain, showers
                or thunder. Storms are local, so a job site a few miles away can differ.
              </p>
            </div>
            <div>
              <h4>Where do the numbers come from?</h4>
              <p>
                <a href="https://www.ncei.noaa.gov/products/land-based-station/local-climatological-data">
                  NOAA Local Climatological Data
                </a>
                , station 72202012839.
              </p>
              <p>
                <a href="https://www.weather.gov/ama/heatindex">NWS heat index categories</a> and{" "}
                <a href="https://www.weather.gov/safety/heat-index">NWS heat safety</a>.
              </p>
              <p>
                Roofing permits: Miami Dade County building permits feed, permits whose description
                mentions a roof (a rough filter), November 2024 to October 2026. County building
                department only, mostly unincorporated Miami Dade.
              </p>
            </div>
          </section>

          <p className={styles.close}>
            When rain stops the crew at 1 p.m., the office is still open. Those are the hours when
            callbacks and estimates get handled, or go cold.
          </p>
          <p className={styles.next}>
            When a roofer is up top, who answers the phone? <Link href="/gap-finder">Run the Gap Finder</Link>{" "}
            to see what happens to those calls.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
