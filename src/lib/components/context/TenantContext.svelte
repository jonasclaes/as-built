<script lang="ts" context="module">
	export const tenantContextKey = 'tenant';
	export type TenantContextType = number;
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	export let tenantId: number;

	setContext<TenantContextType>(tenantContextKey, tenantId);
</script>

<slot />
