<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex flex-col items-center justify-between">
		<h2 class="text-[250px] font-bold tracking-tight">{$page.status}</h2>
		<p class="text-3xl tracking-tight text-muted-foreground">{$page.error?.message}</p>
	</div>
</section>
