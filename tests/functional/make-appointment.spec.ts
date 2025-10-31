import { test, expect } from "@playwright/test";

test.describe("Make an appointment", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    // 1. Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // Successful login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should be able to make an appointment", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();

    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "30" }).nth(1).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This a multi-line comments,\nplaywright codegen");
    await page.getByRole("button", { name: "Book Appointment" }).click();

    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByText("Please be informed that your")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Go to Homepage" })
    ).toBeVisible();
  });
});
