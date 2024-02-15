<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { SiteDateYear } from '$lib/types.js';
    import { weekOfYearSince } from '$lib/utils';

    export let currentSiteId: number = -1;
    const siteDates: SiteDateYear[] = getContext('siteDates') ?? [];

    console.log(siteDates);

    type dateTracking = {
        siteDateId: number;
        year: number;
        week: number;
        recordDate: Date;
    };

    type dateTrackingSet = {
        id: number;
        children: dateTracking[];
    };

    const siteDateYears = [...new Set(siteDates.map((x) => x.year))];
    const weeksOfYear: any = {};
    siteDateYears.forEach((yr) => (weeksOfYear[yr] = [...new Set(siteDates.filter((x) => x.year === yr).map((y) => y.week))]));
    console.log(weeksOfYear);

    $: currentSite = siteDates.find((x) => x.siteId === currentSiteId);
    console.log(currentSite);

    $: siteDateWeeks = currentSite ? weeksOfYear[currentSite.year] : [];

    $: trackedWeeks = Array.from(siteDates)
        .map<dateTracking>((w: SiteDateYear) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
            recordDate: w.recordDate,
        }))
        .sort((a, b) => (a.year > b.year ? 1 : a.week - b.week));

    $: nextEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) < trackedWeeks.length - 1;
    console.log('nextEnabled', nextEnabled);
    $: prevEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) > 0;
    console.log('prevEnabled', prevEnabled);

    $: recordYear = currentSite?.year;
    $: recordWeek = 33; // currentSite && currentSite.recordDate ? weekOfYearSince(currentSite.recordDate) : -1;
    $: recordSiteId = currentSite?.siteDateId;

    $: {
        console.log(currentSiteId, currentSite, recordYear, recordWeek, recordSiteId);
        console.log(siteDateYears, siteDateWeeks);
    }

    const popupSiteDateYears: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateYears',
        placement: 'bottom',
    };

    const popupSiteDateWeeks: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateWeeks',
        placement: 'bottom',
    };

    function handleClick(event: any) {
        event.preventDefault();
        //console.log('/api/sitedates/' + event.currentTarget.value);
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + event.currentTarget.value);
        }
    }

    function handleClickPrior(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId);
        if (idx > 0) {
            goto('/api/sitedates/' + trackedWeeks[idx - 1].siteDateId);
        }
    }

    function handleClickNext(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId);
        if (idx < trackedWeeks.length - 1) {
            goto('/api/sitedates/' + trackedWeeks[idx + 1].siteDateId);
        }
    }
</script>

{#if $$slots.heading}
    <div class="w-1/2 text-right my-auto">
        <slot name="heading" />
    </div>
{/if}

<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2" on:click={handleClickPrior}>◀</button>
    <button class="w-24" use:popup={popupSiteDateYears}>{recordYear}<span>↓</span></button>
    <button class="w-24" use:popup={popupSiteDateWeeks}>{recordWeek}<span>↓</span></button>
    <button class="!px-2" on:click={handleClickNext}>▶</button>
</div>

<div data-popup="popupComboboxSiteDateYears">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <ListBox rounded="rounded-none">
            {#each siteDateYears as year}
                <ListBoxItem group="dogs" name="years" value={year}>{year}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>

<div data-popup="popupComboboxSiteDateWeeks">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <ListBox rounded="rounded-none">
            {#each siteDateWeeks as week}
                <ListBoxItem group="cows" name="weeks" value={week}>{week}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
