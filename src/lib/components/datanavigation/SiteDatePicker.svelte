<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { dateTracking, SiteDateYear } from '$lib/types.js';
    import { compareYearWeek, weekOfYearSince } from '$lib/utils';

    export let currentSiteId: number = -1;
    export let currentSiteDateId: number = -1;

    const siteDates: SiteDateYear[] = getContext('siteDates') ?? [];
    console.log('SiteDatePicker:siteDates', siteDates);

    const siteDateYears = [...new Set(siteDates.map((x) => x.year))];
    const weeksOfYear: any = {};
    siteDateYears.forEach((yr) => (weeksOfYear[yr] = [...new Set(siteDates.filter((x) => x.year === yr).map((y) => y.week))]));
    console.log('SiteDatePicker:weeksOfYear', weeksOfYear);

    $: currentSite = siteDates.find((x) => x.siteId === currentSiteId);
    console.log('SiteDatePicker:currentSite', currentSite);

    $: siteDateWeeks = currentSite ? weeksOfYear[currentSite.year] : [];

    $: trackedWeeks = Array.from(siteDates)
        .map<dateTracking>((w: SiteDateYear) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
            recordDate: w.recordDate,
        }))
        .sort(compareYearWeek);

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

<div class="flex flex-col lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}

    <div class="btn-group variant-soft my-auto">
        <button class="!px-2" on:click={handleClickPrior}>◀</button>
        <button class="w-16" use:popup={popupSiteDateYears}>{recordYear}<span>↓</span></button>
        <button class="w-16" use:popup={popupSiteDateWeeks}>{recordWeek}<span>↓</span></button>
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
