import {test} from "../Fixture/page.fixture"

test.describe('Dashboard Validation Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

  });

  test('Validate User logged in to Aptifore DashBoard Page @regression', async ({dashboardPage,page}) => {
    await page.waitForLoadState();
    await dashboardPage.AssertUserIsLoggedIn();
  });

  test('Click on Profile Card will navigate user to the Profile page @regression ', async ({dashboardPage,orgProfilePage}) => {
    await dashboardPage.ClickProfilesCard();
    await orgProfilePage.AssertUserInProfilePage();
  });

  test('Click on Document Card will navigate user to the Document page @regression ', async ({dashboardPage,myDocumentsPage}) => {
    await dashboardPage.ClickDocumentsCard();
    await myDocumentsPage.AssertUserInDocumentsPage();
  });

  test('Click on Upload Card will navigate user to the Upload page @regression ', async ({dashboardPage, uploadPage}) => {
    await dashboardPage.ClickUploadsCard();
    await uploadPage.AssertUserInUploadPage();
  });

  test('Click on Notifications Card will navigate user to the Alert-Notification page @regression ', async ({dashboardPage,alertNotificationPage}) => {
    await dashboardPage.ClickNotificationsCard();
    await alertNotificationPage.AssertUserInAlertNotificationPage();
  });

  test('Validate Ready for review tab count matched with table count. @regression ', async ({dashboardPage}) => {
    await dashboardPage.ClickRedayForReviewTab();
    ///await dashboardPage.WaitForCutomerAPICallToBeSuccessful()
    await dashboardPage.AssertReadyForReviewTableCounts();
  });

  test('Validate Being Processed tab count matched with table count. @regression ', async ({dashboardPage}) => {
    await dashboardPage.ClickBeingProcessedTab();
    //await dashboardPage.WaitForCutomerAPICallToBeSuccessful()
    await dashboardPage.AssertBeingProcessedTableCounts();
  });

  test('Validate Publication tab count matched with table count. @regression', async ({dashboardPage}) => {
    await dashboardPage.ClickPublicationTab();
    await dashboardPage.AssertPublicationCounts();
  });

  test('Validate Compliance tab count matched with table count. @regression', async ({dashboardPage}) => {
    await dashboardPage.ClickComplianceTab();
    await dashboardPage.AssertComplianceCounts();
  });

  test('Validate Dismissed tab count matched with table count. @regression', async ({dashboardPage}) => {
    await dashboardPage.ClickDismissedTab();
    await dashboardPage.AssertDismissedCounts();
  });
});
