import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { RequestHandler } from './$types';
import { successResponse } from '$lib/server/api/response';
import { getSystemDatabaseDrizzle } from '$lib/server/database';

export const POST: RequestHandler = async () => {
	const drizzle = await getSystemDatabaseDrizzle();

	await migrate(drizzle, { migrationsFolder: './drizzle' });

	return successResponse({});
};
