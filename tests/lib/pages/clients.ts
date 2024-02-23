import type { Locator } from '@playwright/test';
import { BasePage } from './base';

export class ClientsPage extends BasePage {
	protected url: string = '/clients';
	public readonly headingClients: Locator = this.page.getByRole('heading', {
		name: 'Clients',
		level: 2
	});
}
