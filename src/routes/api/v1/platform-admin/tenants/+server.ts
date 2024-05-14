import { TenantService } from '$lib/server/service/tenantService';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const json = await request.json();
		const data = schema.parse(json);

		const tenantService = new TenantService();

		const tenant = await tenantService.createTenant(data);

		if (!tenant) {
			return errorResponse(new Error('Failed to create tenant.'), 500);
		}

		return successResponse(tenant);
	} catch (error) {
		return errorResponse(error);
	}
};

const schema = z.object({
	name: z.string()
});
