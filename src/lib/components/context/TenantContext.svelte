<script lang="ts" context="module">
	const tenantContextKey = 'tenant';
	export type TenantContextType = { id: Writable<number | undefined> };
	export const getTenantContext = () => getContext<TenantContextType>(tenantContextKey);
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let initialTenantId: number | undefined;
	const tenantId = writable<number | undefined>(initialTenantId);

	setContext<TenantContextType>(tenantContextKey, { id: tenantId });
</script>

<slot />
