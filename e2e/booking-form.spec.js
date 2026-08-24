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

  test("dates can be typed and reach the payload", async ({ page }) => {
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

    // Typed directly rather than picked from the calendar.
    await page.fill('input[name="from"]', "2030-06-15");
    await page.fill('input[name="to"]', "2030-06-20");
    await page.locator('input[name="antal"]').click();

    await page.getByRole("button", { name: "Skicka förfrågan" }).click();

    await expect(
      page.locator("text=Tack för din förfrågan")
    ).toBeVisible({ timeout: 10000 });

    expect(capturedBody.from).toBe("2030-06-15");
    expect(capturedBody.to).toBe("2030-06-20");
  });

  // react-datepicker's default middleware is flip + offset + arrow, none of
  // which constrain the cross axis, so the calendar used to hang off the edge
  // of the viewport. DateField adds shift + size to keep it on screen.
  for (const width of [1024, 414, 375, 320]) {
    test(`calendar stays on screen at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/kontakt/");

      for (const name of ["from", "to"]) {
        await page.locator(`input[name="${name}"]`).click();
        const calendar = page.locator(".react-datepicker").first();
        await calendar.waitFor({ state: "visible" });

        const box = await calendar.boundingBox();
        expect(box.x, `${name} clears the left edge`).toBeGreaterThanOrEqual(0);
        expect(
          box.x + box.width,
          `${name} clears the right edge`
        ).toBeLessThanOrEqual(width);

        await page.keyboard.press("Escape");
      }
    });
  }

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
