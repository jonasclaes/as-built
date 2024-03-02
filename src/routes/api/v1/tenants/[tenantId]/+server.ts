import { TenantRepository } from '$lib/server/repository/tenant';
import type { RequestHandler } from './$types';
import { getKeyValueStoreStrategy } from '$lib/server/config/kvConfig';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tenantRepository = new TenantRepository(getKeyValueStoreStrategy());

		const databaseUrl = await tenantRepository.getTenantById(params.tenantId);

		if (!databaseUrl) {
			return new Response(
				JSON.stringify({ success: false, error: { message: 'Tenant not found' } }),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({
				success: true,
				data: {
					databaseUrl
				}
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: error instanceof Error ? { message: error.message } : error
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const data = await request.json();
		const databaseUrl = data.databaseUrl;

		if (!databaseUrl) {
			return new Response(
				JSON.stringify({ success: false, error: { message: 'Database URL is required' } }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const tenantRepository = new TenantRepository(getKeyValueStoreStrategy());

		await tenantRepository.setTenant(params.tenantId, databaseUrl);

		return new Response(
			JSON.stringify({
				success: true
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: error instanceof Error ? { message: error.message } : error
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
