<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
	import { tenantContextKey } from '$lib/components/context/TenantContext.svelte';

	export let data: PageData;

	const tenantId = getContext(tenantContextKey);
</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Projects</h2>
	</div>
	<div>Current tenant ID: {tenantId}</div>
	<table>
		<thead>
			<tr>
				<th> Project ID </th>
				<th> Project Name </th>
			</tr>
		</thead>
		<tbody>
			{#each data.projects as project}
				<tr>
					<td>
						{project.id}
					</td>
					<td>
						{project.name}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
