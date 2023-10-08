<script lang="ts">
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.data.github_repo}
	<a
		href={$page.data.github_repo}
		rel="noopener noreferrer"
		target="_blank"
		class="bx--header__action logo"
	>
		<LogoGithub size={20} />
	</a>

	<style lang="sass">
	.logo
		display: flex
		align-items: center
		justify-content: center
		padding-bottom: 2px
	</style>
{/if}
