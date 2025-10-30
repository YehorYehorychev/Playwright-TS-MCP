import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Recorded test (TestGen)
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByRole("heading", { name: "Make Appointment" })
  ).toBeVisible();
});
