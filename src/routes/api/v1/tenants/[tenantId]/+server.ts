import { TenantRepository } from '$lib/server/repository/tenant';
import type { RequestHandler } from './$types';
import { DatabaseConfig } from '$lib/server/config/databaseConfig';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { KVConfig } from '$lib/server/config/kvConfig';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tenantRepository = new TenantRepository(
			KVConfig.getInstance().getKeyValueStoreStrategy(),
			DatabaseConfig.getInstance().getDatabaseStrategy()
		);

		const tenant = await tenantRepository.getTenantById(Number(params.tenantId));

		if (!tenant) {
			return errorResponse(new Error('Tenant not found.'), 404);
		}

		return successResponse(tenant);
	} catch (error) {
		return errorResponse(error);
	}
};
