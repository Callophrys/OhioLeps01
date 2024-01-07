<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
    import type { Taxonomy } from '@prisma/client';
	export let data
	
	function getScientificName(taxon: Taxonomy) {
		if (taxon.taxonType !== "S" && taxon.taxonType !== "SS")
			return taxon.latinName;
		
		let scientificName = taxon.latinName;
		if (taxon.taxonType === "S") {
	 		if (taxon.baseTaxonId)		
				scientificName = taxon.baseTaxon?.latinName + ' ' + scientificName;
			return scientificName;
		}
		
		if (taxon.taxonType === "SS" && taxon.baseTaxonId) {
	 		if (taxon.baseTaxonId) {
				scientificName = taxon.baseTaxon?.latinName + ' ' + scientificName;

				if (taxon.baseTaxon.baseTaxonId) {
					scientificName = taxon.baseTaxon?.baseTaxon.latinName + ' ' + scientificName;
				}

				return scientificName;
			}
			
			return scientificName;
		}

		return scientificName;
	}
	
	function getTaxonIndent(taxonType: string) {
		if (taxonType === 'SF') return 'indent-4';
		if (taxonType === 'G') return 'indent-8';
		if (taxonType === 'S') return 'indent-16';
		if (taxonType === 'SS') return 'indent-20';
		return '';
	}

</script>

<!-- Taxonomy -->
<StandardContainer>

	<div class="">Butterflies of North America</div>
	<section>
		<ul>
			{#each data.taxonomy as taxon}
				<li class="checklist">
					<div class="grid grid-cols-4 gap-2 bt-solid">
						<span class={getTaxonIndent(taxon.taxonType)}>{getScientificName(taxon)}</span>
						<span class="">{taxon.commonName ?? ''}</span>
					</div>
				</li>
			{/each}
		</ul>
	</section>

</StandardContainer>