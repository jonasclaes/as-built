import type { LayoutServerLoad } from './$types';
import { TenantCookieService } from '$lib/server/service/tenantCookieService';

export const ssr = false;

export const load = (async ({ cookies }) => {
	const tenantId = new TenantCookieService(cookies).getTenantId();

	return {
		tenantId
	};
}) satisfies LayoutServerLoad;
