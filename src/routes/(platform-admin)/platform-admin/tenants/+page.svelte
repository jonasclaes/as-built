<script lang="ts">
	import TenantContext, { tenantContextKey } from '$lib/components/context/TenantContext.svelte';
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

	const impersonateTenant = async (id: number) => {
		const response = await fetch(`/api/v1/platform-admin/tenants/impersonate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tenantId: id })
		});

		if (response.ok) {
			alert('Tenant impersonated');
		} else {
			alert('Failed to impersonate tenant');
		}
	};

	const createTenant = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const tenantName = formData.get('tenantName') as string;

		const response = await fetch(`/api/v1/platform-admin/tenants`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: tenantName })
		});

		if (response.ok) {
			alert('Tenant created');
		} else {
			alert('Failed to create tenant');
		}
	};
</script>

<h1>Platform Admin</h1>
<a href="/platform-admin">Back to platform admin</a>

<h2>Tenants</h2>
<form on:submit|preventDefault={createTenant}>
	<label for="tenantName">Tenant name</label>
	<input type="text" id="tenantName" name="tenantName" />
	<input type="submit" value="Create tenant" />
</form>
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
				<td>
					<button on:click={() => migrateTenant(tenant.id)}>Migrate</button>
					<button on:click={() => impersonateTenant(tenant.id)}>Impersonate</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
