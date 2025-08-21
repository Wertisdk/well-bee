<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex gap-4 p-3 border-b border-gray-200 dark:border-gray-800">
	<a href="/">Home</a>
	<a href="/dashboard">Dashboard</a>
	<a href="/track">Track</a>
	<a href="/profile" class="ml-auto">Profile</a>
	<a href="/login">Login</a>
</nav>

<main class="p-4">
	{@render children?.()}
</main>
