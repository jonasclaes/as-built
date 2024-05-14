import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { RequestHandler } from './$types';
import { successResponse } from '$lib/server/api/response';
import { getSystemDatabaseDrizzle } from '$lib/server/database';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const findServerFolderPath = (startPath: string) => {
	let currentPath = startPath;

	while (currentPath !== path.parse(currentPath).root) {
		const potentialRootPath = path.join(currentPath, '.svelte-kit');

		if (fs.existsSync(potentialRootPath)) {
			return path.resolve(potentialRootPath);
		}

		currentPath = path.dirname(currentPath);
	}

	throw new Error('.svelte-kit folder not found.');
};

export const POST: RequestHandler = async () => {
	const drizzle = await getSystemDatabaseDrizzle();

	const drizzleFolder = import.meta.env.PROD
		? path.resolve(
				findServerFolderPath(fileURLToPath(import.meta.url)),
				'output',
				'server',
				'drizzle'
			)
		: path.resolve('drizzle');

	console.log(drizzleFolder);
	console.log(fs.readdirSync(drizzleFolder));

	await migrate(drizzle, { migrationsFolder: drizzleFolder });

	return successResponse({});
};
