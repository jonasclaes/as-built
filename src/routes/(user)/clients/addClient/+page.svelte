<script lang="ts">
	import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms';
    import SuperDebug from 'sveltekit-superforms';
    export let data : PageData;

    const { form } = superForm(data.form);

   


    const goToClient = () => {
		goto('../clients');
	};
</script>


<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Add Client</h2>
		<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={goToClient}>Back to all clients</button>
	</div>
</section>


<form method="POST" class="max-w-md mx-auto px-4 py-8">
    <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Client Name</label>
        <input type="text" name="name" id="name" placeholder="Enter client name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" bind:value={$form.name} />
    </div>
    <div class="flex items-center justify-end">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Client</button>
    </div>
</form>
