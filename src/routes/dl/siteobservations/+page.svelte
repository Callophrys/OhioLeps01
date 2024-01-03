<script lang="ts">
	import * as config from '$lib/config'
	export let data
</script>

<!-- siteobservations -->
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