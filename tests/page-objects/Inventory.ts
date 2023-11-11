import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
	readonly page: Page;
	URL = '/inventory.html';

	constructor(page: Page) {
		super(page);
		this.page = page;
	}

	async inventoryVisible() {
		await expect(this.getInventorySelector()).toBeVisible();
	}

	async addToCartByName(productName: string) {
		const addProductBtn = this.page
			.locator('data-test=inventory_item', {
				hasText: productName,
			})
			.locator('data-testid=add_to_cart');

		await addProductBtn.click();
	}

	private getInventorySelector() {
		return this.page.getByTestId('inventory_container');
	}
}
