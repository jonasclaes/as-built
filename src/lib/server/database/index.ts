import { z } from 'zod';
import { PgDatabaseStrategy } from './pg';
import { TenantRepository } from '../repository/tenant';
import { KVConfig } from '../config/kvConfig';
import { env } from '$env/dynamic/private';

export const getSystemDatabaseStrategy = () => {
	const connectionString = z.string().url().parse(env.DRIZZLE_DATABASE_URL);

	return new PgDatabaseStrategy({
		connectionString
	});
};

export const getSystemDatabaseDrizzle = async () => {
	const databaseStrategy = getSystemDatabaseStrategy();

	return databaseStrategy.getDrizzle();
};

export const getTenantDatabaseStrategy = async (tenantId: number) => {
	const tenantRepository = new TenantRepository(
		KVConfig.getInstance().getKeyValueStoreStrategy(),
		getSystemDatabaseStrategy()
	);

	const retrievedConnectionString = await tenantRepository.getTenantDatabaseUrlById(tenantId);

	if (!retrievedConnectionString) {
		throw new Error('Database URL not found for tenant.');
	}

	const connectionString = z.string().url().parse(retrievedConnectionString);

	return new PgDatabaseStrategy({
		connectionString
	});
};
