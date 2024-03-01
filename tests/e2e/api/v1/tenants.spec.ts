import { expect } from '@playwright/test';
import { test } from '../../../lib/test';

test('GET /api/v1/tenants/000', async ({ request }) => {
	const response = await request.get('/api/v1/tenants/000');
	const body = await response.json();

	expect(response.status()).toBe(404);
	expect(body).toEqual({
		success: false,
		error: { message: 'Tenant not found' }
	});
});

test('PUT /api/v1/tenants/123', async ({ request }) => {
	const response = await request.put('/api/v1/tenants/123', {
		data: {
			databaseUrl: 'postgres://localhost:5432/tenant123'
		}
	});

	expect(response).toBeOK();
});

test('GET /api/v1/tenants/123', async ({ request }) => {
	const response = await request.get('/api/v1/tenants/123');
	const body = await response.json();

	expect(response).toBeOK();
	expect(body).toEqual({
		success: true,
		data: {
			databaseUrl: 'postgres://localhost:5432/tenant123'
		}
	});
});
