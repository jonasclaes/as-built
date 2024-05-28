import { eq } from 'drizzle-orm';
import { clients, type ClientInsert } from '../database/schema/drizzle';
import type { DatabaseStrategy } from '../database/strategy';

export class ClientRepository {
	constructor(protected readonly databaseStrategy: DatabaseStrategy) {}

	async createClient(data: ClientInsert) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const client = await drizzle.insert(clients).values(data).returning();

		return client.at(0);
	}

	async getAllClients() {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const allClients = await drizzle.select().from(clients).execute();

		return allClients;
	}

	async getClientById(clientId: number) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const allClients = await drizzle
			.select()
			.from(clients)
			.where(eq(clients.id, clientId))
			.execute();

		return allClients.at(0);
	}

	async updateClient(clientId: number, client: Partial<ClientInsert>) {
		const drizzle = await this.databaseStrategy.getDrizzle();
		const currentTimestamp = new Date();

		const updatedClient = await drizzle
			.update(clients)
			.set({ ...client, updatedAt: currentTimestamp })
			.where(eq(clients.id, clientId))
			.returning();

		return updatedClient.at(0);
	}
}
