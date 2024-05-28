import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ClientRepository } from '$lib/server/repository/client';
import { getTenantDatabaseStrategy } from '$lib/server/database';
import { z } from 'zod';

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

export const PUT: RequestHandler = async ({ locals, request, params }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const json = await request.json();
		const data = putSchema.parse(json);

		const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
		const clientRepository = new ClientRepository(databaseStrategy);
		const clientId = parseInt(params.clientId);
		const client = await clientRepository.getClientById(clientId);
		if (!client) {
			return errorResponse(new Error('Client not found.'), 404);
		}
		const updatedClient = await clientRepository.updateClient(clientId, { name: data.newName });

		return successResponse(updatedClient);
	} catch (error) {
		return errorResponse(error);
	}
};

const putSchema = z.object({
	newName: z.string()
});
