import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessageContainer = '.error-message-container';
  async isErrorVisible() {
    return this.page.isVisible(this.errorMessageContainer);
  }

  async getErrorText() {
    return this.page.textContent(this.errorMessageContainer);
  }

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
  await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
