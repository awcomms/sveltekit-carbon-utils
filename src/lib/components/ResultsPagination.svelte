<script lang="ts">
	import type { ResultSearchDocument } from '$lib/types/index.js';
	import Results from './Results.svelte';
	import { Loading, Pagination } from 'carbon-components-svelte';

	export let page: number = 1,
		totalItems: number,
		select = false,
		results: ResultSearchDocument[];

	let loading = false;

	// const get = async (page: number) => {
	// 	({ total: totalItems, documents: results } = await axios
	// 		.post('/c/get', { page, filters })
	// 		.then((r) => r.data)
	// 		.catch((e) =>
	// 			notify({
	// 				title: 'Encountered an error attempting to fetch Churches',
	// 				subtitle: e.response.data,
	// 				kind: 'error'
	// 			})
	// 		));
	// };
</script>

{#if loading}
	<Loading />
{:else}
	<Results on:select-click on:select on:deselect {select} {results} />
{/if}

<Pagination on:update pageSizeInputDisabled pageSize={7} {totalItems} {page} />
