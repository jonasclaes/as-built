import { KVConfig } from '$lib/server/config/kvConfig';
import { getSystemDatabaseStrategy } from '$lib/server/database';
import { ClientRepository } from '$lib/server/repository/clients';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const clientRepository = new ClientRepository(
        KVConfig.getInstance().getKeyValueStoreStrategy(),
        getSystemDatabaseStrategy()
    );

    const clients = await clientRepository.getAllClients();

    const clientsUrls: Record<number, string> = {};

    for (const client of clients) {
        const databaseUrl = await clientRepository.getClientDatabaseUrlById(client.id);

        clientsUrls[client.id] = databaseUrl ?? '';
    }

    return {
        clients,
        clientsUrls
    };
}) satisfies PageServerLoad;