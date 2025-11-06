import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";

test.describe(
  "Make an appointment",
  {
    annotation: {
      type: "Story",
      description: "JIRA-1234: Make appointment feature",
    },
  },
  () => {
    test.beforeEach("Login with valid creds", async ({ page }, testInfo) => {
      // Get the url ffrom the config file
      const envConfig = testInfo.project.use as any;

      // Custom logs
      await log("info", `Launching the web app in ${envConfig.envName} env`);

      // 1. Launch URL and assert title and header
      // await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await page.goto(envConfig.appURL);
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

      // 2. Click on the Make Appointment
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      // Successful login
      await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
      await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();

      // Assert a text
      await expect(page.locator("h2")).toContainText("Make Appointment");
      await log("info", "The login is successful...");
    });

    test(
      "Should make an appointment with non-default values",
      {
        annotation: {
          type: "Bug",
          description: "Defect: 1234 - Does not work in Firefox",
        },
        tag: "@smoke",
      },
      async ({ page, browserName }, testInfo) => {
        // skip the test for firefox
        test.skip(browserName === "firefox", "Open bug ID: 1234");
        // Dropdown
        await page
          .getByLabel("Facility")
          .selectOption("Hongkong CURA Healthcare Center");

        // Checkbox
        await page.getByText("Apply for hospital readmission").click();

        // Radio button
        await page.getByText("Medicaid").click();

        // Date input box
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .click();
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .fill("05/10/2027");
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .press("Enter");

        // Multi-line comments input box
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page
          .getByRole("textbox", { name: "Comment" })
          .fill(
            "This is a multi-line comments\ncaptured by Playwright codegen!"
          );

        // Button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        // Assertion
        await expect(page.locator("h2")).toContainText(
          "Appointment Confirmation"
        );
        await expect(
          page.getByRole("link", { name: "Go to Homepage" })
        ).toBeVisible();

        // Add custom screenshot at test scope level
        // @TODO add this as a helper function
        const screenshot = await page.screenshot({ fullPage: true });
        testInfo.attach("Login Page", {
          body: screenshot,
          contentType: "image/png",
        });
      }
    );
  }
);
