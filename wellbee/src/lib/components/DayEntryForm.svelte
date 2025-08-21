<script lang="ts">
  export let date: string = new Date().toISOString().slice(0, 10);
  export let rating: number = 3;
  export let symptoms: Array<{ id: string; name: string }>= [
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'meltdown', name: 'Meltdown' },
    { id: 'sleep', name: 'Poor sleep' },
  ];
  let selectedSymptoms: Array<{ id: string; severity?: number }> = [];
  let journal = '';

  function toggleSymptom(id: string) {
    const exists = selectedSymptoms.find((s) => s.id === id);
    if (exists) {
      selectedSymptoms = selectedSymptoms.filter((s) => s.id !== id);
    } else {
      selectedSymptoms = [...selectedSymptoms, { id }];
    }
  }

  function setSeverity(id: string, value: number) {
    selectedSymptoms = selectedSymptoms.map((s) => (s.id === id ? { ...s, severity: value } : s));
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ submit: { date: string; rating: number; symptoms: Array<{id:string; severity?: number}>; journal: string } }>();

  function submit(event: SubmitEvent) {
    event.preventDefault();
    const payload = { date, rating, symptoms: selectedSymptoms, journal };
    dispatch('submit', payload);
  }
</script>

<form onsubmit={submit} style="display:grid;gap:1rem;max-width:640px;">
  <label style="display:flex;gap:0.5rem;align-items:center;">
    <span>Date</span>
    <input type="date" bind:value={date} />
  </label>

  <div>
    <label for="rating">Day rating: {rating}</label>
    <input id="rating" type="range" min="1" max="10" bind:value={rating} />
  </div>

  <fieldset style="border:1px solid #ddd;padding:0.75rem;">
    <legend>Symptoms</legend>
    {#each symptoms as s}
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.25rem;">
        <input id={s.id} type="checkbox" checked={selectedSymptoms.some((x) => x.id === s.id)} onchange={() => toggleSymptom(s.id)} />
        <label for={s.id} style="min-width:10rem;">{s.name}</label>
        {#if selectedSymptoms.some((x) => x.id === s.id)}
          <input aria-label={`${s.name} severity`} type="range" min="1" max="5" value={(selectedSymptoms.find((x) => x.id === s.id)?.severity) ?? 3} oninput={(e) => setSeverity(s.id, Number((e.target as HTMLInputElement).value))} />
        {/if}
      </div>
    {/each}
  </fieldset>

  <label style="display:block;">
    <div>Journal</div>
    <textarea rows={5} bind:value={journal} placeholder="Observations..."></textarea>
  </label>

  <button type="submit">Save Entry</button>
</form>

