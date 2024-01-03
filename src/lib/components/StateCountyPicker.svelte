<script lang="ts">
    import type { StateCounty } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    let comboboxValue: string;

    const popupComboboxStateCounty: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxStateCounty',
        placement: 'bottom',
    };

	export let stateCounties: StateCounty[] = [];
	export let defaultShowAllCounties: boolean = true;
	export let defaultHideUnmonitored: boolean = true;
	
	let counties: number[] = [];

	function toggleAllCounties() {
        allSelected = !allSelected;
		if (allSelected) {
			counties = stateCounties.filter(c => c.isMonitored).map(c => c.stateCountyId);
		} else {
			counties = [];
		}
	}
	
	onMount(() => {
        allSelected = !defaultShowAllCounties;
        toggleAllCounties();
	});

	$:allSelected = stateCounties.filter(c => c.isMonitored).length === counties.length;

</script>

<div class="flex items-center space-x-2">
    <button class="btn variant-filled w-auto justify-between" use:popup={popupComboboxStateCounty}>
        <span class="capitalize">State/Counties</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {allSelected ? 'All counties' : 'Counties filtered'}
    </div>
</div>

<div class="card w-64 shadow-xl p-2" data-popup="popupComboboxStateCounty">
    <label class="flex items-center space-x-2">
        <input type="checkbox" class="checkbox" checked={allSelected} on:click={toggleAllCounties} /><p>Ohio - All</p>
    </label>
    <label class="flex items-center space-x-2 pl-6">
        <p>Hide unmonitored counties</p>
        <input type="checkbox" class="checkbox" bind:checked={defaultHideUnmonitored}>
    </label>
    <hr>
    {#each stateCounties as stateCounty}
    {#if !defaultHideUnmonitored || stateCounty.isMonitored}
    <label class="flex items-center space-x-2 pl-6">
        <input type="checkbox" class="checkbox"
            value={stateCounty.stateCountyId}
            bind:group={counties}
            disabled={!stateCounty.isMonitored} />
        <p>{stateCounty.county}{stateCounty.isMonitored ? '' : '*'}</p>
    </label>
    {/if}
    {/each}
</div>