<script lang="ts">
  let name = '';
  let childName = '';
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  function save(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    console.log('profile.save', data);
  }
</script>

<h1>Profile</h1>
<form onsubmit={save} style="display:grid;gap:0.5rem;max-width:460px;">
  <label>Name <input name="name" bind:value={name} /></label>
  <label>Child name <input name="childName" bind:value={childName} /></label>
  <label>Time zone <input name="timezone" bind:value={timezone} /></label>
  <button type="submit">Save</button>
</form>

