<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const migrateTenant = async (id: number) => {
		const response = await fetch(`/api/v1/platform-admin/tenants/migrate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tenantId: id })
		});

		if (response.ok) {
			alert('Migration done');
		} else {
			alert('Failed to run migration');
		}
	};
</script>

<h1>Platform Admin</h1>
<a href="/platform-admin">Back to platform admin</a>

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
				<td><button on:click={() => migrateTenant(tenant.id)}>Migrate</button></td>
			</tr>
		{/each}
	</tbody>
</table>
