import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export default class HomePage extends BasePage {
  // Constructor
  constructor(page: Page) {
    super(page);
  }
  /** Elements */
  get userNameInputBox() {
    return this.page.getByRole("textbox", { name: "Email:" });
  }
  get passwordInputBox() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Log in" });
  }
}
