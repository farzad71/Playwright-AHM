import { expect, type Locator, type Page } from "@playwright/test";
const textData = JSON.parse(
    JSON.stringify(require("../utils/websiteText.json"))
  );

export class AlertNotificationPage {
    private page: Page;
    private getNotificationTitle;

  constructor(page: Page) {
    this.page = page;
    this.getNotificationTitle = page.locator("//div[@class='headline-2']")
  }

  async AssertUserInAlertNotificationPage() {
    await this.page.waitForLoadState();
    await this.getNotificationTitle.isVisible();
    await expect(this.getNotificationTitle).toContainText(
      textData.notificationsTitle
    );
  }

  
}