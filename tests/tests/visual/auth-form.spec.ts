import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../page-objects/Inventory';
import { AuthenticationPage } from '../../page-objects/Authentication';

test.describe('Authentication', () => {
	let authPage: AuthenticationPage;
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page }) => {
		authPage = new AuthenticationPage(page);
		inventoryPage = new InventoryPage(page);

		await page.goto('/');
		await expect(page).toHaveTitle(/Swag Labs/);
	});

	test('verify authentication form', async ({ page }) => {
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot('auth-form.png');
	});

	test('verify inventory page after login', async ({ page }) => {
		await authPage.fillUsernameInput('standard_user');
		await authPage.fillPasswordInput('secret_sauce');
		await authPage.clickLoginBtn();

		await inventoryPage.inventoryVisible();
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot('inventory-page.png');
	});
});
