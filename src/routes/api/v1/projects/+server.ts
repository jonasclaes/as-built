import { PgDatabaseStrategy } from '$lib/server/strategy/database/pg';
import type { RequestHandler } from './$types';
import { getDatabaseStrategy } from '$lib/server/config/databaseConfig';
import { getKeyValueStoreStrategy } from '$lib/server/config/kvConfig';
import { TenantRepository } from '$lib/server/repository/tenant';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const json = await request.json();
		const data = postSchema.parse(json);

		const tenantRepository = new TenantRepository(
			getKeyValueStoreStrategy(),
			getDatabaseStrategy()
		);
		const databaseUrl = await tenantRepository.getTenantDatabaseUrlById(locals.tenantId);

		if (!databaseUrl) {
			return errorResponse(new Error('Database URL not found for tenant.'), 404);
		}

		const databaseStrategy = new PgDatabaseStrategy({ connectionString: databaseUrl });
		const projectRepository = new ProjectRepository(databaseStrategy);

		const project = await projectRepository.createProject(data);

		return successResponse(project);
	} catch (error) {
		return errorResponse(error);
	}
};

const postSchema = z.object({
	name: z.string()
});
