import { expect, type Locator, type Page } from "@playwright/test";
const textData = JSON.parse(
    JSON.stringify(require("../utils/websiteText.json"))
  );

export class MyDocumentsPage {
    private page: Page;
    private getDocumentPageTitle;

  constructor(page: Page) {
    this.page = page;
    this.getDocumentPageTitle = page.locator("//div[@class='title headline-2']")
  }

  async AssertUserInDocumentsPage() {
    await this.getDocumentPageTitle.isVisible();
    await expect(this.getDocumentPageTitle).toContainText(
      textData.documentPageTitle
    );
  }

  
}