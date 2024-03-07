import { describe, expect, it, vi } from 'vitest';
import { getKeyValueStoreStrategy } from './kvConfig';
import { CloudflareKVStrategy } from '../strategy/keyValueStore/cloudflare';
import { VercelKVStrategy } from '../strategy/keyValueStore/vercel';

vi.mock('$env/dynamic/private', () => ({
	env: {
		KV_STORE_PROVIDER: 'cloudflare', // or 'vercel' for different tests
		CF_ACCOUNT_ID: 'test_account_id',
		CF_KV_NAMESPACE_ID: 'test_namespace_id',
		CF_BEARER_TOKEN: 'test_bearer_token',
		CF_API_EMAIL: 'test_api_email',
		CF_API_KEY: 'test_api_key',
		KV_REST_API_URL: 'test_rest_api_url',
		KV_REST_API_TOKEN: 'test_rest_api_token'
	}
}));

vi.mock('../strategy/keyValueStore/cloudflare', () => ({
	CloudflareKVStrategy: vi.fn(),
	cloudflareKVStrategyConfig: {
		parse: vi.fn()
	}
}));

vi.mock('../strategy/keyValueStore/vercel', () => ({
	VercelKVStrategy: vi.fn(),
	vercelKVStrategyConfig: {
		parse: vi.fn()
	}
}));

describe('getKeyValueStoreStrategy', () => {
	it('returns an instance when no parameters are passed', () => {
		const strategy = getKeyValueStoreStrategy();
		expect(strategy).toBeInstanceOf(CloudflareKVStrategy);
	});

	it('returns an instance of CloudflareKVStrategy for "cloudflare" provider', () => {
		const strategy = getKeyValueStoreStrategy('cloudflare');
		expect(strategy).toBeInstanceOf(CloudflareKVStrategy);
	});

	it('returns an instance of VercelKVStrategy for "vercel" provider', () => {
		const strategy = getKeyValueStoreStrategy('vercel');
		expect(strategy).toBeInstanceOf(VercelKVStrategy);
	});

	it('throws an error for unsupported KV store providers', () => {
		const unsupportedProvider = () => getKeyValueStoreStrategy('unsupported');
		expect(unsupportedProvider).toThrowError('Unsupported KV store provider.');
	});
});
