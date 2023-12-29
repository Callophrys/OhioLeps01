<script lang="ts">
	import * as config from '$lib/config'
	export let data
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- StateCountys -->
<div class="bg-red">Counties with sites: {data.stateCounties.length}</div>
<section>
	<ul class="stateCountys">
		{#each data.stateCounties as stateCounty}
			<li class="border border-solid border-slate-900 pb-2">
				<a href=stateCounty.slug class="title">{stateCounty.county}, {stateCounty.state}</a>
				Has {stateCounty.sites?.length ?? 'Unk'} sites
			</li>
		{/each}
	</ul>
</section>
