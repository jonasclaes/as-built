import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const tenantIdCookie = cookies.get('tenantId');

	if (!tenantIdCookie) {
		return error(404, 'Tenant not found');
	}

	const tenantId = parseInt(tenantIdCookie);

	return {
		tenantId
	};
}) satisfies LayoutServerLoad;
