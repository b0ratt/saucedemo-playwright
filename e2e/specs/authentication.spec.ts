import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../page-objects/Authentication';

test.describe('Authentication', () => {
	let authPage: AuthenticationPage;

	test.beforeEach(async ({ page }) => {
		authPage = new AuthenticationPage(page);

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
		await authPage.fillUsernameInput('standard_user');
		await authPage.fillPasswordInput('secret_sauce');
		await authPage.clickLoginBtn();

		await expect(page.locator('data-test=inventory_container')).toBeVisible();
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
