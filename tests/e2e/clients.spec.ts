import { expect } from '@playwright/test';
import { test } from '../lib/test';

test(`navigation has link 'Clients' that leads to the 'Clients' page`, async ({
	page,
	clientsPage,
	navigationComponent
}) => {
	await page.goto('/');
	await expect(navigationComponent.linkClients).toBeVisible();
	await navigationComponent.linkClients.click();
	await expect(clientsPage.headingClients).toBeVisible();
});

test(`clients page has heading 'Clients'`, async ({ clientsPage }) => {
	await clientsPage.goto();
	await expect(clientsPage.headingClients).toBeVisible();
});
