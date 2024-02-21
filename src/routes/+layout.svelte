<script lang="ts">
	import MainNav from '$lib/components/main-nav.svelte';
	import '../app.pcss';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<MainNav />
		</div>
	</div>
	<main>
		<slot />
	</main>
</div>
