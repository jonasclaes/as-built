import { eq } from 'drizzle-orm';
import { tenants, type TenantInsert } from '../database/schema/drizzle';
import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';
import type { DatabaseStrategy } from '../database/strategy';

export class TenantRepository {
	protected readonly keyPrefix = 'tenant';

	constructor(
		protected readonly kvStoreStrategy: KeyValueStoreStrategy,
		protected readonly databaseStrategy: DatabaseStrategy
	) {}

	async createTenant(data: TenantInsert) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const tenant = await drizzle.insert(tenants).values(data).returning();

		return tenant.at(0);
	}

	async getTenantById(tenantId: number) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const tenant = await drizzle.select().from(tenants).where(eq(tenants.id, tenantId)).execute();

		return tenant.at(0);
	}

	async getAllTenants() {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const allTenants = await drizzle.select().from(tenants).execute();

		return allTenants;
	}

	async getTenantDatabaseUrlById(tenantId: number): Promise<string | null> {
		return this.kvStoreStrategy.get(`${this.keyPrefix}:${tenantId}:databaseUrl`);
	}

	async setTenantDatabaseUrl(tenantId: string, databaseUrl: string): Promise<void> {
		return this.kvStoreStrategy.set(`${this.keyPrefix}:${tenantId}:databaseUrl`, databaseUrl);
	}
}
