<script lang="ts">
	import type {
		ResultSearchDocument
		// RedisKey
	} from '$lib/types/index.js';
	import {
		Button,
		//  Button,
		Link
	} from 'carbon-components-svelte';
	import Checkbox from 'carbon-icons-svelte/lib/Checkbox.svelte';
	import CheckboxChecked from 'carbon-icons-svelte/lib/CheckboxChecked.svelte';
	// import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	// import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	// import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	// import { client_delete } from '$lib/util/client_del';

	export let result: ResultSearchDocument,
		select = false;

	const dispatch = createEventDispatcher();
	$: console.log(result.selected, result.id);
</script>

<div class="result">
	{#if select}
		<Button
			size="small"
			kind="ghost"
			icon={result.selected ? CheckboxChecked : Checkbox}
			on:click={() => (result.selected = !result.selected)}
		/>
	{/if}
	<div class="name">
		<Link href="/c/{result.id}">{result.value.name}</Link>
	</div>
	<!-- <div class="buttons">
		{#if result.value.is_user}
			<Button kind="ghost" href={`/c/${result.id}/edit`} iconDescription="Edit" icon={Edit} />
			<Button
				kind="ghost"
				icon={TrashCan}
				on:click={async () => await client_delete(result.id).then(() => dispatch('del'))}
			/>
		{/if}
		<slot name="buttons" />
	</div> -->
</div>

<style lang="sass">
	@use '@carbon/layout'
	.name
		width: 74%
	// .buttons
	// 	display: flex
	// 	justify-content: flex-start
	.result 
		display: flex
		align-items: center
		padding: layout.$spacing-04
</style>
