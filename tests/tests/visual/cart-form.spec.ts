import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/Inventory';
import { CartPage } from '../../page-objects/Cart';

test.describe('Cart', () => {
	let inventoryPage: InventoryPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ page, context }) => {
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);

		await context.addCookies([
			{
				name: 'session-username',
				value: 'standard_user',
				path: '/',
				domain: 'localhost',
			},
		]);
	});

	test('verify empty cart page', async ({ page }) => {
		await cartPage.visit();
		await cartPage.cartVisible();

		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot('cart-empty.png');
	});

	test('verify cart page with item', async ({ page }) => {
		await inventoryPage.visit();
		await inventoryPage.inventoryVisible();
		await inventoryPage.addToCartByName('Sauce Labs Backpack');
		await cartPage.visit();

		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot('screenshot/cart.png');
	});
});
