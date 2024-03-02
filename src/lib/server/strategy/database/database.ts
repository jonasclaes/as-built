import type { NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '$lib/server/database/schema/drizzle';

export interface DatabaseStrategy {
	getRawConnection(): Promise<NodePgClient>;
	getDrizzle(): Promise<NodePgDatabase<typeof schema>>;
}
