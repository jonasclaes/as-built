import { PgDatabaseStrategy } from '$lib/server/strategy/database/pg';
import type { RequestHandler } from './$types';
import { DatabaseConfig } from '$lib/server/config/databaseConfig';
import { getKeyValueStoreStrategy } from '$lib/server/config/kvConfig';
import { TenantRepository } from '$lib/server/repository/tenant';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.tenantId) {
		return errorResponse(new Error('Missing tenant ID.'), 400);
	}

	const tenantRepository = new TenantRepository(
		getKeyValueStoreStrategy(),
		DatabaseConfig.getInstance().getDatabaseStrategy()
	);
	const databaseUrl = await tenantRepository.getTenantDatabaseUrlById(locals.tenantId);

	if (!databaseUrl) {
		return errorResponse(new Error('Database URL not found for tenant.'), 404);
	}

	const databaseStrategy = new PgDatabaseStrategy({ connectionString: databaseUrl });
	const projectRepository = new ProjectRepository(databaseStrategy);

	const projectsArray = await projectRepository.getProjects();

	return successResponse(projectsArray);
};
