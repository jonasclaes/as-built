export interface KeyValueStoreStrategy {
	get(key: string): Promise<string | null>;
	set(key: string, value: string): Promise<void>;
	delete(key: string): Promise<void>;
	list(pattern: string): Promise<string[]>;
}
