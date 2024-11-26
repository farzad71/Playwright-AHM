import {test} from "../Fixture/page.fixture"

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("I can login with valid credentials @smoke @regression", async ({dashboardPage}) => {
  await dashboardPage.AssertUserIsLoggedIn();
});

test("I cannot login with invalid credentials @smoke", async ({loginPage}) => {
  await loginPage.EnterLoginData("Invalid");
  await loginPage.ClickOnLoginButton();
  await loginPage.AssertInvalidLoginDataErrorMessage();
});

test("I cannot login with empty fields @smoke", async ({loginPage}) => {
  await loginPage.EnterLoginData("Empty");
  await loginPage.ClickOnLoginButton();
  await loginPage.AssertEmptyUsernameAndPasswordFields();
});

test("I can check and uncheck remember me checkbox @smoke", async ({loginPage}) => {
  await loginPage.ClickRememberMe();
  await loginPage.AssertRememberMeCheckboxState("checked");
  await loginPage.ClickRememberMe();
  await loginPage.AssertRememberMeCheckboxState("unchecked");
});
