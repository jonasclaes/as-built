import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '$lib/server/database/schema/drizzle';

export interface DatabaseStrategy {
	getRawConnection(): Promise<pg.Pool>;
	getDrizzle(): Promise<NodePgDatabase<typeof schema>>;
}
