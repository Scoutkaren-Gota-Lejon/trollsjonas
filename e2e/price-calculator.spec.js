const { test, expect } = require("@playwright/test");

test.describe("Price Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hyra/");
  });

  test("shows dash with no input", async ({ page }) => {
    await expect(page.locator("text=Pris: - kr")).toBeVisible();
  });

  test("20 persons × 3 days = 5400 kr", async ({ page }) => {
    await page.locator('input[name="count"]').click();
    await page.locator('input[name="count"]').fill("20");
    await page.locator('input[name="days"]').click();
    await page.locator('input[name="days"]').fill("3");
    await expect(page.locator("text=Pris: 5400 kr")).toBeVisible();
  });

  test("min 16 persons enforced: 5 persons × 2 days = 2880 kr", async ({
    page,
  }) => {
    await page.locator('input[name="count"]').click();
    await page.locator('input[name="count"]').fill("5");
    await page.locator('input[name="days"]').click();
    await page.locator('input[name="days"]').fill("2");
    // 16 * 90 * 2 = 2880
    await expect(page.locator("text=Pris: 2880 kr")).toBeVisible();
  });

  test("scouting discount: 20 persons × 1 day = 1500 kr", async ({
    page,
  }) => {
    await page.locator('input[name="count"]').click();
    await page.locator('input[name="count"]').fill("20");
    await page.locator('input[name="days"]').click();
    await page.locator('input[name="days"]').fill("1");
    await page.getByText("Scoutkår", { exact: true }).click();
    // 20 * 75 * 1 = 1500
    await expect(page.locator("text=Pris: 1500 kr")).toBeVisible();
  });

  test("clearing input returns to dash", async ({ page }) => {
    await page.locator('input[name="count"]').click();
    await page.locator('input[name="count"]').fill("20");
    await page.locator('input[name="days"]').click();
    await page.locator('input[name="days"]').fill("3");
    await expect(page.locator("text=Pris: 5400 kr")).toBeVisible();

    await page.locator('input[name="count"]').click();
    await page.locator('input[name="count"]').fill("");
    await expect(page.locator("text=Pris: - kr")).toBeVisible();
  });
});
