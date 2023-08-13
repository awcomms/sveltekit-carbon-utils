<script>
	import Layout from '$lib/components/pages/Layout.svelte';
</script>

<Layout platformName="" company="">
	<svelte:fragment slot="header">
		<p>in the header</p>
	</svelte:fragment>
	<svelte:fragment slot="content-grid">
		<slot />
	</svelte:fragment>
</Layout>
