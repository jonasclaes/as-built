<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const migrate = async () => {
		const response = await fetch(`/api/v1/platform-admin/migrate`, {
			method: 'POST'
		});

		if (response.ok) {
			alert('Migration done');
		} else {
			alert('Failed to run migration');
		}
	};
</script>

<h1>Platform Admin</h1>

<button on:click={() => migrate()}>Migrate main database</button>

<ul>
	<li>
		<a href="/platform-admin/tenants">Tenants</a>
	</li>
</ul>
