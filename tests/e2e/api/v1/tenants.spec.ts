import { expect } from '@playwright/test';
import { test } from '../../../lib/test';

test('GET /api/v1/tenants/-1', async ({ request }) => {
	const response = await request.get('/api/v1/tenants/-1');
	const body = await response.json();

	expect(response.status()).toBe(404);
	expect(body).toEqual({
		success: false,
		error: {
			name: 'Error',
			message: 'Tenant not found.'
		}
	});
});

test('GET /api/v1/tenants/22', async ({ request }) => {
	const response = await request.get('/api/v1/tenants/22');
	const body = await response.json();

	expect(response).toBeOK();
	expect(body).toEqual({
		success: true,
		data: {
			id: 22,
			name: 'Acme Inc.'
		}
	});
});
