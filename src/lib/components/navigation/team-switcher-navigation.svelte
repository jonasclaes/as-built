<script lang="ts">
	import { cn } from '$lib/utils';
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
	import { Button } from '../ui/button';
	import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator
	} from '../ui/command';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import Check from 'svelte-radix/Check.svelte';
	import PlusCircled from 'svelte-radix/PlusCircled.svelte';
	import { tick } from 'svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const groups = [
		{
			label: 'My teams',
			teams: [
				{
					label: 'Jonas Claes',
					value: 'jonasclaes'
				}
			]
		},
		{
			label: 'Teams',
			teams: [
				{
					label: 'Acme Inc.',
					value: 'acme-inc'
				},
				{
					label: 'Monsters Inc.',
					value: 'monsters'
				}
			]
		}
	];

	type Team = (typeof groups)[number]['teams'][number];

	let open = false;

	let selectedTeam: Team = groups[0].teams[0];

	const closeAndRefocusTrigger = (triggerId: string) => {
		open = false;
		tick().then(() => document.getElementById(triggerId)?.focus());
	};
</script>

<div>
	<Popover bind:open let:ids>
		<PopoverTrigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a team"
				class={cn('w-[200px] justify-between', className)}
			>
				<Avatar class="mr-2 h-5 w-5">
					<AvatarImage
						src="https://github.com/jonasclaes.png"
						alt="https://github.com/jonasclaes.png"
						class="grayscale"
					/>
					<AvatarFallback>JC</AvatarFallback>
				</Avatar>
				{selectedTeam.label}
				<CaretSort class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-[200px] p-0">
			<Command>
				<CommandInput placeholder="Search team..." />
				<CommandList>
					<CommandEmpty>No team found.</CommandEmpty>
					{#each groups as group}
						<CommandGroup heading={group.label}>
							{#each group.teams as team}
								<CommandItem
									onSelect={() => {
										selectedTeam = team;
										closeAndRefocusTrigger(ids.trigger);
									}}
									value={team.label}
									class="text-sm"
								>
									<Avatar class="mr-2 h-5 w-5">
										<AvatarImage
											src="https://github.com/jonasclaes.png"
											alt="https://github.com/jonasclaes.png"
											class="grayscale"
										/>
										<AvatarFallback>JC</AvatarFallback>
									</Avatar>
									{team.label}
									<Check
										class={cn(
											'ml-auto h-4 w-4',
											selectedTeam.value !== team.value && 'text-transparent'
										)}
									/>
								</CommandItem>
							{/each}
						</CommandGroup>
					{/each}
				</CommandList>
				<CommandSeparator />
				<CommandList>
					<CommandGroup>
						<CommandItem>
							<PlusCircled class="mr-2 h-5 w-5" />
							Create Team
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</div>
