<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let { children } = $props();
</script>

<div class="container">
	<ParaglideJS {i18n}>
		{@render children()}
	</ParaglideJS>
</div>