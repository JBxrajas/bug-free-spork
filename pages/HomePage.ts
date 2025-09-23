import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  // Example selectors
  readonly loginButton = 'button#login';
  readonly searchInput = 'input[name="q"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async search(text: string) {
    await this.page.fill(this.searchInput, text);
    await this.page.press(this.searchInput, 'Enter');
  }
}
