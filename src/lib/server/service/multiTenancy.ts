import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { TenantRepository } from '../repository/tenant';
import format from 'pg-format';
import { KVConfig } from '../config/kvConfig';
import { getSystemDatabaseStrategy, getTenantDatabaseStrategy } from '../database';

export class MultiTenancyService {
	constructor(
		protected readonly tenantRepository: TenantRepository = new TenantRepository(
			KVConfig.getInstance().getKeyValueStoreStrategy(),
			getSystemDatabaseStrategy()
		),
		protected readonly databaseStrategy = getSystemDatabaseStrategy()
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
		const databaseStrategy = await getTenantDatabaseStrategy(tenantId);

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
