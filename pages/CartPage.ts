import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems = '[data-test="inventory-item"]';
  readonly cartBadge = '[data-test="shopping-cart-badge"]';
  readonly continueShoppingButton = '[data-test="continue-shopping"]';
  readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItemCount() {
    return this.page.locator(this.cartItems).count();
  }

  async getCartItemNames() {
    return this.page.locator(`${this.cartItems} [data-test='inventory-item-name']`).allTextContents();
  }

  async getCartItemDescriptions() {
    return this.page.locator(`${this.cartItems} [data-test='inventory-item-desc']`).allTextContents();
  }

  async getCartItemPrices() {
    return this.page.locator(`${this.cartItems} [data-test='inventory-item-price']`).allTextContents();
  }

  async removeItemByName(productName: string) {
    const removeButton = this.page.locator(`button[data-test^='remove-']`).filter({ hasText: productName });
    await removeButton.first().click();
  }

  async removeItemByIndex(index: number) {
    const removeButtons = this.page.locator("button[data-test^='remove-']");
    await removeButtons.nth(index).click();
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}
