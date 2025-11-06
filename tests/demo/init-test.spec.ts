import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";
import { log } from "../helpers/logger.js";

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

test("Should demo locators", async ({ page }) => {
  // ✅ `page.getBy*()` and `page.locator()` methods returns the `locator` object
  // ✅ The above methods not to be `awaited`
  // ✅ The type of locator is an `object`
  // ✅ Locators are LAZY until an action is fired on them

  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on the Make Appointment
  let makeAppmtBtn = page.getByRole("link", { name: "Invalid Locator" });
  // console.log(`>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is: ${JSON.stringify(makeAppmtBtn)}`);
  // await makeAppmtBtn.click();
  // await expect(page.getByText("Please login to make")).toBeVisible();

  await page
    .getByRole("heading", { name: "We Care About Your Health" })
    .click();
});

// testInfo fixure
test("Should demo config file", async ({ page }, testInfo) => {
  console.log(
    `>> Config at runtime: ${JSON.stringify(testInfo.config, null, 2)}`
  );
});

// browserName fixture
test("Should demo the fixures", async ({ page, browserName }, testInfo) => {
  console.log(`>> The test runs on: ${browserName}`);
});

test("Should demo devices", async ({ page }, testInfo) => {
  console.log(`>> The list of devies: ${Object.keys(devices)}`);
});

test("Should demo constants data", async ({ page }, testInfo) => {
  console.log(
    `>> Constants STATUSCODES: ${JSON.stringify(constants.STATUSCODES)}`
  );
  console.log(
    `>> Constants REQ_RES_ENDPOINTS: ${JSON.stringify(
      constants.REQ_RES_ENDPOINTS
    )}`
  );
});

test("Should demo a click action", async ({ page }, testInfo) => {
  // Default action
  let ele = page.getByRole("link", { name: "Make Appointment" });

  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  // await ele.click();

  // Base page action
  try {
    await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
    await ele.click();
  } catch (error) {
    await log(
      "error",
      `Failed to click element: ${ele.toString()}, original error: ${error}`
    );
    throw error;
  }
});
