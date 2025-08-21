<script lang="ts">
  import DayEntryForm from '$lib/components/DayEntryForm.svelte';
  function onSubmit(event: CustomEvent) {
    console.log('day-entry.submit', event.detail);
  }
</script>

<h1>Daily Tracking</h1>
<DayEntryForm on:submit={onSubmit} />

