import { Page, expect } from '@playwright/test';

export class AuthenticationPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async authFormVisible() {
		await expect(this.getAuthFormSelector()).toBeVisible();
	}

	async usernameInputVisible() {
		await expect(this.getUsernameInput()).toBeVisible();
	}

	async passwordInputVisible() {
		await expect(this.getPasswordInput()).toBeVisible();
	}

	async loginBtnVisible() {
		await expect(this.getLoginBtn()).toBeVisible();
	}

	async fillUsernameInput(username: string) {
		await this.getUsernameInput().fill(username);
		await expect(this.getUsernameInput()).toHaveValue(username);
	}

	async fillPasswordInput(password: string) {
		await this.getPasswordInput().fill(password);
		await expect(this.getPasswordInput()).toHaveValue(password);
	}

	async clickLoginBtn() {
		await expect(this.getLoginBtn()).toBeEnabled();
		await this.getLoginBtn().click();
	}

	private getAuthFormSelector() {
		return this.page.getByTestId('auth_form');
	}

	private getUsernameInput() {
		return this.page.getByTestId('username');
	}

	private getPasswordInput() {
		return this.page.getByTestId('password');
	}

	private getLoginBtn() {
		return this.page.getByTestId('login-button');
	}
}
