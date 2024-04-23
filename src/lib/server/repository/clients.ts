import { eq } from 'drizzle-orm';
import { clients, type ClientInsert } from '../database/schema/drizzle';
import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';
import type { DatabaseStrategy } from '../database/strategy';

export class ClientRepository {
    protected readonly keyPrefix = 'client';

    constructor(
        protected readonly kvStoreStrategy: KeyValueStoreStrategy,
        protected readonly databaseStrategy: DatabaseStrategy
    ) {}

    async createClient(data: ClientInsert) {
        const drizzle = await this.databaseStrategy.getDrizzle();

        const client = await drizzle.insert(clients).values(data).returning();

        return client.at(0);
    }

    async getClientById(clientId: number) {
        const drizzle = await this.databaseStrategy.getDrizzle();

        const client = await drizzle.select().from(clients).where(eq(clients.id, clientId)).execute();

        return client.at(0);
    }
    async getAllClients() {
        const drizzle = await this.databaseStrategy.getDrizzle();

        const allClients = await drizzle.select().from(clients).execute();

        return allClients;
    }

    async getClientDatabaseUrlById(clientId: number): Promise<string | null> {
        return this.kvStoreStrategy.get(`${this.keyPrefix}:${clientId}:databaseUrl`);
    }
    
    async setClientDatabaseUrl(clientId: string, databaseUrl: string): Promise<void> {
        return this.kvStoreStrategy.set(`${this.keyPrefix}:${clientId}:databaseUrl`, databaseUrl);
    }
}