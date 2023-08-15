<script lang="ts">
	$: icon = $theme === 'g100' ? Moon : Sun;

	import { HeaderGlobalAction } from 'carbon-components-svelte';
	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';
	import { theme } from '$lib/util/theme_store.js';
</script>

<HeaderGlobalAction
	aria-label="Switch theme"
	on:click={() => {
		$theme = $theme === 'g100' ? 'white' : 'g100';
	}}
	{icon}
/>
