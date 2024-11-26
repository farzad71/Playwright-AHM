import { PlaywrightTestConfig, devices} from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import ENV from "./utils/ENV";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
dotenv.config({ path: `./env/.env.${process.env.test_env}`});
require('dotenv').config({ path: `.env.${process.env.ADMIN_ACCESS_TOKEN}` });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE_ADMIN = path.join(__dirname, "playwright/.auth/admin.user.json");
export const STORAGE_STATE_NON_ADMIN = path.join(__dirname, "playwright/.auth/nonadmin.user.json");


const playwrightConfig: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  /*retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  retries: 1,
  timeout: 50 * 1000,
  // expect: {
  //   timeout: 30000,
  // },
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    
    screenshot: "only-on-failure",
    headless: false,
    baseURL: ENV.BASE_URL,
    //video: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "Chrome",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Regression",
      dependencies: ['setup'],
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE_ADMIN, extraHTTPHeaders: {
        'Authorization': `Bearer ${process.env.STORAGE_STATE_ADMIN}`} }
    },
  ],


};

if (process.env.TEAMCITY_VERSION) {
  playwrightConfig.reporter = "playwright-teamcity-reporter";
}

export default playwrightConfig;
