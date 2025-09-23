import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName = '[data-test="inventory-item-name"]';
  readonly productDesc = '[data-test="inventory-item-desc"]';
  readonly productPrice = '[data-test="inventory-item-price"]';
  readonly addToCartButton = '[data-test="add-to-cart"]';
  readonly backToProductsButton = '[data-test="back-to-products"]';
  readonly cartLink = '[data-test="shopping-cart-link"]';

  constructor(page: Page) {
    this.page = page;
  }

  async getProductName() {
    return this.page.textContent(this.productName);
  }

  async getProductDescription() {
    return this.page.textContent(this.productDesc);
  }

  async getProductPrice() {
    return this.page.textContent(this.productPrice);
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async goBackToProducts() {
    await this.page.click(this.backToProductsButton);
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }
}
