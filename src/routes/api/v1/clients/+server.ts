import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { z } from 'zod';
import { getTenantDatabaseStrategy } from '$lib/server/database';
import { ClientRepository } from '$lib/server/repository/client';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
		const clientRepository = new ClientRepository(databaseStrategy);

		const clients = await clientRepository.getAllClients();

		return successResponse(clients);
	} catch (error) {
		return errorResponse(error);
	}
};

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const json = await request.json();
		const data = postSchema.parse(json);

		const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
		const clientRepository = new ClientRepository(databaseStrategy);

		const client = await clientRepository.createClient(data);

		return successResponse(client);
	} catch (error) {
		return errorResponse(error);
	}
};

const postSchema = z.object({
	name: z.string()
});