<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { dateTracking, SiteDateYear, SiteDateYearSiteDates } from '$lib/types.js';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { compareYearWeek, formatDate, weekOfYearSince } from '$lib/utils';
    import { onMount } from 'svelte';

    /* Had 2 slots: prefixYear and prefixWeek */
    /*-- -- Data -- */
    /*-- Exports */
    export let currentSiteId: number = -1;
    export let currentSiteDateId: number = -1;
    //console.log('SiteDatePicker:currentSiteId', currentSiteId, 'currentSiteDateId', currentSiteDateId);

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;
    /** Includes date in weeks dropdown.  Default: false */
    export let dropdownShowDate: boolean = false;

    /*-- Context */

    // siteDate list for respective site via Context
    const siteDates: SiteDateYearSiteDates[] = getContext('siteDates') ?? [];
    console.log('siteDates - 1:', siteDates);
    //console.log('SiteDatePicker:siteDates', siteDates);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonYear: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let buttonWeek: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let prefixYear: CssClasses = '';
    export let prefixWeek: CssClasses = '';
    export let suffixYear: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    export let suffixWeek: CssClasses = dropdownPointers ? "before:content-['↓']" : '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonRight = '';
    const cButtonYear = '';
    const cButtonWeek = '';
    const cPrefixYear = '';
    const cPrefixWeek = '';
    const cSuffixYear = '';
    const cSuffixWeek = '';

    /*-- Reactives (styles) */
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

    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupSiteDateYears: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateYears',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    const popupSiteDateWeeks: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateWeeks',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    /*-- Properties (functional) */
    type SdoWeek = {
        week: number,
        siteDateId: number,
        fDate: string
    }

    console.log('siteDates - 2:', siteDates);
    const theYears = [...new Set(siteDates.map((x) => x.year.toString()))];
    console.log('theYears:', theYears);
    const yearsOfDate: any = {}
    theYears.forEach((yr: string) => {
        yearsOfDate[yr] = siteDates
            .filter((x: SiteDateYear) => x.year.toString() === yr)
            .map<SdoWeek>((y: SiteDateYear) => ({
                week: y.week,
                siteDateId: y.siteDateId,
                fDate: y.recordDate ? formatDate(new Date(y.recordDate).toISOString()) : '',
            }));
    });
    console.log('yearsOfDate:', yearsOfDate);

    const currentSiteDate = siteDates.find((x) => x.siteDateId === currentSiteDateId);
    //console.log('currentSiteDate:', currentSiteDate);

    const trackedWeeks = Array.from(siteDates)
        .map<dateTracking>((w: SiteDateYearSiteDates) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
            recordDate: new Date(w.recordDate),
            fDate: w.recordDate ? formatDate(new Date(w.recordDate).toISOString()) : '',
        }))
        .sort(compareYearWeek);
    //console.log('trackedWeeks:', trackedWeeks);

    /*-- Variables and objects */
    let nextEnabled: boolean;
    let prevEnabled: boolean;

    let recordSiteDateId: number;

    let recordYear: string;
    let recordWeek: number;
    $: rxRecordYear = recordYear;

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    onMount(() => {
        nextEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId) < trackedWeeks.length - 1;
        prevEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId) > 0;
        //console.log('prevEnabled:', prevEnabled, 'nextEnabled:', nextEnabled);

        recordYear = currentSiteDate?.year.toString() ?? '1899';
        recordWeek = currentSiteDate?.recordDate ? weekOfYearSince(new Date(currentSiteDate.recordDate)) : -1;
        // console.log('recordYear:', recordYear, 'recordWeek:', recordWeek);

        recordSiteDateId = currentSiteDateId;
        //console.log('recordSiteDateId:', recordSiteDateId, currentSiteDateId);
        //console.log(currentSiteId, currentSiteDateId, currentSiteDate, recordYear, recordWeek, recordSiteDateId);
    });

    /*-- Handlers */
    function handleSelectYear(event: any) {
        console.log(rxRecordYear, recordYear, event.currentTarget.value);
        recordYear = event.currentTarget.value.toString();
        let idx = trackedWeeks.findIndex((x) => x.year.toString() === recordYear);
        console.log('Index in trackedWeeks', idx, trackedWeeks[idx]);
        if (idx > 0) {
            const tw = trackedWeeks[idx];
            recordWeek = tw.week;
            recordSiteDateId = tw.siteDateId;
            goto('/api/sitedates/' + tw.siteDateId);
        }
    }

    function handleSelectWeek(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === parseInt(event.currentTarget.value));
        if (idx > 0) {
            const tw = trackedWeeks[idx];
            recordYear = tw.year.toString();
            recordWeek = tw.week;
            recordSiteDateId = tw.siteDateId;
            goto('/api/sitedates/' + tw.siteDateId);
        }
    }

    function handleClickPrior(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === recordSiteDateId);
        if (idx > 0) {
            const tw = trackedWeeks[idx - 1];
            recordYear = tw.year.toString();
            recordWeek = tw.week;
            recordSiteDateId = tw.siteDateId;
            goto('/api/sitedates/' + tw.siteDateId);
        }
    }

    function handleClickNext(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === recordSiteDateId);
        if (idx < trackedWeeks.length - 1) {
            const tw = trackedWeeks[idx + 1];
            recordYear = tw.year.toString();
            recordWeek = tw.week;
            recordSiteDateId = tw.siteDateId;
            goto('/api/sitedates/' + tw.siteDateId);
        }
    }

    /*-- Methods */
    /*-- Reactives (functional) */
    /*-- Other */

    //console.log(yearsOfDate);
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
                {#each theYears as year}
                    <ListBoxItem bind:group={recordYear} name="years" on:change={handleSelectYear} value={year}>{year}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>

    <div data-popup="popupComboboxSiteDateWeeks">
        <div class={`card shadow-xl py-2 overflow-y-auto ${dropdownShowDate ? 'w-44' : 'w-28'}`} style="max-height: calc(100vh - 272px);">
            <ListBox rounded="rounded-none" labelledby="Weeks in timeframe">
            {#if yearsOfDate[recordYear]}
                {#each yearsOfDate[recordYear] as week}
                    <ListBoxItem bind:group={recordWeek} name="weeks" on:change={handleSelectWeek} value={week.siteDateId}>
                        {#if $$slots.prefixWeek}
                            <slot name="prefixWeek" />
                        {/if}{`${week.week}${dropdownShowDate ? ' - ' + week.fDate : ''}`}</ListBoxItem>
                {/each}
            {/if}
            </ListBox>
        </div>
    </div>
</div>
