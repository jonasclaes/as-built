import { env } from '$env/dynamic/private';
import {
	CloudflareKVStrategy,
	cloudflareKVStrategyConfig
} from '../strategy/keyValueStore/cloudflare';
import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';
import { VercelKVStrategy, vercelKVStrategyConfig } from '../strategy/keyValueStore/vercel';

export const getKeyValueStoreStrategy = (
	provider: string = env.KV_STORE_PROVIDER
): KeyValueStoreStrategy => {
	if (provider === 'cloudflare') return createCloudflareKVStrategy();
	if (provider === 'vercel') return createVercelKVStrategy();

	throw new Error('Unsupported KV store provider.');
};

const createCloudflareKVStrategy = () => {
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
};

const createVercelKVStrategy = () => {
	const config = vercelKVStrategyConfig.parse({
		restApiUrl: env.KV_REST_API_URL,
		restApiToken: env.KV_REST_API_TOKEN
	});

	return new VercelKVStrategy(config);
};
