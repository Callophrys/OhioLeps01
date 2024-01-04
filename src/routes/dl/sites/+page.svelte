<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	import { formatDate } from '$lib/utils'
	export let data
</script>

<StandardContainer>
	
	<div class="bg-red">Site Count: {data.sites.length}</div>
	<section>
		<ul class="sites">
			{#each data.sites as site}
				<li class="site">
					<a href="/sites/{site.siteId}" class="title">{site.siteName}
					<div class="date">{formatDate(site.changeDate)}</div>
					<div class="border border-solid border-slate-900">
						{site.siteAddress ?? ''}{
						#if site.siteCityStateZip}
							{site.siteAddress ? ',' : ''} {site.siteCityStateZip}{
						/if}&nbsp;&#124;&nbsp;{site.stateCounty.state} (County: {site.stateCounty.county})</div>
					</a>
			</li>
			{/each}
		</ul>
	</section>
	
</StandardContainer>

<style>
	.sites {
		display: grid;
		gap: 2rem;
	}
	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}
</style>
