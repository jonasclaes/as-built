<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const createClient = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const clientName = formData.get('clientName') as string;

		const response = await fetch(`/api/v1/clients`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: clientName })
		});

		if (response.ok) {
			alert('Client created');
		} else {
			alert('Failed to create client');
		}
	};
</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Clients</h2>
	</div>
	<div>
		<h2 class="fond-bolder text-2xl">Add client</h2>
		<form on:submit|preventDefault={createClient}>
			<label for="clientName">Client name</label>
			<input type="text" id="clientName" name="clientName" />
			<input type="submit" value="Create client" />
		</form>
	</div>
	<table>
		<thead>
			<tr>
				<th> Client ID </th>
				<th> Client Name </th>
			</tr>
		</thead>
		<tbody>
			{#each data.clients as client}
				<tr>
					<td>
						{client.id}
					</td>
					<td>
						{client.name}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
