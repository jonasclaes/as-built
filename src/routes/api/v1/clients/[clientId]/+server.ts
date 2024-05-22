import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ClientRepository } from '$lib/server/repository/client';
import { getTenantDatabaseStrategy } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.tenantId) {
		return errorResponse(new Error('Missing tenant ID.'), 400);
	}

	const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
	const clientRepository = new ClientRepository(databaseStrategy);

	const client = await clientRepository.getClientById(parseInt(params.clientId));

	if (!client) {
		return errorResponse(new Error('Client not found.'), 404);
	}

	return successResponse(client);
};
