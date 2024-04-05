import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { RequestHandler } from './$types';
import { DatabaseConfig } from '$lib/server/config/databaseConfig';
import { successResponse } from '$lib/server/api/response';

export const POST: RequestHandler = async () => {
	const databaseStrategy = DatabaseConfig.getInstance().getDatabaseStrategy();
	const drizzle = await databaseStrategy.getDrizzle();

	await migrate(drizzle, { migrationsFolder: './drizzle' });

	return successResponse({});
};
