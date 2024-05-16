import type { RequestHandler } from './$types';
import { errorResponse, successResponse } from '$lib/server/api/response';
import { ProjectRepository } from '$lib/server/repository/project';
import { z } from 'zod';
import { getTenantDatabaseStrategy } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.tenantId) {
			return errorResponse(new Error('Missing tenant ID.'), 400);
		}

		const databaseStrategy = await getTenantDatabaseStrategy(locals.tenantId);
		const projectRepository = new ProjectRepository(databaseStrategy);

		const projects = await projectRepository.getAllProjects();

		return successResponse(projects);
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
