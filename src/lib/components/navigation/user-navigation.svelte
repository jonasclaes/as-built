<script lang="ts">
	import { goto } from '$app/navigation';
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
	import Button from '../ui/button/button.svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '../ui/dropdown-menu';
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar class="h-8 w-8">
				<AvatarImage
					src="https://github.com/jonasclaes.png"
					alt="https://github.com/jonasclaes.png"
				/>
				<AvatarFallback>JC</AvatarFallback>
			</Avatar>
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56" align="end">
		<DropdownMenuLabel class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Jonas Claes</p>
				<p class="text-xs leading-none text-muted-foreground">jonas@jonasclaes.be</p>
			</div>
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuItem>Profile</DropdownMenuItem>
			<DropdownMenuItem>Settings</DropdownMenuItem>
			<DropdownMenuItem on:click={() => goto('/team-settings')}>Team Settings</DropdownMenuItem>
			<DropdownMenuItem on:click={() => goto('/billing')}>Billing</DropdownMenuItem>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuItem class="text-red-600">Log out</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
