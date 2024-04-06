import { describe, expect, it, vi } from 'vitest';
import { VercelKVStrategy } from './vercel';

describe('vercelKVStrategy', () => {
	it('should be defined', () => {
		expect(VercelKVStrategy).toBeDefined();
	});

	it('should create a new instance', () => {
		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		expect(strategy).toBeDefined();
	});

	it('should have a get method', () => {
		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		expect(strategy.get).toBeDefined();
	});

	it('should return null when getting a non-existent key', async () => {
		vi.mock('@vercel/kv', () => ({
			createClient: vi.fn().mockImplementation(() => ({
				get: vi.fn().mockResolvedValue(null)
			}))
		}));

		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		const result = await strategy.get('non-existent-key');

		expect(result).toBeNull();
	});

	it('should have a set method', () => {
		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		expect(strategy.set).toBeDefined();
	});

	it('should have a delete method', () => {
		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		expect(strategy.delete).toBeDefined();
	});

	it('should have a list method', () => {
		const strategy = new VercelKVStrategy({
			restApiUrl: 'https://example.com',
			restApiToken: 'token'
		});

		expect(strategy.list).toBeDefined();
	});
});
