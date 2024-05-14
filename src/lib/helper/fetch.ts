export interface IFetch {
	fetch(url: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response>;
}

export class Fetch implements IFetch {
	constructor(private readonly _fetch: typeof fetch) {}

	fetch(url: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> {
		return this._fetch(url, init);
	}
}

export class TenantFetch implements IFetch {
	constructor(
		private readonly component: IFetch,
		private readonly tenantId: number | undefined
	) {}

	fetch(url: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> {
		init = init || {};
		init.headers = new Headers(init.headers);

		init.headers.set('x-tenant-id', this.tenantId?.toString() || '');

		console.log('url', url, init.headers);

		return this.component.fetch(url, init);
	}
}
