import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DatabaseConfig } from './databaseConfig';
import { PgDatabaseStrategy } from '../strategy/database/pg';

describe('getDatabaseStrategy', () => {
	beforeEach(() => {
		// @ts-expect-error - private instance
		DatabaseConfig.instance = undefined;

		vi.mock('$env/dynamic/private', () => ({
			env: {
				DRIZZLE_DATABASE_PROVIDER: 'neon',
				DRIZZLE_DATABASE_URL: 'postgres://user:password@localhost:5432/dbname'
			}
		}));
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('returns an instance when no parameters are passed', () => {
		const configInstance = DatabaseConfig.getInstance();

		const strategy = configInstance.getDatabaseStrategy();

		expect(strategy).toBeInstanceOf(PgDatabaseStrategy);
	});

	it('returns an instance of PgDatabaseStrategy for "neon" provider', () => {
		const configInstance = DatabaseConfig.getInstance();

		const strategy = configInstance.getDatabaseStrategy('neon');

		expect(strategy).toBeInstanceOf(PgDatabaseStrategy);
	});

	it('throws an error for unsupported database providers', () => {
		const configInstance = DatabaseConfig.getInstance();

		const unsupportedProvider = () => configInstance.getDatabaseStrategy('unsupported');

		expect(unsupportedProvider).toThrowError('Unsupported database provider.');
	});
});
