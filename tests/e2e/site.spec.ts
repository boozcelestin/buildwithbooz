import { expect, test } from "@playwright/test";

test.describe("public site launch smoke checks", () => {
  test("public routes render", async ({ page }) => {
    for (const route of [
      "/",
      "/about",
      "/services",
      "/assessment",
      "/process",
      "/gap-finder",
      "/insights",
      "/blog",
      "/contact",
      "/enterprise",
      "/sample-assessment",
      "/privacy",
      "/terms",
      "/tools/missed-call-revenue-calculator",
    ]) {
      const response = await page.goto(route);
      expect(response?.ok(), route).toBeTruthy();
      await expect(page.locator("main#main")).toBeVisible();
    }
  });

  test("services sends the assessment purchase handoff to the assessment page", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByRole("link", { name: "See the assessment" })).toHaveAttribute(
      "href",
      "/assessment",
    );
    await expect(page.getByText("$1,000", { exact: true })).toBeVisible();
  });

  test("mobile navigation is keyboard addressable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/services");
    const toggle = page.locator("button.nav-toggle");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
  });

  test("Gap Finder reaches a live result after seven answers", async ({ page }) => {
    await page.goto("/gap-finder");
    await expect(page.locator(".gf-opt").first()).toBeVisible();

    for (let answer = 0; answer < 7; answer += 1) {
      await page.locator(".gf-opt").first().click();
      if (answer < 6) {
        await expect(page.locator(".gf-opt").first()).toBeVisible();
      }
    }

    await expect(page.locator(".gf-result")).toBeVisible();
    await expect(page.locator(".gfr-card")).toHaveCount(3);
  });

  test("SEO endpoints and draft protection are present", async ({ page, request }) => {
    await page.goto("/privacy");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain("/tools/missed-call-revenue-calculator");
    expect(sitemapText).not.toContain("/tools/lost-quote-calculator");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Disallow: /api/");
  });
});
