const { test, expect } = require("@playwright/test");

const pages = [
  { route: "/", h1: "Scout- och lägergård nära Göteborg" },
  { route: "/stugor/", h1: "Stugorna" },
  { route: "/karta-over-omradet/", h1: "Karta över området" },
  { route: "/historia/", h1: "Historia" },
  { route: "/hyra/", h1: "Hyr friluftsgården Trollsjönäs" },
  { route: "/kontakt/", h1: "Kontakta oss" },
  { route: "/vagbeskrivning/", h1: "Vägbeskrivning" },
  { route: "/bilder/", h1: "Bilder" },
  { route: "/bilder/storstugan/", h1: /Storstugan/ },
  { route: "/bilder/patrullstugorna/", h1: /Patrullstugorna/ },
  { route: "/bilder/timmerstugorna/", h1: /Timmerhusen/ },
  { route: "/bilder/hygienanlaggningen/", h1: /Hygienanläggningen/ },
  { route: "/bilder/omradet/", h1: /Området/ },
];

test.describe("Page smoke tests", () => {
  for (const { route, h1 } of pages) {
    test(`${route} loads with correct heading and title`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(route);
      expect(response.status()).toBe(200);

      await expect(
        page.getByRole("heading", { name: h1, level: 1 }),
      ).toBeVisible();

      const title = await page.title();
      expect(title).toBeTruthy();

      expect(errors).toEqual([]);
    });
  }
});

test.describe("Stugor page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/stugor/");
  });

  const cabins = [
    "Storstugan",
    "Timmerstugorna",
    "Patrullstugorna",
    "Hygienanläggningen",
  ];

  for (const name of cabins) {
    test(`shows ${name} section with heading and gallery link`, async ({
      page,
    }) => {
      const heading = page.getByRole("heading", { name });
      await expect(heading).toBeVisible();

      // Each cabin section is wrapped in a div containing h3, image, and gallery link
      const section = heading.locator("..");
      await expect(
        section.getByRole("link", { name: "Fler bilder på stugan" }),
      ).toBeVisible();
    });
  }
});

test.describe("Karta page", () => {
  test("renders the map iframe", async ({ page }) => {
    await page.goto("/karta-over-omradet/");
    const iframe = page.locator("iframe");
    await expect(iframe).toBeVisible();
  });

  test("renders the overview image", async ({ page }) => {
    await page.goto("/karta-over-omradet/");
    const img = page.locator('img[alt="översiktsbild"]');
    await expect(img).toBeVisible();
  });
});

test.describe("Historia page", () => {
  test("renders history content", async ({ page }) => {
    await page.goto("/historia/");
    await expect(
      page.locator("text=Scoutkåren Göta Lejon startade 1945"),
    ).toBeVisible();
  });
});

test.describe("Vägbeskrivning page", () => {
  test("renders directions content", async ({ page }) => {
    await page.goto("/vagbeskrivning/");
    await expect(page.locator("text=Med bil")).toBeVisible();
    await expect(page.locator("text=Med kollektivtrafik")).toBeVisible();
    await expect(page.locator("text=Trollsjövägen 30")).toBeVisible();
  });
});

const gallerySubpages = [
  { route: "/bilder/storstugan/", name: "Storstugan" },
  { route: "/bilder/patrullstugorna/", name: "Patrullstugorna" },
  { route: "/bilder/timmerstugorna/", name: "Timmerhusen" },
  { route: "/bilder/hygienanlaggningen/", name: "Hygienanläggningen" },
  { route: "/bilder/omradet/", name: "Området" },
];

test.describe("Gallery subpages", () => {
  for (const { route, name } of gallerySubpages) {
    test(`${name} gallery has images and correct heading`, async ({ page }) => {
      await page.goto(route);

      await expect(page.getByRole("heading", { name, level: 1 })).toBeVisible();

      const images = page.locator("[class*='react-photo-album'] img");
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});
