<script lang="ts">
	import * as config from '$lib/config'
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
	import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
	import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';

	export let data;
</script>

<div class="p-4 space-y-4">
	<StateCountyPicker stateCounties={data.stateCounties} initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice} />
	<SpeciesPicker speciesChecklist={data.speciesList} initialUseLatinChoice={config.initialUseLatinChoice} />
	<TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
</div>