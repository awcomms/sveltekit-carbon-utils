<script lang='ts'>
    export let identifier: string | undefined = undefined
    import {HeaderAction, HeaderPanelLinks, HeaderPanelLink} from 'carbon-components-svelte'
    import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte'
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<HeaderAction icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
	<HeaderPanelLinks>
		<slot name="panel-links" />
		{#if identifier}
			<HeaderPanelLink on:click={() => dispatch('out')}
				>Log out: {identifier}</HeaderPanelLink
			>
		{:else}
			<HeaderPanelLink on:click={() => dispatch('in')}>Log in</HeaderPanelLink>
		{/if}
	</HeaderPanelLinks>
</HeaderAction>
