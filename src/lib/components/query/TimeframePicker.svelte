<script lang="ts">
    /*-- Imports */
    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */

    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { monitorSeason } from '$lib/config';
    import { afterUpdate, onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let initialDateRangeChoice: number = 0;

    let dateRangeMode: number;
    let { month, day, year }: any = monitorSeason.start;
    let todayDate = new Date(year, month - 1, day);
    todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
    let monitorStartDate = todayDate.toISOString().slice(0, 10);

    onMount(() => {
        let x: string = localStorage?.dateRangeChoice;
        if (x && x.length) {
            dateRangeMode = parseInt(x);
        } else {
            dateRangeMode = initialDateRangeChoice;
        }
    });

    afterUpdate(() => {
        localStorage.setItem('dateRangeChoice', dateRangeMode.toString());
    });
</script>

<div class="flex">
    <span class="my-auto pr-2">Date range by</span>
    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
        <RadioItem bind:group={dateRangeMode} name="toggle-date-type" value={0}>Date</RadioItem>
        <RadioItem bind:group={dateRangeMode} name="toggle-date-type" value={1}>Week</RadioItem>
    </RadioGroup>
</div>

<div class="pl-8 space-y-2">
    <label class="flex">
        <span class="w-12 pr-4">From</span>
        <input class="input w-36 px-2" name="range-start" type={dateRangeMode === 0 ? 'date' : 'week'} min={monitorStartDate} />
        <span class="validity pl-1 text-warning-500"></span>
    </label>

    <label class="flex">
        <span class="w-12 pr-4">To</span>
        <input class="input w-36 px-2" name="range-end" type={dateRangeMode === 0 ? 'date' : 'week'} min={monitorStartDate} />
        <span class="validity pl-1 text-warning-500"></span>
    </label>
</div>

<style>
    input:invalid + span::after {
        /*content: "✖";*/
        content: '✐';
    }

    input:valid + span::after {
        content: '✓';
    }
</style>
