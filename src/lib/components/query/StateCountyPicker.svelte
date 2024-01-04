<script lang="ts">
    import type { StateCounty } from '@prisma/client';
    import type { StateCountyIsMonitored } from '$lib/types'
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { afterUpdate, onMount } from 'svelte';

    const popupComboboxStateCounty: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxStateCounty',
        placement: 'bottom',
    };

	export let stateCounties: StateCountyIsMonitored<StateCounty>[] = [];
	export let initialHideUnmonitoredChoice: number = 0;

    let comboboxValue: string;
	
    let hideUnmonitoredCounties: number;
	let counties: number[] = [];

	function toggleAllCounties() {
        allSelected = !allSelected;
		if (allSelected) {
			counties = stateCounties.filter(c => c.isMonitored).map(c => c.stateCountyId) as number[];
		} else {
			counties = [];
		}
	}
	
	onMount(() => {
        let x: string = localStorage?.useHideUnmonitoredChoice;
        if (x && x.length) {
			hideUnmonitoredCounties = parseInt(x);
		} else {
			hideUnmonitoredCounties = initialHideUnmonitoredChoice;
		}

        toggleAllCounties();
	});

    afterUpdate(() => {
        localStorage.setItem('useHideUnmonitoredChoice', hideUnmonitoredCounties ? "1" : "0");
    });

	$:allSelected = stateCounties.filter(c => c.isMonitored).length === counties.length;

</script>

<div class="flex items-center space-x-2">
    <button class="btn variant-filled w-auto justify-between" use:popup={popupComboboxStateCounty}>
        <span class="capitalize">State/Counties</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {allSelected ? 'All counties' : counties.length > 0 ? 'Counties filtered' : 'Not filtered'}
    </div>
</div>

<div class="card w-64 shadow-xl p-2" data-popup="popupComboboxStateCounty">

    <label class="flex justify-between space-x-2">
        <span>{allSelected ? 'Unselect all' : 'Select all'}</span>
        <SlideToggle name="medium" size="sm" active="variant-filled-primary"
         checked={allSelected} on:click={toggleAllCounties} /><input hidden>
    </label>

    <div class="h-full grid grid-cols-2">
        <div class="flex"><span class="my-auto">Unmonitored</span></div>
        <div class="mt-1 mr-20">
        <div class="scale-75 origin-top-right">
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={hideUnmonitoredCounties} name="justify" value={0}>Show</RadioItem>
            <RadioItem bind:group={hideUnmonitoredCounties} name="justify" value={1}>Hide</RadioItem>
        </RadioGroup>
        </div>
        </div>
    </div>

    <hr>

    {#each stateCounties as stateCounty}
    {#if !hideUnmonitoredCounties || stateCounty.isMonitored}
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