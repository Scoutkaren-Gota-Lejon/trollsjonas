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
    await page.locator("[class*='react-photo-album'] img").first().click();
    await expect(page.getByRole("dialog", { name: "Lightbox" })).toBeVisible({ timeout: 5000 });
  });
});
