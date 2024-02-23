import type { Locator } from '@playwright/test';
import { BasePage } from './base';

export class OverviewPage extends BasePage {
	protected url: string = '/dashboard';
	public readonly headingOverview: Locator = this.page.getByRole('heading', {
		name: 'Overview',
		level: 2
	});
}
