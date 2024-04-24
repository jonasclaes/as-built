<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	const goToAddClient = () => {
		goto('clients/addClient');
	};
	</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Clients</h2>
		<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={goToAddClient}>Add client</button>
	</div>
</section>

<table class="min-w-full divide-y divide-gray-200">
    <thead>
        <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Database URL</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</th>
           
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each data.clients as client}
        <tr>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{client.id}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{client.name}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{data.clientsUrls[client.id]}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{data.clientsUrls[client.id]}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{data.clientsUrls[client.id]}</td>
        </tr>
        {/each}
    </tbody>
</table>

