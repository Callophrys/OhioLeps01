<script lang="ts">
    import type { SiteDate } from '@prisma/client';
    import { weekOfYearSince } from '$lib/utils';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import type { SiteRecordDate, SiteCountySiteDates } from '$lib/types.js';

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

    export let siteCountySiteDates: SiteCountySiteDates;
    let currentSiteDateId: number;

    $: currentSiteDate = siteCountySiteDates.siteDates.find((x) => {
        x.siteDateId === currentSiteDateId;
    });
    $: siteRecordDates = siteCountySiteDates.siteDates;
    $: siteDateYears = [
        ...new Set(
            siteCountySiteDates.siteDates.map((x) => {
                x.year;
            })
        ),
    ];
    $: siteDateWeeks = [
        ...new Set(
            siteCountySiteDates.siteDates.map((x) => {
                x.week;
            })
        ),
    ];

    $: trackedWeeks = Array.from(siteRecordDates)
        .map<dateTracking>((w) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: weekOfYearSince(new Date(w.recordDate)),
            recordDate: w.recordDate,
        }))
        .sort((a, b) => (a.year > b.year ? 1 : a.week - b.week));

    $: nextEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) < trackedWeeks.length - 1;
    console.log('nextEnabled', nextEnabled);
    $: prevEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) > 0;
    console.log('prevEnabled', prevEnabled);

    $: recordDate = currentSiteDate?.recordDate;
    $: recordYear = currentSiteDate?.year;
    $: recordWeek = currentSiteDate ? weekOfYearSince(currentSiteDate.recordDate) : -1;
    $: recordSiteId = currentSiteDate?.siteDateId;

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
    <button class="w-24" use:popup={popupSiteDateYears}>Year: {recordYear}<span>↓</span></button>
    <button class="w-24" use:popup={popupSiteDateWeeks}>Week: {recordWeek}<span>↓</span></button>
    <button class="!px-2" on:click={handleClickNext}>▶</button>
</div>

<div data-popup="popupComboboxSiteDateYears">
    <div class="card w-48 shadow-xl py-2">
        {#each siteDateYears as year}
            <div>{year}</div>
        {/each}
    </div>
</div>

<div data-popup="popupComboboxSiteDateWeeks">
    <div class="card w-48 shadow-xl py-2">
        {#each siteDateWeeks as week}
            <div>{week}</div>
        {/each}
    </div>
</div>
