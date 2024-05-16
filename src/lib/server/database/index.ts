import { z } from 'zod';
import { PgDatabaseStrategy } from './pg';
import { TenantRepository } from '../repository/tenant';
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
	const tenantRepository = new TenantRepository(getSystemDatabaseStrategy());

	const tenant = await tenantRepository.getTenantById(tenantId);

	if (!tenant) {
		throw new Error('Tenant not found.');
	}

	const connectionString = z.string().url().parse(tenant.databaseUrl);

	return new PgDatabaseStrategy({
		connectionString
	});
};
