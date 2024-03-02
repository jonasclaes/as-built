import { type VercelKV, createClient } from '@vercel/kv';
import type { KeyValueStoreStrategy } from './keyValueStore';
import { z } from 'zod';

export class VercelKVStrategy implements KeyValueStoreStrategy {
	protected readonly client: VercelKV;

	constructor(protected readonly config: VercelKVStrategyConfig) {
		this.client = createClient({
			url: config.restApiUrl,
			token: config.restApiToken
		});
	}

	async get(key: string): Promise<string | null> {
		return await this.client.get(key);
	}

	async set(key: string, value: string): Promise<void> {
		await this.client.set(key, value);
	}

	async delete(key: string): Promise<void> {
		await this.client.del(key);
	}

	async list(pattern: string): Promise<string[]> {
		return await this.client.keys(pattern);
	}
}

export const vercelKVStrategyConfig = z.object({
	restApiUrl: z.string().url(),
	restApiToken: z.string()
});

export type VercelKVStrategyConfig = z.infer<typeof vercelKVStrategyConfig>;
