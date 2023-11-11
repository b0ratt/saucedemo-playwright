import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
	readonly page: Page;
	URL = '/cart.html';

	constructor(page: Page) {
		super(page);
		this.page = page;
	}

	async cartVisible() {
		await expect(this.getCartSelector()).toBeVisible();
	}

	private getCartSelector() {
		return this.page.getByTestId('cart_container');
	}
}
