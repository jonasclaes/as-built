import { KVConfig } from '$lib/server/config/kvConfig';
import { getSystemDatabaseStrategy } from '$lib/server/database';
import { TenantRepository } from '$lib/server/repository/tenant';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tenantRepository = new TenantRepository(
		KVConfig.getInstance().getKeyValueStoreStrategy(),
		getSystemDatabaseStrategy()
	);

	const tenants = await tenantRepository.getAllTenants();

	const tenantUrls: Record<number, string> = {};

	for (const tenant of tenants) {
		const databaseUrl = await tenantRepository.getTenantDatabaseUrlById(tenant.id);

		tenantUrls[tenant.id] = databaseUrl ?? '';
	}

	return {
		tenants,
		tenantUrls
	};
}) satisfies PageServerLoad;
