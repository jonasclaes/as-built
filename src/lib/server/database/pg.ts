import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '$lib/server/database/schema/drizzle';
import type { DatabaseStrategy } from './strategy';

export class PgDatabaseStrategy implements DatabaseStrategy {
	constructor(protected readonly config: PgDatabaseStrategyConfig) {}

	async getRawConnection() {
		const pool = new pg.Pool({
			connectionString: this.config.connectionString
		});

		return pool;
	}

	async getDrizzle() {
		const db = drizzle(await this.getRawConnection(), {
			schema
		});
		return db;
	}
}

export interface PgDatabaseStrategyConfig {
	connectionString: string;
}
