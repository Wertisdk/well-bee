<script lang="ts">
  let email = '';
  let password = '';
  function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    // Placeholder: handle auth later
    console.log('login', Object.fromEntries(data));
  }
</script>

<h1>Login</h1>
<form onsubmit={submit} style="display:grid;gap:0.5rem;max-width:360px;">
  <label>Email <input name="email" type="email" bind:value={email} required /></label>
  <label>Password <input name="password" type="password" bind:value={password} required /></label>
  <button type="submit">Sign in</button>
</form>

