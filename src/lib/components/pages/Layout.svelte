<script lang="ts">
	export let header_props: HeaderProps | undefined = undefined,
		theme_switch = true,
		offline_indicator = true;
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Header from '$lib/components/Nav/Header/Header.svelte';
	import SideNav from '$lib/components/Nav/SideNav.svelte';
	import Notifications from '$lib/components/Notification/Notifications.svelte';
	import { theme } from '$lib/util/theme_store.js';
	import type { HeaderProps } from 'carbon-components-svelte/types/UIShell/Header.svelte.js';
</script>

<Notifications />

{#if theme_switch}
	<Theme theme={$theme} />
{/if}

<Header {offline_indicator} {header_props}>
	<slot name="header" />
	<svelte:fragment slot="header-utilities">
		<slot name="header-utilities" />
	</svelte:fragment>
</Header>
<Content style="background: none; padding: 1rem; height: 100%">
	<slot name="content" />
	<SideNav>
		<slot name="sidenav" />
	</SideNav>
	<Grid>
		<slot name="content-grid" />
	</Grid>
</Content>
