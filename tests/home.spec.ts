import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  test('should load and search', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(page).toHaveURL(/\/$/);
    await home.search('Playwright');
    // Add more assertions as needed
  });
});
