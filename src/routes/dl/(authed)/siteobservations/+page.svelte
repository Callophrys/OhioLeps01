<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	export let data
</script>

<!-- siteobservations -->
<StandardContainer>

	<div class="bg-red">SiteObservation Count: {data.siteobservations.length}</div>
	<section>
		<ul class="siteobservations">
			{#each data.siteobservations as siteobservation}
				<li class="siteobservation">
					<a href=siteobservation.slug class="title">{siteobservation.idCode ?? '__'}</a>
					<span class="bg-red-600">{siteobservation.total ?? ''}</span>
				</li>
			{/each}
		</ul>
	</section>

</StandardContainer>