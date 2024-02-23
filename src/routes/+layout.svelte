<script lang="ts">
	import '../app.pcss';
	import TeamSwitcherNavigation from '$lib/components/navigation/team-switcher-navigation.svelte';
	import MainNavigation from '$lib/components/navigation/main-navigation.svelte';
	import SearchNavigation from '$lib/components/navigation/search-navigation.svelte';
	import UserNavigation from '$lib/components/navigation/user-navigation.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="hidden flex-col sm:flex">
	<div class="border-b" data-testid="top-navbar">
		<div class="flex h-16 items-center px-4">
			<TeamSwitcherNavigation />
			<MainNavigation class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<SearchNavigation />
				<UserNavigation />
			</div>
		</div>
	</div>
	<main>
		<slot />
	</main>
</div>
