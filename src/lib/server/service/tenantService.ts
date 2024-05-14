import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { TenantRepository } from '../repository/tenant';
import format from 'pg-format';
import { getSystemDatabaseStrategy, getTenantDatabaseStrategy } from '../database';

export class TenantService {
	constructor(
		protected readonly tenantRepository: TenantRepository = new TenantRepository(
			getSystemDatabaseStrategy()
		),
		protected readonly databaseStrategy = getSystemDatabaseStrategy()
	) {}

	async createTenant({ name }: TenantServiceCreateTenantRequestDto) {
		const tenant = await this.tenantRepository.createTenant({
			name,
			databaseUrl: ''
		});

		if (!tenant) {
			throw new Error('Error creating tenant.');
		}

		const databaseName = `tenant-${tenant.id}`;
		await this.createTenantDatabase(databaseName);

		const databaseUrl = new URL(env.DRIZZLE_DATABASE_URL);
		databaseUrl.pathname = databaseName;

		this.tenantRepository.updateTenantById(tenant.id, {
			...tenant,
			databaseUrl: databaseUrl.toString()
		});

		return tenant;
	}

	async migrateTenant({ tenantId }: TenantServiceMigrateTenantRequestDto) {
		const databaseStrategy = await getTenantDatabaseStrategy(tenantId);

		const drizzle = await databaseStrategy.getDrizzle();

		await migrate(drizzle, { migrationsFolder: './drizzle' });
	}

	protected async createTenantDatabase(databaseName: string) {
		const connection = await this.databaseStrategy.getRawConnection();
		await connection.query(format('CREATE DATABASE %I', databaseName));
	}
}

export interface TenantServiceCreateTenantRequestDto {
	name: string;
}

export interface TenantServiceMigrateTenantRequestDto {
	tenantId: number;
}
