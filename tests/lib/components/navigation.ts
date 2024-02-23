import type { Locator } from '@playwright/test';
import { BaseComponent } from './base';

export class NavigationComponent extends BaseComponent {
	protected baseLocator: Locator = this.page.getByTestId('top-navbar');
	public readonly linkOverview: Locator = this.baseLocator.getByRole('link', {
		name: 'Overview'
	});
	public readonly linkProjects: Locator = this.baseLocator.getByRole('link', {
		name: 'Projects'
	});
	public readonly linkClients: Locator = this.baseLocator.getByRole('link', {
		name: 'Clients'
	});
}
