import { TenantCookieService } from '$lib/server/service/tenantCookieService';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const setTenantIdFromHeader: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api') && event.request.headers.has('x-tenant-id')) {
		const tenantId = event.request.headers.get('x-tenant-id');

		if (tenantId != null) {
			event.locals.tenantId = parseInt(tenantId);
		}
	}

	return await resolve(event);
};

const setTenantIdFromCookie: Handle = async ({ event, resolve }) => {
	const cookieTenantId = new TenantCookieService(event.cookies).getTenantId();

	if (event.url.pathname.startsWith('/api') && cookieTenantId != null) {
		event.locals.tenantId = cookieTenantId;
	}

	return await resolve(event);
};

export const handle: Handle = sequence(setTenantIdFromHeader, setTenantIdFromCookie);
