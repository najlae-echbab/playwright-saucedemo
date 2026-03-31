const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const users = require('../fixtures/users.json');

const shoppingUsers = users.filter(user => user.loginExpected === 'success' && user.canShop);

test.describe('SauceDemo - Cart', () => {
  for (const user of shoppingUsers) {
    test(`Cart / add / continue shopping / remove - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);

      await loginPage.goTo();
      await loginPage.login(user.username, user.password);

      await inventoryPage.addBackpackToCart();
      await inventoryPage.openCart();

      await expect(cartPage.title).toHaveText('Your Cart');
      await expect(cartPage.cartItem).toHaveCount(1);

      await cartPage.continueShopping();
      await expect(page).toHaveURL(/inventory/);

      await inventoryPage.openCart();
      await cartPage.removeBackpack();
      await expect(cartPage.cartItem).toHaveCount(0);
    });
  }
});