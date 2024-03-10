import { env } from '$env/dynamic/private';
import type { DatabaseStrategy } from '../strategy/database/database';
import { PgDatabaseStrategy, pgDatabaseStrategyConfig } from '../strategy/database/pg';

export class DatabaseConfig {
	private static instance: DatabaseConfig;

	private constructor() {}

	static getInstance() {
		if (!DatabaseConfig.instance) {
			DatabaseConfig.instance = new DatabaseConfig();
		}

		return DatabaseConfig.instance;
	}

	getDatabaseStrategy(provider: string = env.DRIZZLE_DATABASE_PROVIDER): DatabaseStrategy {
		if (provider === 'neon') return this.createPgDatabaseStrategy();

		throw new Error('Unsupported database provider.');
	}

	createPgDatabaseStrategy() {
		const config = pgDatabaseStrategyConfig.parse({
			connectionString: env.DRIZZLE_DATABASE_URL
		});

		return new PgDatabaseStrategy(config);
	}
}
