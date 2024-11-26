import{test as setup} from "./Fixture/page.fixture"
import { STORAGE_STATE_ADMIN, STORAGE_STATE_NON_ADMIN } from "./playwright.config";

setup("Admin login Token", async ({ page, loginPage, dashboardPage }) => {
  await page.goto("/");
  await loginPage.EnterUserName();
  await loginPage.EnterPassword();
  await loginPage.ClickOnLoginButton();
  await page.locator("#onetrust-accept-btn-handler").click();
  await page.waitForLoadState();
  await dashboardPage.AssertUserIsLoggedIn();
  await page.context().storageState({ path: STORAGE_STATE_ADMIN });
  const accessToken = await page.evaluate(()=>{
    return sessionStorage.getItem("access_token");
  })
  
  process.env.STORAGE_STATE_ADMIN = accessToken ?? ""

});

setup("Non-Admin login Token", async ({ page, loginPage, dashboardPage }) => {
  await page.goto("/");
  await loginPage.EnterUserName();
  await loginPage.EnterPassword();
  await loginPage.ClickOnLoginButton();
  await page.locator("#onetrust-accept-btn-handler").click();
  await page.waitForLoadState();
  await dashboardPage.AssertUserIsLoggedIn();
  await page.context().storageState({ path: STORAGE_STATE_NON_ADMIN });
});

export default setup;
