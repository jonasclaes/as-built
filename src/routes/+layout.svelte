<script lang="ts">
	import '../app.pcss';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>
