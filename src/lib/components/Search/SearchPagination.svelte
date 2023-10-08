<script lang="ts">
	import type { SearchDocument } from '$lib/types.js';
	import { Button, ButtonSet, Loading, Pagination } from 'carbon-components-svelte';

	export let route: string,
		page: number = 1,
		items_per_page = 7,
		documents: SearchDocument[],
		total = documents.length;

	let loading = false;
</script>

{#if loading}
	<Loading />
{:else}
	<ButtonSet stacked>
		{#each documents as document}
			<Button kind="ghost" href="/{route}/{document.id}">{document.value.n ?? ''}</Button>
		{/each}
	</ButtonSet>
{/if}

{#if total > items_per_page}
	<Pagination on:update pageSizeInputDisabled pageSize={7} totalItems={total} {page} />
{/if}
