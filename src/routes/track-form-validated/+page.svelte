<script lang="ts">
	import TrackForm from "./track-form.svelte";
	import type { PageData } from "./$types.js";
	import { Separator } from "$lib/components/ui/separator";

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Track</h3>
		<p class="text-muted-foreground text-sm">
			How was your day? Let's track it!
		</p>
	</div>
	<Separator />
	<TrackForm data={data.form} />
</div>