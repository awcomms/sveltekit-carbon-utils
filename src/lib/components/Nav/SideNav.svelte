<script>
	import { SideNav, SideNavItems } from 'carbon-components-svelte';

	import { isSideNavOpen } from './store.js';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<slot />
	</SideNavItems>
</SideNav>
