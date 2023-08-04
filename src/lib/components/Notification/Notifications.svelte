<script lang="ts">
	import { notifications } from '$lib/util/notify.js';
	import Notification from './Notification.svelte';
</script>

{#each $notifications as props, level}
	<Notification
		on:close={() => ($notifications = $notifications.filter((n) => n !== props))}
		{props}
		{level}
	/>
{/each}
