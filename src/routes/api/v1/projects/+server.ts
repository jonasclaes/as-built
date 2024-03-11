import { PgDatabaseStrategy } from '$lib/server/strategy/database/pg';
import type { RequestHandler } from './$types';
import { DatabaseConfig } from '$lib/server/config/databaseConfig';
import { TenantRepository } from '$lib/server/repository/tenant';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';
import { z } from 'zod';
import { KVConfig } from '$lib/server/config/kvConfig';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const json = await request.json();
		const data = postSchema.parse(json);

		const tenantRepository = new TenantRepository(
			KVConfig.getInstance().getKeyValueStoreStrategy(),
			DatabaseConfig.getInstance().getDatabaseStrategy()
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
