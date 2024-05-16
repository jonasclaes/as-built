import type { RequestHandler } from './$types';
import { successResponse } from '$lib/server/api/response';
import { TenantService } from '$lib/server/service/tenantService';
import { z } from 'zod';

export const POST: RequestHandler = async ({ request }) => {
	const requestBody = await request.json();
	const { tenantId } = schema.parse(requestBody);

	const tenantService = new TenantService();

	await tenantService.migrateTenant({ tenantId });

	return successResponse({
		tenantId
	});
};

const schema = z.object({
	tenantId: z.number()
});
