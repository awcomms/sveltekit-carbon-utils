<script lang="ts">
	export let header_props: HeaderProps = {},
		offline_indicator = true;
	import { navigating } from '$app/stores';
	import { isSideNavOpen } from '$lib/components/Nav/store.js';
	import { InlineLoading, SkipToContent, Header, HeaderUtilities } from 'carbon-components-svelte';
	import ConnectionSignalOff from 'carbon-icons-svelte/lib/ConnectionSignalOff.svelte';
	import { Offline } from '@edge37/svelte-utils';
	import type { HeaderProps } from 'carbon-components-svelte/types/UIShell/Header.svelte.js';

	let offline: boolean;
</script>

{#if offline_indicator}
	<Offline bind:offline />
{/if}
<Header {...header_props} bind:isSideNavOpen={$isSideNavOpen}>
	{#if offline_indicator && offline}
		<ConnectionSignalOff />
	{/if}
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
