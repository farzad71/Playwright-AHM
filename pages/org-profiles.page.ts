import { expect, type Locator, type Page } from "@playwright/test";
const textData = JSON.parse(
    JSON.stringify(require("../utils/websiteText.json"))
  );

export class OrgProfilePage {
    private page: Page;
    private getProfilePromt;

  constructor(page: Page) {
    this.page = page;
    this.getProfilePromt = page.locator("//div[@class='headline-2 title']")
  }

  async AssertUserInProfilePage() {
    await this.getProfilePromt.isVisible();
    await expect(this.getProfilePromt).toContainText(
      textData.profilePromt
    );
  }

  
}