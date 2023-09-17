<script lang="ts">
	export let platformName: string, company: string, href: string, persistentHamburgerMenu: boolean;
	import { navigating, page } from '$app/stores';
	import { isSideNavOpen } from '$lib/components/Nav/store.js';
	import {
		InlineLoading,
		SkipToContent,
		Header,
		HeaderUtilities,
	} from 'carbon-components-svelte';
</script>

<Header
	{persistentHamburgerMenu}
	{platformName}
	{company}
	bind:isSideNavOpen={$isSideNavOpen}
	{href}
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


