<script lang="ts">
	import * as config from '$lib/config'
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
	import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
	import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
	import DoubledContainer from '$lib/components/DoubledContainer.svelte';

	export let data;
</script>

<DoubledContainer>

	<svelte:fragment slot="left">
		<StateCountyPicker stateCounties={data.stateCounties} initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice} />
		<SpeciesPicker speciesChecklist={data.speciesList} initialUseLatinChoice={config.initialUseLatinChoice} />
		<TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
		<hr>
		<div class="flex">
			<button class="btn variant-filled w-auto justify-between mx-auto">
				<span>Run Search</span>
				<span>↓</span>
			</button>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="right">
		<span class="">Results</span>
	</svelte:fragment>

</DoubledContainer>