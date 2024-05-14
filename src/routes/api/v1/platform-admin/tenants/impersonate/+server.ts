import { errorResponse, successResponse } from '$lib/server/api/response';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { TenantCookieService } from '$lib/server/service/tenantCookieService';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const requestBody = await request.json();
		const { tenantId } = schema.parse(requestBody);

		new TenantCookieService(cookies).setTenantId(tenantId);

		return successResponse({});
	} catch (error) {
		return errorResponse(error);
	}
};

const schema = z.object({
	tenantId: z.number()
});
