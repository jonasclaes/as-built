import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CloudflareKVStrategy } from '../strategy/keyValueStore/cloudflare';
import { VercelKVStrategy } from '../strategy/keyValueStore/vercel';
import { KVConfig } from './kvConfig';

describe('getKeyValueStoreStrategy', () => {
	beforeEach(() => {
		// @ts-expect-error - private instance
		KVConfig.instance = undefined;

		vi.mock('$env/dynamic/private', () => ({
			env: {
				KV_STORE_PROVIDER: 'cloudflare',
				CF_ACCOUNT_ID: 'test_account_id',
				CF_KV_NAMESPACE_ID: 'test_namespace_id',
				CF_BEARER_TOKEN: 'test_bearer_token',
				CF_API_EMAIL: 'test_api_email',
				CF_API_KEY: 'test_api_key',
				KV_REST_API_URL: 'http://test_rest_api_url',
				KV_REST_API_TOKEN: 'test_rest_api_token'
			}
		}));
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('returns an instance when no parameters are passed', () => {
		const strategy = KVConfig.getInstance().getKeyValueStoreStrategy();
		expect(strategy).toBeInstanceOf(CloudflareKVStrategy);
	});

	it('returns an instance of CloudflareKVStrategy for "cloudflare" provider', () => {
		const strategy = KVConfig.getInstance().getKeyValueStoreStrategy('cloudflare');
		expect(strategy).toBeInstanceOf(CloudflareKVStrategy);
	});

	it('returns an instance of VercelKVStrategy for "vercel" provider', () => {
		const strategy = KVConfig.getInstance().getKeyValueStoreStrategy('vercel');
		expect(strategy).toBeInstanceOf(VercelKVStrategy);
	});

	it('throws an error for unsupported KV store providers', () => {
		const unsupportedProvider = () =>
			KVConfig.getInstance().getKeyValueStoreStrategy('unsupported');
		expect(unsupportedProvider).toThrowError('Unsupported KV store provider.');
	});
});
