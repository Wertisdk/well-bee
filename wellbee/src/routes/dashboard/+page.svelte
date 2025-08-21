<script lang="ts">
  import { onDestroy } from 'svelte';
  import { entries, type DayEntry } from '$lib/stores/entries';
  let list: DayEntry[] = [];
  const unsub = entries.subscribe((v) => (list = v));
  onDestroy(unsub);

  let byDate: DayEntry[] = [];
  let ratings: number[] = [];
  let avg: string | number = '—';
  let last7: number[] = [];
  let last7Avg: string | number = '—';
  $: byDate = [...list].sort((a, b) => a.date.localeCompare(b.date));
  $: ratings = byDate.map((e) => e.rating);
  $: avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  $: last7 = ratings.slice(-7);
  $: last7Avg = last7.length ? (last7.reduce((a, b) => a + b, 0) / last7.length).toFixed(1) : '—';
</script>

<h1>Dashboard</h1>
{#if list.length === 0}
  <p>No entries yet. Add one on the Track page.</p>
{:else}
  <div class="grid gap-3 md:grid-cols-3">
    <div class="p-4 border rounded">
      <div class="text-sm text-gray-500">All-time average</div>
      <div class="text-3xl font-semibold">{avg}</div>
    </div>
    <div class="p-4 border rounded">
      <div class="text-sm text-gray-500">Last 7 days avg</div>
      <div class="text-3xl font-semibold">{last7Avg}</div>
    </div>
    <div class="p-4 border rounded">
      <div class="text-sm text-gray-500">Total entries</div>
      <div class="text-3xl font-semibold">{list.length}</div>
    </div>
  </div>

  <h2 class="mt-6 mb-2 text-lg font-semibold">Recent entries</h2>
  <ul class="space-y-2">
    {#each list.slice(0, 10) as e}
      <li class="border rounded p-3 flex items-start justify-between gap-3">
        <div>
          <div class="font-medium">{e.date}</div>
          <div class="text-sm text-gray-600">Rating: {e.rating}</div>
          {#if e.symptoms.length}
            <div class="text-xs text-gray-500">{e.symptoms.map((s) => `${s.id}${s.severity ? `(${s.severity})` : ''}`).join(', ')}</div>
          {/if}
          {#if e.journal}
            <div class="text-sm mt-1">{e.journal}</div>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
{/if}

