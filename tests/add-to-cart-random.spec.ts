
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { getRandomIndices } from '../utils/random';

const validUser = 'standard_user';
const validPass = 'secret_sauce';

test('should add 3 random products to cart', async ({ page }) => {
  // Login
  const login = new LoginPage(page);
  await login.goto();
  await login.login(validUser, validPass);

  // Go to inventory
  const inventory = new InventoryPage(page);
  await inventory.goto();


  // Add 3 random products, always using the current list of available buttons
  for (let i = 0; i < 3; i++) {
    const addButtons = page.locator("button[data-test^='add-to-cart-']");
    const totalProducts = await addButtons.count();
    expect(totalProducts).toBeGreaterThan(0);
    // Pick a random index from the current available buttons
    const randomIdx = getRandomIndices(totalProducts, 1)[0];
    await expect(addButtons.nth(randomIdx)).toBeVisible();
    await inventory.addProductToCartByIndex(randomIdx);
  }

  // Go to cart
  await inventory.goToCart();

  // Assert cart has 3 items
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(3);
});
