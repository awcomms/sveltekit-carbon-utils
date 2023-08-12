<script lang="ts">
	$: isOpen = false;
	$: icon = $theme === 'g100' ? Sun : Moon;

	import { HeaderAction } from 'carbon-components-svelte';
	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';
	import { theme } from '$lib/util/theme_store.js';
</script>

<HeaderAction
	on:click={() => {
		$theme = $theme === 'g100' ? 'white' : 'g100';
	}}
	on:open={() => {
		isOpen = false;
	}}
	bind:isOpen
	{icon}
	closeIcon={icon}
/>
