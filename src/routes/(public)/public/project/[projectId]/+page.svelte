<script lang="ts">
	import Link from '$lib/components/daisyui/Link.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import { publicStore } from '$lib/stores/publicStore';
	import type { PageData } from './$types';

	export let data: PageData;

	let { organization, project, revisions, revisionProposals } = data;
	$: ({ organization, project, revisions, revisionProposals } = data);

	$publicStore.projectId = project.id;

	$breadcrumbStore = [
		{
			name: 'Project'
		},
		{
			name: project.name,
			path: `/public/project/${project.id}`
		}
	];
</script>

<div>
	<h1 class="text-3xl">{project.name} by {organization.name}</h1>
	<p class="text-base-content text-opacity-50">{project.code}</p>
</div>
<div class="grid md:grid-cols-1 gap-3">
	<Link color="primary" href="/public/project/{project.id}/revisionProposal"
		>Create revision proposal</Link
	>
</div>
<h2 class="text-2xl">Revisions</h2>
{#if revisions && revisions.length > 0}
	<div class="overflow-x-auto overflow-y-auto">
		<table class="table table-pin-rows">
			<thead>
				<tr>
					<th>Code</th>
					<th>Created at</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each revisions as revision}
					<tr class="hover">
						<td class="font-bold">
							{revision.code}
						</td>
						<td>
							{new Date(revision.created_at ?? '').toLocaleString()}
						</td>
						<th>
							<div class="flex justify-end">
								<Link
									href="/public/project/{project.id}/revision/{revision.id}"
									style="ghost"
									size="xs">Details</Link
								>
							</div>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="text-center text-base-content text-opacity-50">
		This project does not have any revisions yet. Ask the owner of this project to create at least
		one.
	</p>
{/if}
<h2 class="text-2xl">Revision proposals</h2>
{#if revisionProposals && revisionProposals.length > 0}
	<div class="overflow-x-auto overflow-y-auto">
		<table class="table table-pin-rows">
			<thead>
				<tr>
					<th>Title</th>
					<th>Created at</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each revisionProposals as revisionProposal}
					<tr class="hover">
						<td class="font-bold">
							{revisionProposal.title}
						</td>
						<td>
							{new Date(revisionProposal.created_at ?? '').toLocaleString()}
						</td>
						<th>
							<div class="flex justify-end">
								<Link
									href="/public/project/{project.id}/revisionProposal/{revisionProposal.id}"
									style="ghost"
									size="xs">Details</Link
								>
							</div>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="text-center text-base-content text-opacity-50">
		This project does not have any revisions yet. Ask the owner of this project to create at least
		one.
	</p>
{/if}
