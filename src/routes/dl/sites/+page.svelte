<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	export let data
</script>

<div class="bg-red">Count: {data.sites.length}</div>
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
