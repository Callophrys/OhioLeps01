<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	import { formatDate } from '$lib/utils'
	export let data
</script>

<!-- siteDates -->
<StandardContainer>

	<div class="bg-red">SiteDate Count: {data.siteDates.length}</div>
	<section>
		<ul class="siteDates">
			{#each data.siteDates as siteDate}
				<li class="siteDate">
					<span class="date">{siteDate.recordDate ? formatDate(siteDate.recordDate) : ''}</span>
					<a href=siteDate.slug class="title">{siteDate.week} - {siteDate.recorder}</a>
				</li>
			{/each}
		</ul>
	</section>

</StandardContainer>