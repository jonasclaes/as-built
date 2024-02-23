import { expect } from '@playwright/test';
import { test } from '../lib/test';

test(`navigation has link 'Overview' that leads to the 'Overview' page`, async ({
	page,
	overviewPage,
	navigationComponent
}) => {
	await page.goto('/');
	await expect(navigationComponent.linkOverview).toBeVisible();
	await navigationComponent.linkOverview.click();
	await expect(overviewPage.headingOverview).toBeVisible();
});

test(`overview page has heading 'Overview'`, async ({ overviewPage }) => {
	await overviewPage.goto();
	await expect(overviewPage.headingOverview).toBeVisible();
});
