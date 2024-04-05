import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DatabaseConfig } from '../config/databaseConfig';
import { TenantRepository } from '../repository/tenant';
import { PgDatabaseStrategy } from '../strategy/database/pg';
import format from 'pg-format';
import type { DatabaseStrategy } from '../strategy/database/database';
import { KVConfig } from '../config/kvConfig';

export class MultiTenancyService {
	constructor(
		protected readonly tenantRepository: TenantRepository = new TenantRepository(
			KVConfig.getInstance().getKeyValueStoreStrategy(),
			DatabaseConfig.getInstance().getDatabaseStrategy()
		),
		protected readonly databaseStrategy: DatabaseStrategy = DatabaseConfig.getInstance().getDatabaseStrategy()
	) {}

	async createTenant({ name }: MultiTenancyServiceCreateTenantRequestDto) {
		const tenant = await this.tenantRepository.createTenant({
			name
		});

		if (!tenant) {
			throw new Error('Tenant not found.');
		}

		const databaseName = `tenant-${tenant.id}`;
		await this.createTenantDatabase(databaseName);

		const databaseUrl = new URL(env.DRIZZLE_DATABASE_URL);
		databaseUrl.pathname = databaseName;

		this.tenantRepository.setTenantDatabaseUrl(tenant.id.toString(), databaseUrl.toString());

		return tenant;
	}

	async migrateTenant({ tenantId }: MultiTenancyServiceMigrateTenantRequestDto) {
		const databaseUrl = await this.tenantRepository.getTenantDatabaseUrlById(tenantId);

		if (!databaseUrl) {
			throw new Error('Database URL not found for tenant.');
		}

		const databaseStrategy = new PgDatabaseStrategy({ connectionString: databaseUrl });

		const drizzle = await databaseStrategy.getDrizzle();

		await migrate(drizzle, { migrationsFolder: './drizzle' });
	}

	protected async createTenantDatabase(databaseName: string) {
		const connection = await this.databaseStrategy.getRawConnection();
		await connection.query(format('CREATE DATABASE %I', databaseName));
	}
}

export interface MultiTenancyServiceCreateTenantRequestDto {
	name: string;
}

export interface MultiTenancyServiceMigrateTenantRequestDto {
	tenantId: number;
}
