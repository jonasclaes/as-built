import type { RequestHandler } from './$types';
import { successResponse } from '$lib/server/api/response';
import { MultiTenancyService } from '$lib/server/service/multiTenancy';
import { z } from 'zod';

export const POST: RequestHandler = async ({ request }) => {
	const requestBody = await request.json();
	const { tenantId } = schema.parse(requestBody);

	const multiTenancyService = new MultiTenancyService();

	await multiTenancyService.migrateTenant({ tenantId });

	return successResponse({
		tenantId
	});
};

const schema = z.object({
	tenantId: z.number()
});
