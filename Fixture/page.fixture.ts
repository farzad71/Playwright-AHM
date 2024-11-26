import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { OrgProfilePage } from '../pages/org-profiles.page';
import { MyDocumentsPage } from '../pages/my-documents.page';
import { UploadPage } from '../pages/uploads.page';
import { AlertNotificationPage } from '../pages/alert-notification.page';

type UIPages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  orgProfilePage: OrgProfilePage;
  myDocumentsPage: MyDocumentsPage;
  uploadPage: UploadPage;
  alertNotificationPage: AlertNotificationPage;
};

export const test = base.extend<UIPages>({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  orgProfilePage: async ({ page }, use) => {
    const orgProfilePage = new OrgProfilePage(page);
    await use(orgProfilePage);
  },
  myDocumentsPage: async ({ page }, use) => {
    const myDocumentsPage = new MyDocumentsPage(page);
    await use(myDocumentsPage);
  },
  uploadPage: async ({ page }, use) => {
    const uploadPage = new UploadPage(page);
    await use(uploadPage);
  },
  alertNotificationPage: async ({ page }, use) => {
    const alertNotificationPage = new AlertNotificationPage(page);
    await use(alertNotificationPage);
  },
});
