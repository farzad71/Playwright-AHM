import { expect, type Locator, type Page } from '@playwright/test';
import ENV from "../utils/ENV";
const errorMessage = JSON.parse(JSON.stringify(require("../utils/errorMessages.json")));




export class LoginPage {
 

  private page: Page;
  private getLoginButton: Locator;
  private getUserNameInput: Locator;
  private getPasswordInput: Locator;
  private getInvalidLoginDataErrorMessage: Locator;
  private getEmptyUserNameFieldErrorMessage: Locator;
  private getEmptyPasswordFieldErrorMessage: Locator;
  private getRememberCheckBox: Locator;
  private getForgottenPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLoginButton = page.locator("#LoginButton");
    this.getUserNameInput = page.locator("#Username");
    this.getPasswordInput = page.locator("#Password");
    this.getInvalidLoginDataErrorMessage = page.locator(".errorMessage.pb-2");
    this.getEmptyUserNameFieldErrorMessage = page.locator("#username-helper-text");
    this.getEmptyPasswordFieldErrorMessage = page.locator("#password-helper-text");
    this.getRememberCheckBox = page.locator("#RememberLogin");
    this.getForgottenPassword = page.getByText("Forgotten password?", { exact: true });
  }

  async ClickRememberMe() {
    await this.getRememberCheckBox.click();
  }

  async EnterUserName() {
    await this.getUserNameInput.fill(ENV.ADMIN_USER_NAME);
  }

  async EnterPassword() {
    await this.getPasswordInput.fill(ENV.ADMIN_USER_PASSWORD);
  }

  async ClickOnLoginButton() {
    await this.getLoginButton.click();
  }
  async EnterLoginData(loginData: string) {
    switch (loginData) {
      
      case "Invalid":
        await this.getUserNameInput.focus();
        await this.getUserNameInput.fill(ENV.INVALID_USER_NAME);
        await this.getPasswordInput.focus();
        await this.getPasswordInput.fill(ENV.INVALID_USER_PASSWORD);
        break;
      case "Empty":
        await this.getUserNameInput.focus();
        await this.getUserNameInput.click();
        await this.getPasswordInput.focus();
        await this.getPasswordInput.click();
        break;
      default:
        console.log("Invalid parameter");
    }
  }

  async AssertInvalidLoginDataErrorMessage() {
    await this.getInvalidLoginDataErrorMessage.isVisible();
    await expect(this.getInvalidLoginDataErrorMessage).toContainText(errorMessage.invalidLoginData);
  }

  async AssertEmptyUsernameAndPasswordFields() {
    await this.getEmptyUserNameFieldErrorMessage.isVisible();
    await expect(this.getEmptyUserNameFieldErrorMessage).toContainText(errorMessage.emptyUserNameField);
    await this.getEmptyPasswordFieldErrorMessage.isVisible();
    await expect(this.getEmptyPasswordFieldErrorMessage).toContainText(errorMessage.emptyPasswordField);
  }

  async AssertRememberMeCheckboxState(state: string) {
    if (state === "checked") {
      await expect(this.getRememberCheckBox).toBeChecked();
    } else {
      expect(await this.getRememberCheckBox.isChecked()).toBeFalsy();
    }
  }
}