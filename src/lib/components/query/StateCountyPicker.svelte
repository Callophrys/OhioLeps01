<script lang="ts">
    import type { County } from '@prisma/client';
    import type { CountyIsMonitored } from '$lib/types';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { afterUpdate, onMount } from 'svelte';
    import { showStateProvince } from '$lib/config';

    const popupComboboxCounty: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxCounty',
        placement: 'bottom',
    };

    export let counties: CountyIsMonitored<County>[] = [];
    export let initialHideUnmonitoredChoice: number = 0;

    let comboboxValue: string;

    let hideUnmonitoredCounties: number;
    let countyIds: number[] = [];

    function toggleAllCounties() {
        allSelected = !allSelected;
        if (allSelected) {
            countyIds = counties.filter((c) => c.isMonitored).map((c) => c.id) as number[];
        } else {
            countyIds = [];
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
        localStorage.setItem('useHideUnmonitoredChoice', hideUnmonitoredCounties ? '1' : '0');
    });

    $: allSelected = counties.filter((c) => c.isMonitored).length === countyIds.length;
</script>

<div class="flex items-center space-x-2">
    <button
        class="btn w-32 variant-filled justify-between"
        use:popup={popupComboboxCounty}
        on:click={(e) => e.preventDefault()}
    >
        <span class="capitalize">{(showStateProvince ? 'State/' : '') + 'Counties'}</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {allSelected ? 'All counties' : countyIds.length > 0 ? 'Counties filtered' : 'Not filtered'}
    </div>
</div>

<div data-popup="popupComboboxCounty">
    <div class="card w-64 shadow-xl p-2">
        <label class="flex justify-between space-x-2">
            <span>{allSelected ? 'Unselect all' : 'Select all'}</span>
            <SlideToggle
                name="toggle-all-counties"
                size="sm"
                active="variant-filled-primary"
                checked={allSelected}
                on:click={toggleAllCounties}
            /><input hidden />
        </label>

        <div class="h-full grid grid-cols-2">
            <div class="flex"><span class="my-auto">Unmonitored</span></div>
            <div class="mt-1 mr-20">
                <div class="scale-75 origin-top-right">
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                        <RadioItem
                            bind:group={hideUnmonitoredCounties}
                            name="toggle-show-unmonitored"
                            value={0}>Show</RadioItem
                        >
                        <RadioItem
                            bind:group={hideUnmonitoredCounties}
                            name="toggle-show-unmonitored"
                            value={1}>Hide</RadioItem
                        >
                    </RadioGroup>
                </div>
            </div>
        </div>

        <hr />

        {#each counties as county}
            {#if !hideUnmonitoredCounties || county.isMonitored}
                <label class="flex items-center space-x-2 pl-6">
                    <input
                        type="checkbox"
                        class="checkbox"
                        value={county.id}
                        bind:group={countyIds}
                        name="select-county"
                        disabled={!county.isMonitored}
                    />
                    <p>{county.name}{county.isMonitored ? '' : '*'}</p>
                </label>
            {/if}
        {/each}
    </div>
</div>
