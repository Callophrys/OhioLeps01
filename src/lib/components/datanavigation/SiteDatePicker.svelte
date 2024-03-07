<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { dateTracking, SiteDateYear } from '$lib/types.js';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { compareYearWeek, formatDate, weekOfYearSince } from '$lib/utils';
    import { onMount } from 'svelte';

    /* Had 2 slots: prefixYear and prefixWeek */

    export let currentSiteId: number = -1;
    export let currentSiteDateId: number = -1;
    //console.log('SiteDatePicker:currentSiteId', currentSiteId, 'currentSiteDateId', currentSiteDateId);

    // Properties
    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;
    /** Includes date in weeks dropdown.  Default: false */
    export let dropdownShowDate: boolean = false;

    // Properties (styles)
    /** */
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonYear: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let buttonWeek: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let prefixYear: CssClasses = '';
    export let prefixWeek: CssClasses = '';
    export let suffixYear: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    export let suffixWeek: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    /** */
    ///export let spacing: CssClasses = 'space-y-1';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    // Constants (styles)
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonRight = '';
    const cButtonYear = '';
    const cButtonWeek = '';
    const cPrefixYear = '';
    const cPrefixWeek = '';
    const cSuffixYear = '';
    const cSuffixWeek = '';

    // siteDate list for respective site via Context
    const siteDates: SiteDateYear[] = getContext('siteDates') ?? [];
    //console.log('SiteDatePicker:siteDates', siteDates);

    const siteDateYears = [...new Set(siteDates.map((x) => x.year))];
    const weeksOfYear: any = {};
    siteDateYears.forEach((yr) => (weeksOfYear[yr] = [...new Set(siteDates.filter((x) => x.year === yr).map((y) => y.week))]));
    //console.log('SiteDatePicker:weeksOfYear', weeksOfYear);

    const currentSiteDate = siteDates.find((x) => x.siteDateId === currentSiteDateId);
    //console.log('SiteDatePicker:currentSiteDate', currentSiteDate);

    const siteDateWeeks = currentSiteDate ? weeksOfYear[currentSiteDate.year] : [];

    const trackedWeeks = Array.from(siteDates)
        .map<dateTracking>((w: SiteDateYear) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
            recordDate: new Date(w.recordDate),
            fDate: w.recordDate ? formatDate(new Date(w.recordDate).toISOString()) : '',
        }))
        .sort(compareYearWeek);
    console.log('trackedWeeks:', trackedWeeks);

    const trackedWeeksObject: any = {};
    trackedWeeks.forEach((t: dateTracking) => (trackedWeeksObject[t.week] = t));
    console.log('trackedWeeksObject:', trackedWeeksObject);

    let nextEnabled: boolean;
    let prevEnabled: boolean;

    let recordSiteDateId: number;

    let recordYear: number;
    let recordWeek: number;

    onMount(() => {
        nextEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId) < trackedWeeks.length - 1;
        prevEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId) > 0;
        console.log('prevEnabled:', prevEnabled, 'nextEnabled:', nextEnabled);

        recordYear = currentSiteDate?.year ?? 1899;
        recordWeek = currentSiteDate?.recordDate ? weekOfYearSince(new Date(currentSiteDate.recordDate)) : -1;
        console.log('recordYear:', recordYear, 'recordWeek:', recordWeek);

        recordSiteDateId = currentSiteDateId;
        console.log('recordSiteDateId:', recordSiteDateId, currentSiteDateId);
        console.log(currentSiteId, currentSiteDateId, currentSiteDate, recordYear, recordWeek, recordSiteDateId);
        console.log(siteDateYears, siteDateWeeks);
    });

    const popupSiteDateYears: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateYears',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    const popupSiteDateWeeks: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateWeeks',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    function handleClick(event: any) {
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + trackedWeeksObject[recordWeek].siteDateId);
            //goto('/api/sitedates/' + trackedWeeksObject[event.currentTarget.value].siteDateId);
        }
    }

    function handleClickPrior(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId);
        if (idx > 0) {
            goto('/api/sitedates/' + trackedWeeks[idx - 1].siteDateId);
        }
    }

    function handleClickNext(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId);
        if (idx < trackedWeeks.length - 1) {
            goto('/api/sitedates/' + trackedWeeks[idx + 1].siteDateId);
        }
    }

    // Reactive styles
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesButtonYear = `${cButtonYear} ${buttonYear} ${$$props.class ?? ''}`;
    $: classesButtonWeek = `${cButtonWeek} ${buttonWeek} ${$$props.class ?? ''}`;
    $: classesPrefixYear = `${cPrefixYear} ${prefixYear} ${$$props.class ?? ''}`;
    $: classesPrefixWeek = `${cPrefixWeek} ${prefixWeek} ${$$props.class ?? ''}`;
    $: classesSuffixYear = `${cSuffixYear} ${suffixYear} ${$$props.class ?? ''}`;
    $: classesSuffixWeek = `${cSuffixWeek} ${suffixWeek} ${$$props.class ?? ''}`;
</script>

<div class="block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handleClickPrior}>◀</button>
        <button type="button" class={classesButtonYear} use:popup={popupSiteDateYears}>
            {#if $$slots.prefixYear}<span class={classesPrefixYear}><slot name="prefixYear" /></span>{/if}
            <span>{recordYear}</span>
            <span class={classesSuffixYear} />
        </button>
        <button type="button" class={classesButtonWeek} use:popup={popupSiteDateWeeks}>
            {#if $$slots.prefixWeek}<span class={classesPrefixWeek}><slot name="prefixWeek" /></span>{/if}
            <span>{recordWeek}</span>
            <span class={classesSuffixWeek} />
        </button>
        <button type="button" class={classesButtonRight} on:click={handleClickNext}>▶</button>
    </div>

    <div data-popup="popupComboboxSiteDateYears">
        <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
            <ListBox rounded="rounded-none" labelledby="Years for site">
                {#each siteDateYears as year}
                    <ListBoxItem group="dogs" name="years" value={year}>{year}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>

    <div data-popup="popupComboboxSiteDateWeeks">
        <div class={`card shadow-xl py-2 overflow-y-auto ${dropdownShowDate ? 'w-44' : 'w-28'}`} style="max-height: calc(100vh - 272px);">
            <ListBox rounded="rounded-none" labelledby="Weeks in timeframe">
                {#each siteDateWeeks as week}
                    <ListBoxItem bind:group={recordWeek} name={week} on:click={handleClick} value={week}>
                        {#if $$slots.prefixWeek}
                            <slot name="prefixWeek" />
                        {/if}{`${week}${dropdownShowDate ? ' - ' + trackedWeeksObject[week].fDate : ''}`}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>
</div>
