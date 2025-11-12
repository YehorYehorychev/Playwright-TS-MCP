import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nopcommerce.home.page.js";
import CustList from "../page-objects/nopcommerce.custlist.page.js";

test.describe("E2E Customer Search", () => {
  test("Login to NopCommerce Web App", async ({ page }, testInfo) => {
    // Env config
    const envConfig = testInfo.project.use as any;

    // Create an page object
    const homePage = new HomePage(page);

    //Login
    await homePage.loginToNopeCommerceApp(
      envConfig.nopCommerceWeb,
      process.env.NOP_COMMERCE_USER_NAME,
      process.env.NOP_COMMERCE_PASSWORD
    );
  });
});
