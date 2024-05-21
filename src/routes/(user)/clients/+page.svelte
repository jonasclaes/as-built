<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Clients</h2>
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
