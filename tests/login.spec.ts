import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const validUser = 'standard_user';
const validPass = 'secret_sauce';
const invalidUser = 'invalid_user';
const invalidPass = 'wrong_password';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(validUser, validPass);
    // Add assertion for successful login, e.g., redirected URL or visible element
    await expect(page).not.toHaveURL(/login/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(invalidUser, invalidPass);
    // Assert error message is visible using POM
    await expect(await login.isErrorVisible()).toBeTruthy();
    await expect(await login.getErrorText()).toContain('Username and password do not match any user in this service');
  });
});
