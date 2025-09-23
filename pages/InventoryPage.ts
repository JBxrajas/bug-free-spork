import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList = '[data-test="inventory-list"]';
  readonly cartLink = '[data-test="shopping-cart-link"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addProductToCartByName(productName: string) {
    const productSelector = `//div[@data-test='inventory-item-name' and text()='${productName}']/ancestor::div[@data-test='inventory-item']//button[contains(@data-test, 'add-to-cart')]`;
    await this.page.locator(productSelector).click();
  }

  async addProductToCartByIndex(index: number) {
    const buttons = this.page.locator("button[data-test^='add-to-cart-']");
    await buttons.nth(index).click();
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }
}
