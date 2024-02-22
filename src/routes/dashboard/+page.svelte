<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Overview</h2>
	</div>
	<div class="space-y-4">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Projects</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">193</div>
					<p class="text-xs text-muted-foreground">Since the start of your account.</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Clients</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">97</div>
					<p class="text-xs text-muted-foreground">Since the start of your account.</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Project access requests</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">27.482</div>
					<p class="text-xs text-muted-foreground">Since the start of your account.</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Project file downloads</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">12.362</div>
					<p class="text-xs text-muted-foreground">Since the start of your account.</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
