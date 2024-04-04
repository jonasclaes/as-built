import { describe, expect, it } from 'vitest';
import { PgDatabaseStrategy } from './pg';
import pg from 'pg';

describe('pg', () => {
	it('should be defined', () => {
		expect(PgDatabaseStrategy).toBeDefined();
	});

	it('should create a new instance', () => {
		const instance = new PgDatabaseStrategy({
			connectionString: 'postgres://localhost:5432/test'
		});

		expect(instance).toBeDefined();
	});

	it('should get a raw connection', async () => {
		const instance = new PgDatabaseStrategy({
			connectionString: 'postgres://localhost:5432/test'
		});

		const connection = await instance.getRawConnection();

		expect(connection).toBeDefined();
		expect(connection).toBeInstanceOf(pg.Pool);
	});

	it('should get a drizzle connection', async () => {
		const instance = new PgDatabaseStrategy({
			connectionString: 'postgres://localhost:5432/test'
		});

		const connection = await instance.getDrizzle();

		expect(connection).toBeDefined();
		expect(connection).toHaveProperty('query');
	});
});
