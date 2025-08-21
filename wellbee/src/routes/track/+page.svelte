<script lang="ts">
  import DayEntryForm from '$lib/components/DayEntryForm.svelte';
  import { entries } from '$lib/stores/entries';
  function onSubmit(event: CustomEvent) {
    entries.add({
      date: event.detail.date,
      rating: event.detail.rating,
      symptoms: event.detail.symptoms,
      journal: event.detail.journal
    });
  }
</script>

<h1>Daily Tracking</h1>
<DayEntryForm on:submit={onSubmit} />

