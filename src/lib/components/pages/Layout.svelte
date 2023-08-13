<script lang="ts">
	export let platformName: string,
		company: string,
		header_href: string = '/';
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Header from '$lib/components/Nav/Header/Header.svelte';
	import SideNav from '$lib/components/Nav/SideNav.svelte';
	import Notifications from '$lib/components/Notification/Notifications.svelte';
	import { theme } from '$lib/util/theme_store.js';
</script>

<Notifications />

<Theme theme={$theme} />
<Header {platformName} {company} href={header_href}>
	<slot name='header' />
	<svelte:fragment slot='header-utilities'>
		<slot name='header-utilities' />
	</svelte:fragment>
</Header>
<Content style="background: none; padding: 1rem; height: 100%">
	<slot name='content' />
	<SideNav>
		<slot name='sidenav' />
	</SideNav>
	<Grid>
		<slot name='content-grid' />
	</Grid>
</Content>
