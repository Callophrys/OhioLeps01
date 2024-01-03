<script lang="ts">
    import StateCountyPicker from '$lib/components/StateCountyPicker.svelte';
	import SpeciesPicker from '$lib/components/SpeciesPicker.svelte';
	import TimeframePicker from '$lib/components/TimeframePicker.svelte';
	export let data;
</script>

<div class="p-4 space-y-4">
	<StateCountyPicker stateCounties={data.stateCounties} />
	<SpeciesPicker speciesChecklist={data.speciesList} />
	<TimeframePicker />
</div>