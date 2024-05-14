import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';
import { getTenantDatabaseStrategy } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.tenantId) {
		return errorResponse(new Error('Missing tenant ID.'), 400);
	}

	const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
	const projectRepository = new ProjectRepository(databaseStrategy);

	const project = await projectRepository.getProjectById(parseInt(params.projectId));

	if (!project) {
		return errorResponse(new Error('Project not found.'), 404);
	}

	return successResponse(project);
};
