const { test, expect } = require("@playwright/test");

test.describe("Navigation", () => {
  test("homepage loads with Trollsjönäs in content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toContainText("Trollsjönäs");
  });

  test("all expected menu links are present", async ({ page }) => {
    await page.goto("/");
    const expectedLinks = [
      "Start",
      "Stugor",
      "Karta över området",
      "Bilder",
      "Historia",
      "Hyr lägergård nära Göteborg",
      "Kontakta oss",
      "Vägbeskrivning",
    ];
    for (const link of expectedLinks) {
      await expect(
        page.getByRole("link", { name: link, exact: true })
      ).toBeVisible();
    }
  });

  test("clicking a menu link navigates to correct page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Historia", exact: true }).click();
    await expect(page).toHaveURL(/\/historia\/?/);
    await expect(
      page.getByRole("heading", { name: "Historia" })
    ).toBeVisible();
  });

  test("404 page renders for unknown URLs", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist/");
    expect(response.status()).toBe(404);
  });

  test("mobile viewport: hamburger menu toggles visibility", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuLink = page.getByRole("link", { name: "Historia", exact: true });

    // Menu links should be hidden initially on mobile
    await expect(menuLink).toBeHidden();

    // Click the menu toggle label
    await page.locator("label[for='menu-button']").click();

    // Menu links should now be visible
    await expect(menuLink).toBeVisible();
  });
});
