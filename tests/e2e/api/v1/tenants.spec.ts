import { expect } from '@playwright/test';
import { test } from '../../../lib/test';
import type { Project, Tenant } from '$lib/server/database/schema/drizzle';

let tenant: Tenant;
let project: Project;

test.beforeAll(async ({ request }) => {
	const tenantResponse = await request.post('/api/v1/platform-admin/tenants', {
		data: { name: 'Acme Inc.' }
	});
	const tenantJson = await tenantResponse.json();
	tenant = tenantJson.data;

	await request.post('/api/v1/platform-admin/tenants/migrate', { data: { tenantId: tenant.id } });

	const projectResponse = await request.post('/api/v1/projects', {
		data: { name: 'Project 1' },
		headers: { 'X-Tenant-Id': tenant.id.toString() }
	});
	const projectJson = await projectResponse.json();
	project = projectJson.data;
});

test('GET /api/v1/projects/[invalidProjectId]', async ({ request }) => {
	const response = await request.get('/api/v1/projects/-1', {
		headers: { 'X-Tenant-Id': tenant.id.toString() }
	});
	const body = await response.json();

	expect(response.status()).toBe(404);
	expect(body).toEqual({
		success: false,
		error: {
			name: 'Error',
			message: 'Project not found.'
		}
	});
});

test('GET /api/v1/projects/[validProjectId]', async ({ request }) => {
	const response = await request.get('/api/v1/projects/1', {
		headers: { 'X-Tenant-Id': tenant.id.toString() }
	});
	const body = await response.json();

	expect(response).toBeOK();
	expect(body).toEqual({
		success: true,
		data: {
			id: project.id,
			name: project.name
		}
	});
});
