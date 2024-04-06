import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { RequestHandler } from './$types';
import { successResponse } from '$lib/server/api/response';
import { MultiTenancyService } from '$lib/server/service/multiTenancy';
import { getSystemDatabaseStrategy } from '$lib/server/database';

export const POST: RequestHandler = async ({ locals }) => {
	if (locals.tenantId) {
		const multiTenancyService = new MultiTenancyService();

		await multiTenancyService.migrateTenant({ tenantId: parseInt(locals.tenantId) });

		return successResponse({
			tenantId: locals.tenantId
		});
	}

	const databaseStrategy = getSystemDatabaseStrategy();
	const drizzle = await databaseStrategy.getDrizzle();
	await migrate(drizzle, { migrationsFolder: './drizzle' });

	return successResponse({
		tenantId: 'system'
	});
};
