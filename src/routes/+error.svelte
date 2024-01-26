<script>
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	import { page } from '$app/stores'
</script>

<StandardContainer>
	<svelte:fragment slot="standardBody">
	<div class="error h-full grid place-content-center">
		<h1>{$page.status}: {$page.error?.message}</h1>
		<p>Uh oh...</p>
	</div>
	</svelte:fragment>
</StandardContainer>