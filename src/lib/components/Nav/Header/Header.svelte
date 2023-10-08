<script lang="ts">
	export let props: HeaderProps = {}
	import { navigating, page } from '$app/stores';
	import { isSideNavOpen } from '$lib/components/Nav/store.js';
	import { InlineLoading, SkipToContent, Header, HeaderUtilities } from 'carbon-components-svelte';
	import type { HeaderProps } from 'carbon-components-svelte/types/UIShell/Header.svelte.js';
</script>

<Header
	{...props}
	bind:isSideNavOpen={$isSideNavOpen}
>
	{#if $navigating}
		<InlineLoading />
	{/if}
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<slot name="header" />
	<HeaderUtilities>
		<slot name="header-utilities" />
	</HeaderUtilities>
</Header>
