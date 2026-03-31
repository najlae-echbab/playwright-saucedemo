const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../fixtures/users.json');

test.describe('SauceDemo - Login', () => {
  for (const user of users) {
    test(`Login - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goTo();
      await loginPage.login(user.username, user.password);

      if (user.loginExpected === 'success') {
        await expect(page).toHaveURL(/inventory/);
        await expect(loginPage.productsTitle).toHaveText('Products');
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  }
});