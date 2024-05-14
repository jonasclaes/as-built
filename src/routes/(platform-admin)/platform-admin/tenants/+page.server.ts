import { getSystemDatabaseStrategy } from '$lib/server/database';
import { TenantRepository } from '$lib/server/repository/tenant';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tenantRepository = new TenantRepository(getSystemDatabaseStrategy());

	const tenants = await tenantRepository.getAllTenants();

	return {
		tenants
	};
}) satisfies PageServerLoad;
