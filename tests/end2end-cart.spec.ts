import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { getRandomIndices } from '../utils/random';

const validUser = 'standard_user';
const validPass = 'secret_sauce';

test('end2end: login, add 3 random products, validate cart', async ({ page }) => {
  // Login
  const login = new LoginPage(page);
  await login.goto();
  await login.login(validUser, validPass);

  // Go to inventory
  const inventory = new InventoryPage(page);
  await inventory.goto();


  // Add 3 random products, always using the current list and tracking names from the button's DOM
  const selectedNames: string[] = [];
  for (let i = 0; i < 3; i++) {
    const addButtons = page.locator("button[data-test^='add-to-cart-']");
    const totalProducts = await addButtons.count();
    expect(totalProducts).toBeGreaterThan(0);
    // For each button, get the product name by traversing DOM
    const buttonNamePairs: { idx: number, name: string }[] = [];
    for (let j = 0; j < totalProducts; j++) {
      // Go up to the closest inventory_item and find the name
      const name = await addButtons.nth(j).locator("xpath=ancestor::div[@data-test='inventory-item']//div[@data-test='inventory-item-name']").textContent();
      buttonNamePairs.push({ idx: j, name: name?.trim() || '' });
    }
    // Pick a random button
    const randomIdx = getRandomIndices(buttonNamePairs.length, 1)[0];
    const { idx, name } = buttonNamePairs[randomIdx];
    selectedNames.push(name);
    await expect(addButtons.nth(idx)).toBeVisible();
    await inventory.addProductToCartByIndex(idx);
  }

  // Go to cart
  await inventory.goToCart();
  const cart = new CartPage(page);

  // Get product names in cart
  const cartNames = await cart.getCartItemNames();

  // Validate cart contains exactly the selected products
  expect(cartNames.sort()).toEqual(selectedNames.sort());
});
