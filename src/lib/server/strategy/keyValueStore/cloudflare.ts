import type { KeyValueStoreStrategy } from './keyValueStore';

export class CloudflareKVStrategy implements KeyValueStoreStrategy {
	get(key: string): Promise<string | null> {
		throw new Error('Method not implemented.');
	}

	set(key: string, value: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(key: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	list(pattern: string): Promise<string[]> {
		throw new Error('Method not implemented.');
	}
}
