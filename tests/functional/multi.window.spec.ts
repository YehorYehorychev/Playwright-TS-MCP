import { test, expect } from "@playwright/test";

test.describe("Multiple Windows Functionality", () => {
  test.skip("Should handle multiple windows navigation and assertions", async ({
    browser,
  }) => {
    // Create context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Track all pages in the context
      const pages = [page];
      context.on("page", (newPage) => {
        console.log("New page detected in context");
        pages.push(newPage);
      });

      // 1. Navigate to the site
      await page.goto("https://the-internet.herokuapp.com/");
      console.log("Navigated to the-internet.herokuapp.com");

      // 2. Click on "Multiple Windows" link
      const multipleWindowsLink = page.locator("text=Multiple Windows");
      console.log("About to click Multiple Windows link");

      // Get initial page count
      const initialPageCount = context.pages().length;
      console.log("Initial page count:", initialPageCount);

      // Click the link
      await multipleWindowsLink.click();

      // Wait for new page to be created
      let newWindow = null;
      let attempts = 0;
      while (!newWindow && attempts < 50) {
        await page.waitForTimeout(100);
        const currentPages = context.pages();
        if (currentPages.length > initialPageCount) {
          newWindow = currentPages[currentPages.length - 1];
          break;
        }
        attempts++;
      }

      if (!newWindow) {
        throw new Error("New window was not created");
      }

      console.log("Clicked on Multiple Windows link, new window opened");
      console.log("New window URL:", newWindow.url());

      // 3. Verify the new window title
      await newWindow.waitForLoadState("domcontentloaded");
      const newWindowTitle = newWindow.url();
      console.log("New window title/URL:", newWindowTitle);
      expect(newWindowTitle).toContain("windows");

      // 4. Click the "Click Here" link on the new window
      const clickHereLink = newWindow.locator("text=Click Here");
      await clickHereLink.waitFor({ state: "visible", timeout: 10000 });
      console.log("Click Here link is visible");

      // Get current page count before click
      const pageCountBeforeClick = context.pages().length;
      console.log("Page count before click:", pageCountBeforeClick);

      // Click the link
      await clickHereLink.click();

      // Wait for third window to be created
      let thirdWindow = null;
      let attempts2 = 0;
      while (!thirdWindow && attempts2 < 50) {
        await page.waitForTimeout(100);
        const currentPages = context.pages();
        if (currentPages.length > pageCountBeforeClick) {
          thirdWindow = currentPages[currentPages.length - 1];
          break;
        }
        attempts2++;
      }

      if (!thirdWindow) {
        throw new Error("Third window was not created");
      }

      console.log("Clicked link on new window, third window opened");
      console.log("Third window URL:", thirdWindow.url());

      // 5. Assert header text on third window
      await thirdWindow.waitForLoadState("domcontentloaded");
      const headerText = thirdWindow.locator("h3, h2, h1").first();
      await expect(headerText).toBeVisible();
      const headerContent = await headerText.textContent();
      console.log("Header text on third window:", headerContent);
      expect(headerContent).toBeTruthy();

      // 6. Come back to the parent window
      console.log("Coming back to parent window");
      await page.bringToFront();
      const parentPageTitle = await page.title();
      console.log("Parent page title:", parentPageTitle);
      expect(parentPageTitle).toBeTruthy();

      // Verify we're back on the parent page
      const parentWindowLink = page.locator("text=Multiple Windows");
      await expect(parentWindowLink).toBeVisible();
      console.log("Successfully returned to parent window");
    } finally {
      await context.close();
    }
  });
});
