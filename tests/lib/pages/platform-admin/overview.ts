import type { Locator } from '@playwright/test';
import { BasePage } from '../base';

export class PlatformAdminOverviewPage extends BasePage {
	protected url: string = '/platform-admin';
	public readonly headingPlatformAdmin: Locator = this.page.getByRole('heading', {
		name: 'Platform Admin',
		level: 1
	});
	public readonly linkTenants: Locator = this.page.getByRole('link', { name: 'Tenants' });
}
