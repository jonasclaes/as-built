import type { Page } from '@playwright/test';

export abstract class BasePage {
	protected abstract readonly url: string;

	constructor(protected page: Page) {}

	public async goto() {
		await this.page.goto(this.url);
	}
}
