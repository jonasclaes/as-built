import { getTenantDatabaseStrategy } from '$lib/server/database';
import { ProjectRepository } from '$lib/server/repository/project';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const tenantIdCookie = cookies.get('tenantId');

	if (!tenantIdCookie) {
		return error(404, 'Tenant not found');
	}

	const tenantId = parseInt(tenantIdCookie);

	const databaseStrategy = await getTenantDatabaseStrategy(tenantId);
	const projectRepository = new ProjectRepository(databaseStrategy);

	const projects = await projectRepository.getAllProjects();

	return {
		projects
	};
}) satisfies PageServerLoad;
