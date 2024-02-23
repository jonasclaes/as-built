import { test as base } from '@playwright/test';
import { OverviewPage } from './pages/overview';
import { NavigationComponent } from './components/navigation';
import { ProjectsPage } from './pages/projects';
import { ClientsPage } from './pages/clients';

export const test = base.extend<{
	overviewPage: OverviewPage;
	projectsPage: ProjectsPage;
	clientsPage: ClientsPage;

	navigationComponent: NavigationComponent;
}>({
	overviewPage: async ({ page }, use) => {
		await use(new OverviewPage(page));
	},
	projectsPage: async ({ page }, use) => {
		await use(new ProjectsPage(page));
	},
	clientsPage: async ({ page }, use) => {
		await use(new ClientsPage(page));
	},

	navigationComponent: async ({ page }, use) => {
		await use(new NavigationComponent(page));
	}
});
