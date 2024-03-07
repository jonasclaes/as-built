import { describe, expect, it, vi } from 'vitest';
import { createPgDatabaseStrategy, getDatabaseStrategy } from './databaseConfig';
import { PgDatabaseStrategy, pgDatabaseStrategyConfig } from '../strategy/database/pg';

vi.mock('../strategy/database/pg', () => ({
	PgDatabaseStrategy: vi.fn(),
	pgDatabaseStrategyConfig: {
		parse: vi.fn()
	}
}));

vi.mock('$env/dynamic/private', () => ({
	env: {
		DRIZZLE_DATABASE_PROVIDER: 'neon',
		DRIZZLE_DATABASE_URL: 'test'
	}
}));

describe('getDatabaseStrategy', () => {
	it('returns an instance when no parameters are passed', () => {
		const strategy = getDatabaseStrategy();
		expect(strategy).toBeInstanceOf(PgDatabaseStrategy);
		expect(pgDatabaseStrategyConfig.parse).toHaveBeenCalled();
	});

	it('returns an instance of PgDatabaseStrategy for "neon" provider', () => {
		const strategy = getDatabaseStrategy('neon');
		expect(strategy).toBeInstanceOf(PgDatabaseStrategy);
		expect(pgDatabaseStrategyConfig.parse).toHaveBeenCalled();
	});

	it('throws an error for unsupported database providers', () => {
		const unsupportedProvider = () => getDatabaseStrategy('unsupported');
		expect(unsupportedProvider).toThrowError('Unsupported database provider.');
	});
});

describe('createPgDatabaseStrategy', () => {
	it('creates a PgDatabaseStrategy with the correct configuration', () => {
		const strategy = createPgDatabaseStrategy();
		expect(pgDatabaseStrategyConfig.parse).toHaveBeenCalledWith({
			connectionString: 'test'
		});
		expect(strategy).toBeInstanceOf(PgDatabaseStrategy);
	});
});
