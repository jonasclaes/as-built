<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Platform Admin</h1>
<h2>Tenants</h2>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Database URL</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each data.tenants as tenant}
			<tr>
				<td>{tenant.id}</td>
				<td>{tenant.name}</td>
				<td>{data.tenantUrls[tenant.id]}</td>
				<td><button>Migrate</button></td>
			</tr>
		{/each}
	</tbody>
</table>
