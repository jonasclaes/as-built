import { MultiTenancyService } from '$lib/server/service/multiTenancy';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const json = await request.json();
		const data = postSchema.parse(json);

		const multiTenancyService = new MultiTenancyService();
		const tenant = await multiTenancyService.createTenant(data);

		if (!tenant) {
			return errorResponse(new Error('Failed to create tenant.'), 500);
		}

		return successResponse(tenant);
	} catch (error) {
		return errorResponse(error);
	}
};

const postSchema = z.object({
	name: z.string()
});
