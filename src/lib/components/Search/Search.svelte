<script lang="ts">
	import { Button, InlineLoading, TextArea } from 'carbon-components-svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import type { SearchDocument } from '$lib/types.js';
	import axios from 'axios';
	import { notify } from '$lib/util/notify.js';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { onMount } from 'svelte';
	import SearchPagination from './SearchPagination.svelte';

	export let searched = false,
		q = '',
		route: string,
		id_route: string,
		placeholder: string,
		total: number = 0,
		items_per_page = 7,
		documents: SearchDocument[] = [],
		loading = false,
		page: number = 1;

	$: page_update(page);

	const page_update = (page: number) => {
		if (searched) get(page);
	};

	onMount(() => search_input_ref.focus());

	let search_input_ref: HTMLTextAreaElement;
	const get = async (page: number) => {
		if (!q) return;
		searched = true;
		loading = true;
		try {
			const r = await axios.get(route, { params: { q, p: page } });
			({ total, documents, page } = r.data);
			searched = true;
		} catch (e: any) {
			notify({
				title: `Search error`,
				subtitle: e.response.data.message ?? undefined,
				kind: 'error'
			});
		}

		loading = false;
	};
</script>

<OnEnter ctrl on:enter={() => get(page)} />

<div class="input">
	<TextArea rows={1} {placeholder} bind:ref={search_input_ref} bind:value={q} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</div>

{#if loading}
	<div class="line line-space">
		<p>Searching</p>
		<InlineLoading />
	</div>
{/if}

{#if searched}
	{#if documents.length}
		<SearchPagination
			{items_per_page}
			route={id_route}
			{total}
			on:update={({ detail }) => {
				page_update(detail.page);
			}}
			on:click
			{documents}
			{page}
		/>
	{:else if !loading}
		<div class="line">No results</div>
	{/if}
{/if}

<style lang="sass">
	@use '@carbon/layout'
	.input
		display: flex
		flex-direction: row
	.line-space
		column-gap: layout.$spacing-04
	.line
		display: flex
		align-items: center
		justify-content: center
</style>
