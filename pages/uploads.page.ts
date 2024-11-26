import { expect, type Locator, type Page } from "@playwright/test";
const textData = JSON.parse(
    JSON.stringify(require("../utils/websiteText.json"))
  );

export class UploadPage {
    private page: Page;
    private getUploadTitle;

  constructor(page: Page) {
    this.page = page;
    this.getUploadTitle = page.locator("//*[@id='loggedInContent']/div[2]/xps-upload/div/div[1]/span")
  }

  async AssertUserInUploadPage() {
    await this.page.waitForLoadState();
    await this.getUploadTitle.isVisible();
    await expect(this.getUploadTitle).toContainText(
      textData.uploadTitle
    );
  }

  
}