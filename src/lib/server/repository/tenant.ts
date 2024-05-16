import { eq } from 'drizzle-orm';
import { tenants, type TenantInsert } from '../database/schema/drizzle';
import type { DatabaseStrategy } from '../database/strategy';

export class TenantRepository {
	protected readonly keyPrefix = 'tenant';

	constructor(protected readonly databaseStrategy: DatabaseStrategy) {}

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

	async updateTenantById(tenantId: number, data: TenantInsert) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const tenant = await drizzle
			.update(tenants)
			.set(data)
			.where(eq(tenants.id, tenantId))
			.returning();

		return tenant.at(0);
	}
}
