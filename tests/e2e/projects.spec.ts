import { expect, type Page } from '@playwright/test';
import { test } from '../lib/test';
import type { Project } from '$lib/server/database/schema/drizzle';

const mockProjectsResponse = async (page: Page, projects: Project[]) => {
	await page.route('**/api/v1/projects', (route) => {
		route.fulfill({
			status: 200,
			body: JSON.stringify({
				data: projects
			})
		});
	});
};

test(`navigation has link Projects that leads to the Projects page`, async ({
	page,
	projectsPage,
	navigationComponent
}) => {
	await mockProjectsResponse(page, []);

	await page.goto('/');
	await expect(navigationComponent.linkProjects).toBeVisible();
	await navigationComponent.linkProjects.click();
	await expect(projectsPage.headingProjects).toBeVisible();
});

test(`projects page has heading 'Projects'`, async ({ page, projectsPage }) => {
	await mockProjectsResponse(page, []);

	await projectsPage.goto();
	await expect(projectsPage.headingProjects).toBeVisible();
});
