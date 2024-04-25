import { errorResponse, successResponse } from '$lib/server/api/response';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const requestBody = await request.json();
		const { tenantId } = schema.parse(requestBody);

		cookies.set('tenantId', tenantId.toString(), { path: '/' });

		return successResponse({});
	} catch (error) {
		return errorResponse(error);
	}
};

const schema = z.object({
	tenantId: z.number()
});
