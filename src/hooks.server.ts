import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const tenantId: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api') && event.request.headers.has('x-tenant-id')) {
		event.locals.tenantId = event.request.headers.get('x-tenant-id');
	}
	return await resolve(event);
};

export const handle: Handle = sequence(tenantId);
