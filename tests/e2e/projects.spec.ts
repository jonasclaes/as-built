import { expect } from '@playwright/test';
import { test } from '../lib/test';

test(`navigation has link 'Projects' that leads to the 'Projects' page`, async ({
	page,
	projectsPage,
	navigationComponent
}) => {
	await page.goto('/');
	await expect(navigationComponent.linkProjects).toBeVisible();
	await navigationComponent.linkProjects.click();
	await expect(projectsPage.headingProjects).toBeVisible();
});

test(`projects page has heading 'Projects'`, async ({ projectsPage }) => {
	await projectsPage.goto();
	await expect(projectsPage.headingProjects).toBeVisible();
});
