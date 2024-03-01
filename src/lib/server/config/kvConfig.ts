import { env } from '$env/dynamic/private';
import { CloudflareKVStrategy } from '../strategy/keyValueStore/cloudflare';
import type { KeyValueStoreStrategy } from '../strategy/keyValueStore/keyValueStore';
import { VercelKVStrategy } from '../strategy/keyValueStore/vercel';

export const getKeyValueStoreStrategy = (): KeyValueStoreStrategy => {
	const provider = env.KV_STORE_PROVIDER;

	if (provider === 'cloudflare') return createCloudflareKeyValueStore();
	if (provider === 'vercel') return createVercelKeyValueStore();
	throw new Error('Unsupported KV store provider.');
};

const createCloudflareKeyValueStore = () => {
	return new CloudflareKVStrategy();
};

const createVercelKeyValueStore = () => {
	const restApiUrl = env.KV_REST_API_URL;
	const restApiToken = env.KV_REST_API_TOKEN;

	if (!restApiUrl) throw new Error('Missing Vercel REST API URL.');
	if (!restApiToken) throw new Error('Missing Vercel REST API token.');

	return new VercelKVStrategy({
		restApiUrl,
		restApiToken
	});
};
