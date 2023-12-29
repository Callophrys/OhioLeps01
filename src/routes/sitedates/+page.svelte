<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	export let data
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- siteDates -->
<div class="bg-red">Count: {data.siteDates.length}</div>
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