import type { Locator } from '@playwright/test';
import { BasePage } from '../base';

export class PlatformAdminTenantsPage extends BasePage {
	protected url: string = '/platform-admin';
	public readonly headingPlatformAdmin: Locator = this.page.getByRole('heading', {
		name: 'Platform Admin',
		level: 1
	});
	public readonly headingTenants: Locator = this.page.getByRole('heading', {
		name: 'Tenants',
		level: 2
	});
	public readonly tableTenants: Locator = this.page.getByRole('table');
	public tableRowTenant(tenantId: number): Locator {
		return this.tableTenants.locator('tbody > tr').filter({ hasText: tenantId.toString() }).first();
	}
	public buttonImpersonate(tenantId: number): Locator {
		return this.tableRowTenant(tenantId).getByRole('button', { name: `Impersonate` });
	}
}
