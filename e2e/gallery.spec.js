const { test, expect } = require("@playwright/test");

test.describe("Gallery", () => {
  test("gallery index has links to sub-galleries", async ({ page }) => {
    await page.goto("/bilder/");
    const links = page.locator("a");
    await expect(links.filter({ hasText: "Storstugan" })).toBeVisible();
    await expect(links.filter({ hasText: "Patrullstugorna" })).toBeVisible();
  });

  test("gallery page shows image thumbnails", async ({ page }) => {
    await page.goto("/bilder/storstugan/");
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test("clicking a thumbnail opens a lightbox overlay", async ({ page }) => {
    await page.goto("/bilder/storstugan/");

    // Click the first gallery tile image
    await page.locator(".ReactGridGallery_tile").first().click();

    // Lightbox should appear as an overlay
    await expect(
      page.locator("[class*='lightbox'], [id*='lightbox'], [role='dialog']")
    ).toBeVisible({ timeout: 5000 });
  });
});
