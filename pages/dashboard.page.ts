import { expect, type Locator, type Page } from '@playwright/test';
const textData = JSON.parse(
  JSON.stringify(require('../utils/websiteText.json'))
);

export class DashboardPage {
  private page: Page;
  private getLoginButton: Locator;
  private getAcceptAllCookiesButton: Locator;
  private getWelcomeUserPrompt: Locator;
  private getMyAccountButton: Locator;
  private getProfileCard: Locator;
  private getUploadsCard: Locator;
  private getDocumentsCard: Locator;
  private getNotificationsCard: Locator;
  private getRedayForReviewTab: Locator;
  private getReadyForReviewTotalCount: Locator;
  private getReadyForReviewTableRowCount: Locator;
  private getBeingProcessedTab: Locator;
  private getBeingProcessedTotalCount: Locator;
  private getBeingProcessedTableRowCount: Locator;
  private getPublicationTab: Locator;
  private getPublicationTotalCount: Locator;
  private getPublicationTableTotalRowCount: Locator;
  private getComplianceTab: Locator;
  private getComplianceTotalCount: Locator;
  private getComplianceTableTotalRowCount: Locator;
  private getDismissedTab: Locator;
  private getDismissedTotalCount: Locator;
  private getDismissedTableTotalRowCount: Locator;
  private getProfileDropDown: Locator;
  private getUserName: Locator;
  private getSignOutButton: Locator;
  private getManageAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAcceptAllCookiesButton = page.locator(
      '#onetrust-accept-btn-handler'
    );
    this.getWelcomeUserPrompt = page.locator(
      "//h1[contains(text(),'Welcome Back')]"
    );
    this.getProfileCard = page.locator("//p[contains(text(),'Profiles')]");
    this.getUploadsCard = page.locator("//p[contains(text(), 'Uploads')]");
    this.getDocumentsCard = page.locator("//p[contains(text(), 'Documents')]");
    this.getNotificationsCard = page.locator(
      "//p[contains(text(), 'Notifications')]"
    );
    this.getRedayForReviewTab = page.locator(
      "//*[@id='mat-tab-label-0-0']//span[contains(text(),'Ready For Review')]"
    );
    this.getBeingProcessedTab = page.locator(
      "//*[@id='mat-tab-label-0-1']//span[contains(text(),'Being Processed')]"
    );
    this.getPublicationTab = page.locator(
      "//span[@class='mdc-tab__text-label' and contains(text(),'Publication')]"
    );
    this.getComplianceTab = page.locator(
      "//span[@class='mdc-tab__text-label' and contains(text(),'Compliance')]"
    );
    this.getDismissedTab = page.locator(
      "//span[@class='mdc-tab__text-label' and contains(text(),'Dismissed')]"
    );
    this.getReadyForReviewTotalCount = page.locator(
      "//span[contains(text(),'Ready For Review')]//span"
    );
    this.getBeingProcessedTotalCount = page.locator(
      "//span[contains(text(),'Being Processed')]//span"
    );
    this.getReadyForReviewTableRowCount = page.locator(
      "//table[@data-qa='dashboard-readyforreview']"
    );
    this.getBeingProcessedTableRowCount = page.locator(
      "//table[@data-qa='dashboard-processing']"
    );
    this.getPublicationTotalCount = page.locator(
      "//span[contains(text(),'Publication ')]//span"
    );
    this.getComplianceTotalCount = page.locator(
      "//span[contains(text(),'Compliance')]//span"
    );
    this.getDismissedTotalCount = page.locator(
      "//span[contains(text(),'Dismissed')]//span"
    );
    this.getPublicationTableTotalRowCount = page.locator(
      "//div[@class='subject-desc']"
    );
    this.getComplianceTableTotalRowCount = page.locator(
      "//div[@class='mat-line content subject']"
    );
    this.getDismissedTableTotalRowCount = page.locator(
      "//div[@class='mat-line content subject']"
    );
    this.getProfileDropDown = page.locator(
      "//span[@class='mat-mdc-select-min-line ng-tns-c3393473648-1 ng-star-inserted']"
    );
    this.getUserName = page.locator("//span[@class='headerUsername']");
    this.getSignOutButton = page.locator("//span[contains(text(),'Sign Out')]");
    this.getManageAccountButton = page.locator(
      "//span[contains(text(),'Manage account')]"
    );
  }

  async ClickMyAccountButton() {
    await this.getMyAccountButton.click();
  }
  //####################----Clicking All the Card Funtion-----############################################
  async ClickProfilesCard() {
    await this.getProfileCard.click();
  }

  async ClickUploadsCard() {
    await this.getUploadsCard.click();
  }

  async ClickDocumentsCard() {
    await this.getDocumentsCard.click();
  }

  async ClickNotificationsCard() {
    await this.getNotificationsCard.click();
  }
  //##############----Clicking All the Tab Functions----#########################
  async ClickRedayForReviewTab() {
    await this.getRedayForReviewTab.click();
  }

  async ClickBeingProcessedTab() {
    await this.getBeingProcessedTab.click();
  }

  async ClickPublicationTab() {
    await this.getPublicationTab.click();
  }

  async ClickComplianceTab() {
    await this.getComplianceTab.click();
  }

  async ClickDismissedTab() {
    await this.getDismissedTab.click();
  }

  //#############-----All the Count Functions----###########################################
  async ReadyForReviewTableRowCount() {
    const ReadyForReviewTable = await this.getReadyForReviewTableRowCount;
    const ReadyforReviewRowCount = await ReadyForReviewTable.locator(
      '//tbody//tr'
    ).count();
    return ReadyforReviewRowCount;
  }

  async BeingProcessedTableRowCount() {
    const BeingProcessedTable = await this.getBeingProcessedTableRowCount;
    const BeingProcessedTableRowCount = await BeingProcessedTable.locator(
      '//tbody//tr'
    ).count();
    return BeingProcessedTableRowCount;
  }

  async PublicationTableTotalRowCount() {
    const PublicationTotalRowCount =
      await this.getPublicationTableTotalRowCount.count();
    return PublicationTotalRowCount;
  }

  async ComplianceTableTotalRowCount() {
    const ComplianceTotalRowCount =
      await this.getComplianceTableTotalRowCount.count();
    return ComplianceTotalRowCount;
  }

  async DismissedTableTotalRowCount() {
    const DismissedTotalRowCount =
      await this.getDismissedTableTotalRowCount.count();
    return DismissedTotalRowCount;
  }
  //#################----All the Assert Functions----####################################
  async AssertUserIsLoggedIn() {
    await this.getWelcomeUserPrompt.isVisible();
    await expect
      .soft(this.getWelcomeUserPrompt)
      .toContainText(textData.loggedInWelcome);
  }

  async AcceptCookies() {
    await this.getAcceptAllCookiesButton.click();
  }

  async AssertReadyForReviewTableCounts() {
    await this.getRedayForReviewTab.isVisible();
    await this.getReadyForReviewTableRowCount.isVisible();
    await this.getReadyForReviewTotalCount.isVisible();
    const ReadyForReviewTotalCountText =
      await this.getReadyForReviewTotalCount.textContent();
    const ReadyForReviewTotalCount = Number(ReadyForReviewTotalCountText);
    const ReadyForReviewTableTotalRowCount =
      await this.ReadyForReviewTableRowCount();
    await expect
      .soft(ReadyForReviewTotalCount)
      .toEqual(ReadyForReviewTableTotalRowCount);
  }

  async AssertBeingProcessedTableCounts() {
    await this.getBeingProcessedTab.isVisible();
    await this.getBeingProcessedTotalCount.isVisible();
    await this.getBeingProcessedTableRowCount.isVisible();
    const BeingProcessedTotalCountText =
      await this.getBeingProcessedTotalCount.textContent();
    const BeingProcessedTotalCount = Number(BeingProcessedTotalCountText);
    const BeingProcessedTableTotalRowCount =
      await this.BeingProcessedTableRowCount();
    await expect
      .soft(BeingProcessedTotalCount)
      .toEqual(BeingProcessedTableTotalRowCount);
  }

  async AssertPublicationCounts() {
    await this.getPublicationTab.isVisible();
    await this.getPublicationTotalCount.isVisible();
    const PublicationTotalCountText =
      await this.getPublicationTotalCount.textContent();
    const PublicationTotalCount = Number(PublicationTotalCountText);
    const PublicationTableTotalRowCount =
      await this.PublicationTableTotalRowCount();
    await expect
      .soft(PublicationTotalCount)
      .toEqual(PublicationTableTotalRowCount);
  }

  async AssertComplianceCounts() {
    await this.getComplianceTab.isVisible();
    await this.getComplianceTotalCount.isVisible();
    const ComplianceTotalCountText =
      await this.getComplianceTotalCount.textContent();
    const ComplianceTotalCount = Number(ComplianceTotalCountText);
    const ComplianceTableTotalRowCount =
      await this.ComplianceTableTotalRowCount();
    await expect
      .soft(ComplianceTotalCount)
      .toEqual(ComplianceTableTotalRowCount);
  }

  async AssertDismissedCounts() {
    await this.getDismissedTab.isVisible();
    await this.getDismissedTotalCount.isVisible();
    const DismissedTotalCountText =
      await this.getDismissedTotalCount.textContent();
    const DismissedTotalCount = Number(DismissedTotalCountText);
    const DismissedTableTotalRowCount =
      await this.DismissedTableTotalRowCount();
    await expect.soft(DismissedTotalCount).toEqual(DismissedTableTotalRowCount);
  }


  //###############----Custome Waite-----####################################
  async WaitForCutomerAPICallToBeSuccessful() {
    await Promise.all([
      this.page.waitForResponse(
        (resp) =>
          resp
            .url()
            .includes('/customerassessments') &&
          resp.status() === 200 &&
          resp.ok()
      ),
    ]);
  }
}
