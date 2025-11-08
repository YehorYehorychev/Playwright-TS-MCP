import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export default class CustList extends BasePage {
  // Constructor
  constructor(page: Page) {
    super(page);
  }
  /** Elements */
  get firstNameInputBox() {
    return this.page.getByRole("textbox", { name: "First name" });
  }
  get lastNameInputBox() {
    return this.page.getByRole("textbox", { name: "Last name" });
  }
  get searchBtn() {
    return this.page.getByRole("button", { name: "Search" });
  }
  get noDataAvailableCell() {
    return this.page.locator("[id=search-customers]");
  }
}
