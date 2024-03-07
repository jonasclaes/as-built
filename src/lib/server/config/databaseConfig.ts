import { env } from '$env/dynamic/private';
import type { DatabaseStrategy } from '../strategy/database/database';
import { PgDatabaseStrategy, pgDatabaseStrategyConfig } from '../strategy/database/pg';

export const getDatabaseStrategy = (
	provider: string = env.DRIZZLE_DATABASE_PROVIDER
): DatabaseStrategy => {
	if (provider === 'neon') return createPgDatabaseStrategy();

	throw new Error('Unsupported database provider.');
};

export const createPgDatabaseStrategy = () => {
	const config = pgDatabaseStrategyConfig.parse({
		connectionString: env.DRIZZLE_DATABASE_URL
	});

	return new PgDatabaseStrategy(config);
};
