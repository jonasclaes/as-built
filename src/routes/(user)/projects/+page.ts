import { Fetch, TenantFetch } from '$lib/helper/fetch';
import type { Project } from '$lib/server/database/schema/drizzle';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, parent }) => {
	const { tenantId } = await parent();

	const projectsResponse = await new TenantFetch(new Fetch(fetch), tenantId).fetch(
		'/api/v1/projects'
	);
	const projectsJson = await projectsResponse.json();

	if (!projectsResponse.ok) {
		error(projectsResponse.status, projectsJson.error.message);
	}

	const projects: Project[] = projectsJson.data;

	return { projects };
}) satisfies PageLoad;
