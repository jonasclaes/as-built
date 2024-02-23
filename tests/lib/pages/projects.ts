import type { Locator } from '@playwright/test';
import { BasePage } from './base';

export class ProjectsPage extends BasePage {
	protected url: string = '/projects';
	public readonly headingProjects: Locator = this.page.getByRole('heading', {
		name: 'Projects',
		level: 2
	});
}
