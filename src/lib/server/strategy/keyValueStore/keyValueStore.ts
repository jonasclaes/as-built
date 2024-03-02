export interface KeyValueStoreStrategy {
	get<T>(key: string): Promise<T | null>;
	set<T>(key: string, value: T): Promise<void>;
	delete(key: string): Promise<void>;
	list(pattern: string): Promise<string[]>;
}
