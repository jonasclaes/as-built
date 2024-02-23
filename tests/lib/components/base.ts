import type { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
	protected abstract readonly baseLocator: Locator;

	constructor(protected page: Page) {}
}
