import { env } from '$env/dynamic/private';
import {
	CloudflareKVStrategy,
	cloudflareKVStrategyConfig
} from '../strategy/keyValueStore/cloudflare';
import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';
import { VercelKVStrategy, vercelKVStrategyConfig } from '../strategy/keyValueStore/vercel';

export class KVConfig {
	private static instance: KVConfig;

	private constructor() {}

	static getInstance() {
		if (!KVConfig.instance) {
			KVConfig.instance = new KVConfig();
		}

		return KVConfig.instance;
	}

	getKeyValueStoreStrategy(provider: string = env.KV_STORE_PROVIDER): KeyValueStoreStrategy {
		if (provider === 'cloudflare') return this.createCloudflareKVStrategy();
		if (provider === 'vercel') return this.createVercelKVStrategy();

		throw new Error('Unsupported KV store provider.');
	}

	createCloudflareKVStrategy() {
		const config = cloudflareKVStrategyConfig.parse({
			accountId: env.CF_ACCOUNT_ID,
			namespaceId: env.CF_KV_NAMESPACE_ID,
			security: {
				bearerToken: env.CF_BEARER_TOKEN,
				apiEmail: env.CF_API_EMAIL,
				apiKey: env.CF_API_KEY
			}
		});

		return new CloudflareKVStrategy(config);
	}

	createVercelKVStrategy() {
		const config = vercelKVStrategyConfig.parse({
			restApiUrl: env.KV_REST_API_URL,
			restApiToken: env.KV_REST_API_TOKEN
		});

		return new VercelKVStrategy(config);
	}
}
