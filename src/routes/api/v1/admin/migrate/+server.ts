import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { RequestHandler } from './$types';
import { DatabaseConfig } from '$lib/server/config/databaseConfig';
import { successResponse } from '$lib/server/api/response';
import { MultiTenancyService } from '$lib/server/service/multiTenancy';

export const POST: RequestHandler = async ({ locals }) => {
	if (locals.tenantId) {
		const multiTenancyService = new MultiTenancyService();

		await multiTenancyService.migrateTenant({ tenantId: locals.tenantId });

		return successResponse({
			tenantId: locals.tenantId
		});
	}

	const databaseStrategy = DatabaseConfig.getInstance().getDatabaseStrategy();
	const drizzle = await databaseStrategy.getDrizzle();
	await migrate(drizzle, { migrationsFolder: './drizzle' });

	return successResponse({
		tenantId: 'system'
	});
};
