<script lang="ts" context="module">
	import { z } from "zod";

	export const trackFormSchema = z.object({
		date: z
			.string()
			.date()
			.default(() => new Date().toLocaleDateString('fr-CA'))
			// we're setting it optional so the user can clear the date and we don't run into
			// type issues, but we refine it to make sure it's not undefined
			.optional()
			.refine((date) => date !== "", "Please select a valid date."),
		score: z
			.number({
				required_error: "Required.",
			})
			.min(1, "Score must be at least 1")
			.max(10, "Score must be at most 10"),
		observation: z
			.array(z.string())
			.optional(),
	});

	export type TrackFormSchema = typeof trackFormSchema;
</script>

<script lang="ts">
	import CalendarIcon from "lucide-svelte/icons/calendar";
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
	} from "@internationalized/date";
	import * as Form from "$lib/components/ui/form";
	import * as Popover from "$lib/components/ui/popover";
	import { Calendar } from "$lib/components/ui/calendar";
	import { Input } from "$lib/components/ui/input";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils.js";
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<TrackFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(trackFormSchema),
	});
	const { form: formData, enhance, validate } = form;

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let dateValue: DateValue | undefined = $formData.date ? parseDate($formData.date) : undefined;
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field {form} name="date" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Date</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[240px] justify-start text-left font-normal",
						!dateValue && "text-muted-foreground"
					)}
					{...attrs}
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					{dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : "Pick a date"}
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="start">
					<Calendar
						bind:value={dateValue}
						isDateDisabled={(currDate) => {
							const currDateObj = currDate.toDate(getLocalTimeZone());
							const today = new Date();
							today.setHours(0, 0, 0, 0);

							return currDateObj > today || currDate.year < 1900;
						}}
						onValueChange={(value) => {
							if (value === undefined) {
								$formData.date = "";
								validate("date");
								return;
							}
							$formData.date = value.toDate("UTC").toISOString();
							validate("date");
						}}
					/>
				</Popover.Content>
				<input hidden bind:value={$formData.date} name={attrs.name} />
			</Popover.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="score" {form}>
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Save</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}