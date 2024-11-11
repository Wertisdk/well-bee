<script lang="ts">
	import CalendarIcon from "lucide-svelte/icons/calendar";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { buttonVariants } from "$lib/components/ui/button";
	import { Calendar } from "$lib/components/ui/calendar";
	import * as Popover from "$lib/components/ui/popover";
	import * as Form from "$lib/components/ui/form";
	import {Separator} from "$lib/components/ui/separator";
	import {Slider} from "$lib/components/ui/slider";


	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});

	let trackingDate = $state<DateValue | undefined>();
	let score = $state<number[] | undefined>([8]);
	let contentRef = $state<HTMLElement | null>(null);
	let form = {
		date: new Date().toLocaleDateString('fr-CA'),
		score: 8
	};
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Track</h3>
		<p class="text-muted-foreground text-sm">
			How was your day? Let's track it!
		</p>
	</div>
	<Separator />
	<form method="POST" class="space-y-6">
		<Popover.Root>
			<Popover.Trigger
					class={cn(
					  buttonVariants({
						variant: "outline",
						class: "w-[280px] justify-start text-left font-normal"
					  }),
					  !trackingDate && "text-muted-foreground"
					)}
			>
				<CalendarIcon class="mr-2 size-4" />
				{trackingDate ? df.format(trackingDate.toDate(getLocalTimeZone())) : "Pick a date"}
			</Popover.Trigger>
			<Popover.Content bind:ref={contentRef} class="w-auto p-0">
				<Calendar type="single" bind:value={trackingDate}/>
			</Popover.Content>
		</Popover.Root>
		<div>{score}</div>
		<Slider max={10} min={1} step={1} bind:value={score}>
		</Slider>
	</form>
</div>