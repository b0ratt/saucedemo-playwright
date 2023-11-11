import { Page, expect } from '@playwright/test';

export abstract class BasePage {
	readonly page: Page;
	abstract URL: string;

	constructor(page: Page) {
		this.page = page;
	}

	async visit() {
		await this.page.goto(this.URL);
	}
}
