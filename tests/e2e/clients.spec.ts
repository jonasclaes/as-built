import { expect, type Page } from '@playwright/test';
import { test } from '../lib/test';
import type { Client } from 'pg';

const mockClientsResponse = async (page: Page, projects: Client[]) => {
	await page.route('**/api/v1/clients', (route) => {
		route.fulfill({
			status: 200,
			body: JSON.stringify({
				data: projects
			})
		});
	});
};

test(`navigation has link 'Clients' that leads to the 'Clients' page`, async ({
	page,
	clientsPage,
	navigationComponent
}) => {
	await mockClientsResponse(page, []);
	await page.goto('/');
	await expect(navigationComponent.linkClients).toBeVisible();
	await navigationComponent.linkClients.click();
	await expect(clientsPage.headingClients).toBeVisible();
});

test(`clients page has heading 'Clients'`, async ({ page, clientsPage }) => {
	await mockClientsResponse(page, []);
	await clientsPage.goto();
	await expect(clientsPage.headingClients).toBeVisible();
});
