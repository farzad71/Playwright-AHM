import { test } from "@playwright/test";
import { ResetPassword } from "../pages/for-gotten-password.page";
import ENV from "../utils/ENV";


let resetPassword: ResetPassword;

test.beforeEach(async ({ page }) => {
  page.goto(ENV.BASE_URL);

  resetPassword = new ResetPassword(page);
});

test("@smoke I can reset my password with matching email addresses", async () => {
  await resetPassword.ClickForgottenPasswordButton();

  await resetPassword.EnterEmailAddresses("valid");

  await resetPassword.ClickRequestPasswordResetButton();

  await resetPassword.AssertResetPasswordSuccessMessage();
});

test("I cannot reset my password with non matching email addresses", async () => {
  await resetPassword.ClickForgottenPasswordButton();

  await resetPassword.EnterEmailAddresses("non matching");

  await resetPassword.ClickRequestPasswordResetButton();

  await resetPassword.AssertResetPasswordErrorMessages("non matching");
});

test("I cannot reset my password with empty retype email address", async () => {
  await resetPassword.ClickForgottenPasswordButton();

  await resetPassword.EnterEmailAddresses("empty retype email");

  await resetPassword.ClickRequestPasswordResetButton();

  await resetPassword.AssertResetPasswordErrorMessages("empty retype email");
});

test("I cannot reset my password with empty email address", async () => {
  await resetPassword.ClickForgottenPasswordButton();

  await resetPassword.EnterEmailAddresses("empty email");

  await resetPassword.ClickRequestPasswordResetButton();

  await resetPassword.AssertResetPasswordErrorMessages("empty email");
});
