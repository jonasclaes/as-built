import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/database/schema/drizzle.ts',
	out: './drizzle',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		connectionString: process.env.DRIZZLE_DATABASE_URL ?? ''
	}
} satisfies Config;
