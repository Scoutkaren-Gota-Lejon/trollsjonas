const { test, expect } = require("@playwright/test");

test.describe("Booking Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt/");
  });

  test("form renders with all expected fields", async ({ page }) => {
    await expect(page.locator('input[name="organisation"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="antal"]')).toBeVisible();
    await expect(page.locator('input[name="kanoter"]')).toBeVisible();
    await expect(page.locator('textarea[name="other"]')).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Skicka förfrågan" })
    ).toBeVisible();
  });

  test("successful submission shows thank you message", async ({ page }) => {
    // Mock the booking API - must return valid JSON since handleResponse calls response.json()
    await page.route("**/api/booking.php", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      })
    );

    await page.fill('input[name="organisation"]', "Testförening");
    await page.fill('input[name="name"]', "Test Testsson");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0701234567");
    await page.fill('input[name="antal"]', "20");
    await page.fill('textarea[name="other"]', "Testmeddelande");

    await page.getByRole("button", { name: "Skicka förfrågan" }).click();

    await expect(
      page.locator("text=Tack för din förfrågan")
    ).toBeVisible({ timeout: 10000 });

    // Form should be hidden
    await expect(
      page.getByRole("button", { name: "Skicka förfrågan" })
    ).toBeHidden();
  });

  test("failed submission shows error message", async ({ page }) => {
    // Mock the booking API with error
    await page.route("**/api/booking.php", (route) =>
      route.fulfill({ status: 500, body: "Error" })
    );

    await page.fill('input[name="organisation"]', "Testförening");
    await page.fill('input[name="name"]', "Test Testsson");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0701234567");
    await page.fill('input[name="antal"]', "20");

    await page.getByRole("button", { name: "Skicka förfrågan" }).click();

    await expect(
      page.locator("text=Något gick fel")
    ).toBeVisible({ timeout: 10000 });

    // Form should still be visible
    await expect(
      page.getByRole("button", { name: "Skicka förfrågan" })
    ).toBeVisible();
  });

  test("submitted payload contains expected keys", async ({ page }) => {
    let capturedBody;

    await page.route("**/api/booking.php", (route) => {
      capturedBody = JSON.parse(route.request().postData());
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.fill('input[name="organisation"]', "Testförening");
    await page.fill('input[name="name"]', "Test Testsson");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "0701234567");
    await page.fill('input[name="antal"]', "20");
    await page.fill('textarea[name="other"]', "Info");

    await page.getByRole("button", { name: "Skicka förfrågan" }).click();

    await expect(
      page.locator("text=Tack för din förfrågan")
    ).toBeVisible({ timeout: 10000 });

    const expectedKeys = [
      "booking",
      "name",
      "email",
      "phone",
      "organisation",
      "antal",
      "kanoter",
      "from",
      "to",
      "other",
    ];
    for (const key of expectedKeys) {
      expect(capturedBody).toHaveProperty(key);
    }
  });
});
