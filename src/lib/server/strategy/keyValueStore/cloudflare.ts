import { z } from 'zod';
import type { KeyValueStoreStrategy } from './keyValueStore';
import Cloudflare from 'cloudflare';

export class CloudflareKVStrategy implements KeyValueStoreStrategy {
	protected readonly client: Cloudflare;

	constructor(protected readonly config: CloudflareKVStrategyConfig) {
		let _client: Cloudflare | undefined;

		if ('bearerToken' in config.security) {
			_client = new Cloudflare({
				token: config.security.bearerToken
			});
		}

		if ('apiEmail' in config.security && 'apiKey' in config.security) {
			_client = new Cloudflare({
				email: config.security.apiEmail,
				key: config.security.apiKey
			});
		}

		if (!_client) throw new Error('Invalid Cloudflare KV strategy configuration');
		this.client = _client;
	}

	async get<T>(key: string): Promise<T | null> {
		const response = await this.client.enterpriseZoneWorkersKV.read(
			this.config.accountId,
			this.config.namespaceId,
			key
		);

		if (typeof response === 'string' || typeof response === 'undefined') return response;
		throw new Error('Invalid response from Cloudflare KV');
	}

	async set<T>(key: string, value: T): Promise<void> {
		await this.client.enterpriseZoneWorkersKV.add(
			this.config.accountId,
			this.config.namespaceId,
			key,
			typeof value !== 'string' ? JSON.stringify(value) : value
		);
	}

	async delete(key: string): Promise<void> {
		await this.client.enterpriseZoneWorkersKV.del(
			this.config.accountId,
			this.config.namespaceId,
			key
		);
	}

	async list(pattern: string): Promise<string[]> {
		const response = await this.client.enterpriseZoneWorkersKV.browse(
			this.config.accountId,
			this.config.namespaceId
		);

		if (
			typeof response === 'object' &&
			'result' in response &&
			typeof response.result === 'object' &&
			Array.isArray(response.result)
		) {
			return response.result.map((entry) => entry.name).filter((name) => name.match(pattern));
		}

		throw new Error('Invalid response from Cloudflare KV');
	}
}

export const cloudflareKVStrategyConfig = z.object({
	accountId: z.string(),
	namespaceId: z.string(),
	security: z
		.object({
			bearerToken: z.string()
		})
		.or(
			z.object({
				apiEmail: z.string(),
				apiKey: z.string()
			})
		)
});

export type CloudflareKVStrategyConfig = z.infer<typeof cloudflareKVStrategyConfig>;
