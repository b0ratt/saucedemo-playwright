import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../page-objects/Authentication';
import { InventoryPage } from '../../page-objects/Inventory';

test.describe('Authentication', () => {
	let authPage: AuthenticationPage;
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page }) => {
		authPage = new AuthenticationPage(page);
		inventoryPage = new InventoryPage(page);
		await page.goto('/');
		await expect(page).toHaveTitle(/Swag Labs/);
	});

	test('authentication form is visible', async () => {
		await authPage.authFormVisible();
		await authPage.usernameInputVisible();
		await authPage.passwordInputVisible();
		await authPage.loginBtnVisible();
	});

	test('login as standard user', async ({ page }) => {
		await authPage.fillUsernameInput('standard_usasder');
		await authPage.fillPasswordInput('secret_sauce');
		await authPage.clickLoginBtn();

		await inventoryPage.inventoryVisible();
		await page
			.context()
			.cookies()
			.then((cookies) => {
				expect(cookies).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							name: 'session-username',
							value: 'standard_user',
						}),
					])
				);
			});
	});
});
