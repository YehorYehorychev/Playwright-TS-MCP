import { test, expect } from "@playwright/test";

test.describe("Make an appointment using MCP", () => {
  test("Should login and make an appointment successfully", async ({
    page,
  }) => {
    // Navigate to the website
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Verify page title
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Click Make Appointment button
    await page.getByRole("link", { name: "Make Appointment" }).click();

    // Wait for login page
    await expect(page.getByText("Please login to make")).toBeVisible();

    // Login with credentials
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Verify we're on Make Appointment page
    await expect(page.locator("h2")).toContainText("Make Appointment");

    // Fill appointment form
    // Select facility
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // Check hospital readmission
    await page.getByLabel("Apply for hospital readmission").check();

    // Select healthcare program
    await page.getByLabel("Medicaid").check();

    // Fill visit date - use the date picker calendar
    const dateField = page.getByRole("textbox", {
      name: "Visit Date (Required)",
    });
    await dateField.click();

    // Wait for calendar to appear
    await page.getByRole("table").waitFor({ state: "visible" });

    // Click on day 30 in January 2026 (use nth(1) to get the current month, not old day)
    await page.getByRole("cell", { name: "30", exact: true }).nth(1).click();

    // Fill comment
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a test appointment created via MCP automation");

    // Submit the form
    await page.getByRole("button", { name: "Book Appointment" }).click();

    // Verify appointment confirmation
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");

    // Verify appointment details are displayed
    await expect(
      page.getByText("Hongkong CURA Healthcare Center"),
    ).toBeVisible();
    await expect(page.getByText("Yes")).toBeVisible(); // Hospital readmission
    await expect(page.getByText("Medicaid")).toBeVisible();
    await expect(page.getByText("30/01/2026")).toBeVisible();
    await expect(
      page.getByText("This is a test appointment created via MCP automation"),
    ).toBeVisible();

    // Verify "Go to Homepage" link is visible
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
