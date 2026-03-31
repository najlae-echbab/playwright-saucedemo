const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const users = require('../fixtures/users.json');

const checkoutUsers = users.filter(
  user => user.loginExpected === 'success' && user.canCheckout
);

test.describe('SauceDemo - Checkout', () => {
  for (const user of checkoutUsers) {
    test(`Checkout complet - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await loginPage.goTo();
      await loginPage.login(user.username, user.password);

      await inventoryPage.addBackpackToCart();
      await inventoryPage.openCart();
      await cartPage.clickCheckout();

      console.log('Checkout data:', user.firstName, user.lastName, user.postalCode);

      if (!user.firstName || !user.lastName || !user.postalCode) {
        throw new Error(`Missing checkout data for ${user.username}`);
      }

      await checkoutPage.fillInformation(
        user.firstName,
        user.lastName,
        user.postalCode
      );

      await checkoutPage.continueCheckout();

      // Cas connu : problem_user reste bloqué sur le formulaire
      if (user.username === 'problem_user') {
        await expect(checkoutPage.errorMessage).toBeVisible();
        return;
      }

      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');

      // Cas connu : error_user n'aboutit pas correctement après finish
      if (user.username === 'error_user') {
        return;
      }

      await checkoutPage.finishCheckout();
      await expect(checkoutPage.completeHeader).toContainText('Thank you');
    });
  }
});