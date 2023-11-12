import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/Inventory';

test.describe('Inventory', () => {
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page, context }) => {
		inventoryPage = new InventoryPage(page);
		await context.addCookies([
			{
				name: 'session-username',
				value: 'standard_user',
				path: '/',
				domain: 'localhost',
			},
		]);

		await inventoryPage.visit();

		await inventoryPage.inventoryVisible();
	});

	test('verify inventory page after login', async ({ page }) => {
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot('inventory-page.png');
	});
});
