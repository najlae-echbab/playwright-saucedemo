class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    this.addBackpackBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.firstItemName = page.locator('.inventory_item_name').first();
  }

  async addBackpackToCart() {
    await this.addBackpackBtn.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpackBtn.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }
}

module.exports = { InventoryPage };