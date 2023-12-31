<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderSide from '$lib/components/HeaderSide.svelte';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Breadcrumb from '$lib/components/daisyui/Breadcrumb.svelte';
	import Breadcrumbs from '$lib/components/daisyui/Breadcrumbs.svelte';
	import Drawer from '$lib/components/daisyui/Drawer.svelte';
	import Toast from '$lib/components/daisyui/Toast.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import { navbarStore } from '$lib/stores/navbarStore';
	import { publicStore } from '$lib/stores/publicStore';
	import { toastStore } from '$lib/stores/toasts';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$navbarStore.items = [
		{
			name: 'Project',
			path: `/public/project/${$publicStore.projectId}`
		},
		{
			name: 'Create revision proposal',
			path: `/public/project/${$publicStore.projectId}/revisionProposal`
		},
		{
			name: 'Settings',
			path: '/public/settings'
		}
	];

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Drawer id="navbar" bind:open={$navbarStore.open}>
	<Header />
	<main class="grow">
		{#if $page.error}
			<slot />
		{:else}
			<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
				<Breadcrumbs>
					{#each $breadcrumbStore as breadcrumb}
						<Breadcrumb href={breadcrumb.path}>{breadcrumb.name}</Breadcrumb>
					{/each}
				</Breadcrumbs>
				<slot />
			</section>
		{/if}
	</main>
	<Footer />

	<HeaderSide slot="side" />
</Drawer>
<Toast>
	{#each $toastStore as toast (toast.id)}
		<div in:slide out:fly>
			<Alert type={toast.type ?? ''}>{toast.message}</Alert>
		</div>
	{/each}
</Toast>
