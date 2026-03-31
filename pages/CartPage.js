class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeBackpackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeBackpack() {
    await this.removeBackpackBtn.click();
  }
}

module.exports = { CartPage };