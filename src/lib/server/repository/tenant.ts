import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';

export class TenantRepository {
	protected readonly keyPrefix = 'tenant:';

	constructor(protected readonly kvStoreStrategy: KeyValueStoreStrategy) {}

	async getTenantById(tenantId: string): Promise<string | null> {
		return this.kvStoreStrategy.get(this.keyPrefix + tenantId);
	}

	async setTenant(tenantId: string, data: string): Promise<void> {
		return this.kvStoreStrategy.set(this.keyPrefix + tenantId, data);
	}
}
