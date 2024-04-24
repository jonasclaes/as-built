import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';
import { getTenantDatabaseStrategy } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.tenantId) {
		return errorResponse(new Error('Missing tenant ID.'), 400);
	}

	const databaseStrategy = await getTenantDatabaseStrategy(parseInt(locals.tenantId));
	const projectRepository = new ProjectRepository(databaseStrategy);

	const projectsArray = await projectRepository.getProjects();

	return successResponse(projectsArray);
};
