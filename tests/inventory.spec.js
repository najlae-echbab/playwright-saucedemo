const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../fixtures/users.json');

const shoppingUsers = users.filter(user => user.loginExpected === 'success' && user.canShop);

test.describe('SauceDemo - Inventory', () => {
  for (const user of shoppingUsers) {
    test(`Inventory / add-remove / sort - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goTo();
      await loginPage.login(user.username, user.password);

      await expect(page).toHaveURL(/inventory/);
      await expect(inventoryPage.title).toHaveText('Products');

      await inventoryPage.addBackpackToCart();
      await expect(inventoryPage.cartBadge).toHaveText('1');

      await inventoryPage.removeBackpackFromCart();
      await expect(inventoryPage.cartBadge).toHaveCount(0);

      await inventoryPage.sortBy('za');
      await expect(inventoryPage.firstItemName).toBeVisible();
    });
  }
});