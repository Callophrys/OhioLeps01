<script lang="ts">
    /*-- Imports */
    import type { County } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { afterUpdate, onMount } from 'svelte';
    import { showStateProvince } from '$lib/config';
    import { getContext } from 'svelte';
    import type { CountySites } from '$lib/types';

    /*-- -- Data -- */
    /*-- Exports */
    export let initialHideUnmonitoredChoice: number = 1;

    /*-- Context */
    let counties: CountySites[] = getContext('counties');

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupComboCounty: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboCounty',
        placement: 'bottom',
    };

    /*-- Properties (functional) */
    /*-- Variables and objects */
    let countyIds: number[] = [];
    let hideUnmonitoredCounties: number;
    let selectAllCounties: boolean;
    let captureAllCounties: number[];

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    onMount(() => {
        let z: string = localStorage?.useCaptureAllCounties;
        console.log('z', z);
        if (z) {
            captureAllCounties = z.split(',').map((v: string) => parseInt(v));
        } else {
            captureAllCounties = counties.filter((c) => c.sites.length > 0).map((c) => c.id) as number[];
        }
        console.log('captureAllCounties', captureAllCounties);

        let y: string = localStorage?.useSelectAllCounties;
        if (y && y.length) {
            selectAllCounties = y === 'true';
        } else {
            selectAllCounties = true;
        }

        let x: string = localStorage?.useHideUnmonitoredChoice;
        if (x && x.length) {
            hideUnmonitoredCounties = parseInt(x);
        } else {
            hideUnmonitoredCounties = initialHideUnmonitoredChoice;
        }

        if (selectAllCounties) {
            countyIds = counties.filter((c) => c.sites.length > 0).map((c) => c.id) as number[];
        } else {
            countyIds = captureAllCounties;
        }
    });

    afterUpdate(() => {
        localStorage.setItem('useCaptureAllCounties', countyIds.map((c: number) => c.toString()).join(','));
        localStorage.setItem('useSelectAllCounties', allSelected ? 'true' : 'false');
        localStorage.setItem('useHideUnmonitoredChoice', hideUnmonitoredCounties ? '1' : '0');
    });

    /*-- Handlers */
    function toggleAllCounties() {
        allSelected = !allSelected;
        if (allSelected) {
            countyIds = counties.filter((c) => c.sites.length > 0).map((c) => c.id) as number[];
        } else {
            countyIds = [];
        }
    }

    /*-- Methods */
    /*-- Reactives (functional) */
    $: allSelected = counties.filter((c) => c.sites.length > 0).length === countyIds.length;
</script>

<div class="flex items-center space-x-2">
    <button class="btn w-32 variant-filled justify-between" use:popup={popupComboCounty} on:click={(e) => e.preventDefault()}>
        <span class="capitalize">{(showStateProvince ? 'State/' : '') + 'Counties'}</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {allSelected ? 'All counties' : countyIds.length > 0 ? 'Counties filtered' : 'Not filtered'}
    </div>
</div>

<div data-popup="popupComboCounty">
    <div class="card w-64 shadow-xl p-2">
        <label class="flex justify-between space-x-2">
            <span>{allSelected ? 'Unselect all' : 'Select all'}</span>
            <SlideToggle name="toggle-all-counties" size="sm" active="variant-filled-primary" bind:value={selectAllCounties} checked={allSelected} on:click={toggleAllCounties} /><input hidden />
        </label>

        <div class="h-full grid grid-cols-2">
            <div class="flex"><span class="my-auto">Unmonitored</span></div>
            <div class="mt-1 mr-20">
                <div class="scale-75 origin-top-right">
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                        <RadioItem bind:group={hideUnmonitoredCounties} name="toggle-show-unmonitored" value={0}>Show</RadioItem>
                        <RadioItem bind:group={hideUnmonitoredCounties} name="toggle-show-unmonitored" value={1}>Hide</RadioItem>
                    </RadioGroup>
                </div>
            </div>
        </div>

        <hr />

        <div class="half-vh-sp">
            {#each counties as county}
                {#if !hideUnmonitoredCounties || county.sites.length > 0}
                    <label class="flex items-center space-x-2 pl-6">
                        <input type="checkbox" class="checkbox" value={county.id} bind:group={countyIds} name="select-county" disabled={!(county.sites.length > 0)} />
                        <p>{county.name}{county.sites.length > 0 ? '' : '*'}</p>
                    </label>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .half-vh-sp {
        @apply overflow-y-auto;
        height: calc(100vh - 408px);
        min-height: 128px;
    }
</style>
