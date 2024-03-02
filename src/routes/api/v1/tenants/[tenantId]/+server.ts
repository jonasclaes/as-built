import { TenantRepository } from '$lib/server/repository/tenant';
import type { RequestHandler } from './$types';
import { getKeyValueStoreStrategy } from '$lib/server/config/kvConfig';
import { getDatabaseStrategy } from '$lib/server/config/databaseConfig';
import { errorResponse, successResponse } from '$lib/server/api/response';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tenantRepository = new TenantRepository(
			getKeyValueStoreStrategy(),
			getDatabaseStrategy()
		);

		const tenant = await tenantRepository.getTenantById(Number(params.tenantId));

		return successResponse(tenant);
	} catch (error) {
		return errorResponse(error);
	}
};
