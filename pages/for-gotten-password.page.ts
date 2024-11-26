import { expect, type Locator, type Page } from '@playwright/test';
import ENV from '../utils/ENV';
const textData = JSON.parse(JSON.stringify(require("../utils/websiteText.json")));
const errorMessage = JSON.parse(JSON.stringify(require("../utils/errorMessages.json")));


export class ResetPassword {

  private page: Page;
  private getEmailAddress: Locator;
  private getRetypeEmailAddress: Locator;
  private getForgottenPasswordButton: Locator;
  private getRequestPasswordResetButton: Locator;
  private getRetypeEmailErrorMessage: Locator;
  private getEmailErrorMessage: Locator;
  private getResetSuccessMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.getEmailAddress = page.locator("#emailaddress");
    this.getRetypeEmailAddress = page.locator("#retypeEmailAddress");
    this.getForgottenPasswordButton = page.getByText("Forgotten password?", { exact: true });
    this.getRequestPasswordResetButton = page.locator("#requestPasswordReset");
    this.getRetypeEmailErrorMessage = page.locator("#retypeEmailAddressErrorMessage");
    this.getEmailErrorMessage = page.locator("#emailAddressErrorMessage");
    this.getResetSuccessMessage = page.locator("#successMessage");
  }

  async ClickForgottenPasswordButton() {
    await this.getForgottenPasswordButton.click();
  }

  async ClickRequestPasswordResetButton() {
    await this.getRequestPasswordResetButton.click();
  }

  async EnterEmailAddresses(type: string) {
    switch (type) {
      case "empty retype email":
        await this.getEmailAddress.focus();
        await this.getEmailAddress.fill(ENV.ADMIN_USER_NAME);
        await this.getRetypeEmailAddress.focus();
        await this.getRetypeEmailAddress.fill("");
        break;
      case "empty email":
        await this.getEmailAddress.focus();
        await this.getEmailAddress.fill("");
        await this.getRetypeEmailAddress.focus();
        await this.getRetypeEmailAddress.fill(ENV.ADMIN_USER_NAME);
        break;
      case "non matching":
        await this.getEmailAddress.focus();
        await this.getEmailAddress.fill(ENV.ADMIN_USER_NAME);
        await this.getRetypeEmailAddress.focus();
        await this.getRetypeEmailAddress.fill(ENV.ADMIN_USER_NAME);
        break;
      default:
        console.log("Invalid parameter");
    }
  }

  async AssertResetPasswordErrorMessages(type: string) {
    switch (type) {
      case "non matching":
        await this.getRetypeEmailErrorMessage.isVisible();
        await expect(this.getRetypeEmailErrorMessage).toContainText(errorMessage.nonMatchingEmails);
        break;
      case "empty retype email":
        await this.getRetypeEmailErrorMessage.isVisible();
        await expect(this.getRetypeEmailErrorMessage).toContainText(errorMessage.emptyRetypeEmail);
        break;
      case "empty email":
        await this.getEmailErrorMessage.isVisible();
        await expect(this.getEmailErrorMessage).toContainText(errorMessage.invalidEmail);
        break;
      default:
        console.log("Invalid parameter");
    }
  }

  async AssertResetPasswordSuccessMessage() {
    await this.getResetSuccessMessage.isVisible();
    await expect(this.getResetSuccessMessage).toContainText(textData.resetPasswordSuccess);
  }
}