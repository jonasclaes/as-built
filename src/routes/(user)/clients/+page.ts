import { Fetch, TenantFetch } from '$lib/helper/fetch';
import type { Project } from '$lib/server/database/schema/drizzle';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, parent }) => {
	const { tenantId } = await parent();

	const clientsResponse = await new TenantFetch(new Fetch(fetch), tenantId).fetch(
		'/api/v1/clients'
	);
	const clientsJson = await clientsResponse.json();

	if (!clientsResponse.ok) {
		error(clientsResponse.status, clientsJson.error.message);
	}

	const clients: Project[] = clientsJson.data;

	return { clients };
}) satisfies PageLoad;
