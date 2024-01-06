<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	export let data
	
	function getTaxonIndent(taxonType: string) {
		if (taxonType === "SF") return "indent-4";
		if (taxonType === "G") return "indent-8";
		if (taxonType === "S") return "indent-16";
		if (taxonType === "SS") return "indent-20";
	}
</script>

<!-- Taxonomy -->
<StandardContainer>

	<div class="">Butterflies of North America</div>
	<section>
		<ul>
			{#each data.taxonomy as taxon}
				<li class="checklist">
					<div class="grid grid-cols-4 gap-2">
						<span class={getTaxonIndent(taxon.taxonType)}>{taxon.latinName}</span>
						<span class="">{taxon.commonName ?? ''}</span>
						<span class="">{taxon.baseTaxonId ?? ''}</span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

</StandardContainer>