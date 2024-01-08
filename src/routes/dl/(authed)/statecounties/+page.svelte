<script lang="ts">
	import type { StateCounty } from '@prisma/client'
	import type { StateCountyIsMonitored } from '$lib/types.js';
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	export let data;

	const stateCounties: StateCountyIsMonitored<StateCounty>[] = data.stateCounties;
</script>

<!-- StateCountys -->
<StandardContainer>

	<div class="bg-red">County count: {stateCounties.length}
		&nbsp;&nbsp;Counties with monitored sites: {stateCounties.filter(c => c.isMonitored).length}</div>
	<section>
		<ul class="stateCountys">
			{#each stateCounties as stateCounty}
				<li class="border border-solid border-slate-900 pb-1 pl-6">
					<a href=stateCounty.slug class="title">{stateCounty.county}, {stateCounty.state}</a>
					- {stateCounty.siteCount} {stateCounty.siteCount !== 1 ? 'sites' : 'site'}
				</li>
			{/each}
		</ul>
	</section>

</StandardContainer>