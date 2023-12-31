<script lang="ts">
	import Divider from '$lib/components/daisyui/Divider.svelte';
	import Stat from '$lib/components/daisyui/Stat.svelte';
	import Stats from '$lib/components/daisyui/Stats.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import type { PageData } from './$types';

	export let data: PageData;

	let { projects, totalProjects, projectsPerPage, clients, totalClients, clientsPerPage } = data;
	$: ({ projects, totalProjects, projectsPerPage, clients, totalClients, clientsPerPage } = data);

	let projectIndex = 1;
	let clientIndex = 1;
	let projectPages = Math.ceil(totalProjects / projectsPerPage);
	let clientPages = Math.ceil(totalClients / clientsPerPage);

	let projectSearchText = '';
	let clientSearchText = '';

	$breadcrumbStore = [{ name: 'Dashboard', path: '/' }];
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Stats class="lg:stats-horizontal shadow bg-base-200">
	<Stat
		title="Projects"
		value={totalProjects.toString()}
		description="Total amount of projects"
		class="place-items-center"
		data-testid="statTotalProjects"
	/>
	<Stat
		title="Clients"
		value={totalClients.toString()}
		description="Total amount of clients"
		class="place-items-center"
		data-testid="statTotalClients"
	/>
</Stats>
<Divider />
<div class="flex flex-col md:flex-row gap-3 justify-between">
	<h2 class="text-3xl">Projects</h2>
	<a href="/project" class="btn btn-primary">New project</a>
</div>
<div class="join">
	<input
		name="projectSearch"
		class="input input-bordered join-item w-full"
		placeholder="Search..."
		bind:value={projectSearchText}
	/>
	<button class="btn join-item">Search</button>
</div>
{#if projects && projects.length > 0}
	<div class="overflow-x-auto overflow-y-auto">
		<table class="table table-pin-rows" data-testid="projectsTable">
			<thead>
				<tr>
					<th>Project</th>
					<th>Client</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each projects
					.filter((project) => project.name
							?.toLowerCase()
							.includes(projectSearchText.toLowerCase()))
					.slice((projectIndex - 1) * projectsPerPage, projectIndex * projectsPerPage) as project}
					<tr class="hover">
						<td>
							<div class="flex items-center">
								<div>
									<div class="font-bold">{project.name}</div>
									<div class="text-sm opacity-50">
										{project.code}
									</div>
								</div>
							</div>
						</td>
						<td>
							{project.clients?.name ?? 'No client assigned'}
						</td>
						<th>
							<div class="flex justify-end">
								<a href="/project/{project.id}" class="btn btn-ghost btn-xs">Details</a>
							</div>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="join flex justify-center">
		{#if projectIndex !== 1}
			<button class="join-item btn" on:click={() => (projectIndex = 1)}>&lt;&lt;</button>
			<button class="join-item btn" on:click={() => (projectIndex -= 1)}>&lt;</button>
		{/if}
		<button class="join-item btn">Page {projectIndex}</button>
		{#if projectIndex !== projectPages}
			<button class="join-item btn" on:click={() => (projectIndex += 1)}>&gt;</button>
			<button class="join-item btn" on:click={() => (projectIndex = projectPages)}>&gt;&gt;</button>
		{/if}
	</div>
{:else}
	<p class="text-center text-base-content text-opacity-50">
		You don't have any projects yet. Why don't you <a
			href="/project"
			class="text-primary underline hover:text-primary-focus">create</a
		> one now?
	</p>
{/if}
<Divider />
<div class="flex flex-col md:flex-row gap-3 justify-between">
	<h2 class="text-3xl">Clients</h2>
	<a href="/client" class="btn btn-primary">New client</a>
</div>
<div class="join">
	<input
		name="clientSearch"
		class="input input-bordered join-item w-full"
		placeholder="Search..."
		bind:value={clientSearchText}
	/>
	<button class="btn join-item">Search</button>
</div>
{#if clients && clients.length > 0}
	<div class="overflow-x-auto overflow-y-auto">
		<table class="table table-pin-rows" data-testid="clientsTable">
			<thead>
				<tr>
					<th>Client</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each clients
					.filter((client) => client.name?.toLowerCase().includes(clientSearchText.toLowerCase()))
					.slice((clientIndex - 1) * clientsPerPage, clientIndex * clientsPerPage) as client}
					<tr class="hover">
						<td>
							<div class="flex items-center">
								<div>
									<div class="font-bold">{client.name}</div>
									<div class="text-sm opacity-50">{client.code}</div>
								</div>
							</div>
						</td>
						<th>
							<div class="flex justify-end">
								<a href="/client/{client.id}" class="btn btn-ghost btn-xs">Details</a>
							</div>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="join flex justify-center">
		{#if clientIndex !== 1}
			<button class="join-item btn" on:click={() => (clientIndex = 1)}>&lt;&lt;</button>
			<button class="join-item btn" on:click={() => (clientIndex -= 1)}>&lt;</button>
		{/if}
		<button class="join-item btn">Page {clientIndex}</button>
		{#if clientIndex !== clientPages}
			<button class="join-item btn" on:click={() => (clientIndex += 1)}>&gt;</button>
			<button class="join-item btn" on:click={() => (clientIndex = clientPages)}>&gt;&gt;</button>
		{/if}
	</div>
{:else}
	<p class="text-center text-base-content text-opacity-50">
		You don't have any clients yet. Why don't you <a
			href="/client"
			class="text-primary underline hover:text-primary-focus">create</a
		> one now?
	</p>
{/if}
