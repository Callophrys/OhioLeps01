<script lang="ts">
	import * as config from '$lib/config'
	export let data
</script>

<!-- StateCountys -->
<div class="bg-red">Counties with sites: {data.stateCounties.length}</div>
<section>
	<ul class="stateCountys">
		{#each data.stateCounties as stateCounty}
			<li class="border border-solid border-slate-900 pb-1 pl-6">
				<a href=stateCounty.slug class="title">{stateCounty.county}, {stateCounty.state}</a>
				- {stateCounty.sites.length} {stateCounty.sites.length !== 1 ? 'sites' : 'site'}
			</li>
		{/each}
	</ul>
</section>
