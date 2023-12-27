<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'

	export let data
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- Sites -->
<section>
	<ul class="sites">
		{#each data.sites as site}
			<li class="site">
				<a href=site.slug class="title">{site.siteName}</a>
				<p class="date">{formatDate(site.changeDate)}</p>
				<p class="description">{site.siteAddress}, {site.siteCityStateZip} {site.stateCounty.state} (County: {site.stateCounty.county})</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.sites {
		display: grid;
		gap: 2rem;
	}

	.site {
		max-inline-size: var(--size-content-3);
	}

	.site:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>
