import type { Cookies } from '@sveltejs/kit';

export class TenantCookieService {
	constructor(protected readonly cookie: Cookies) {}

	getTenantId() {
		const tenantIdCookie = this.cookie.get('tenantId');

		if (!tenantIdCookie) {
			return undefined;
		}

		return parseInt(tenantIdCookie);
	}

	setTenantId(tenantId: number) {
		this.cookie.set('tenantId', tenantId.toString(), { path: '/' });
	}
}
