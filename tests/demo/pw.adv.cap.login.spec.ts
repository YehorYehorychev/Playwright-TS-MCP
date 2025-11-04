import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    // 1. Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/", {
      timeout: 60_000,
    }); // ✅ will run over the config option
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });
});
