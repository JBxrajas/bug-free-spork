import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly loginButton = '#login-button';
  readonly errorMessage = 'h3[data-test="error"]';
  async isErrorVisible() {
    return this.page.isVisible(this.errorMessage);
  }

  async getErrorText() {
    return this.page.textContent(this.errorMessage);
  }

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
  await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
