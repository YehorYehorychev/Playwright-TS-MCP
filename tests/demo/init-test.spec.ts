import { test, expect } from "@playwright/test";

test("Should load homepage with correct title", async ({ page }) => {
  // 1. Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }) => {
  // 1. Open the page and wait for full load
  await page.goto("https://katalon-demo-cura.herokuapp.com/", {
    waitUntil: "domcontentloaded",
  });

  // 2. Wait for header to appear before clicking
  const header = page.locator("//h1");
  await expect(header).toBeVisible();

  // 3. Click the header safely
  await header.click();

  // 4. Optional: verify something after click
  await expect(page).toHaveURL(/herokuapp/);
});
