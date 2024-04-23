<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}
	</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Clients</h2>
		<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={toggleForm}>Add client +</button>
	</div>
</section>


<h3>All clients</h3>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Database URL</th>
		</tr>
	</thead>
	<tbody>
		{#each data.clients as client}
			<tr>
				<td>{client.id}</td>
				<td>{client.name}</td>
				<td>{data.clientsUrls[client.id]}</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if showForm}
<form action="/addClient">
    <div class="max-w-md mx-auto bg-slate-400 rounded-lg overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <form id="superForm">
                <div class="mb-4">
                    <label for="clientName" class="block text-gray-700">Client name</label>
                    <input type="text" name="clientName" id="clientName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add client</button>
                </div>
            </form>
        </div>
    </div>
</form>
{/if}