<script lang="ts">
    /*-- Imports */
    import type { CssClasses, PopupSettings } from '@skeletonlabs/skeleton';
    import type { DateTracking, SiteDateYear, SiteDateYearSiteDates } from '$lib/types.js';
    import { goto } from '$app/navigation';
    import { getContext } from 'svelte';
    import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
    import { compareYearWeek, formatDate, weekOfYearSince } from '$lib/utils';

    /*-- -- Data -- */
    /*-- Exports */
    let {
        currentSiteId = $bindable(), // TODO make current Site id do something
        currentSiteDateId = $bindable(),

        heading = $bindable(),
        yearPrefix = $bindable(),
        weekPrefix = $bindable(),

        dropdownPointers = $bindable(true),
        dropdownShowDate = $bindable(false),

        controlOuter = '',
        controlBody = '',
        buttonLeft = '',
        buttonYear = '',
        buttonWeek = '',
        buttonRight = '',
        prefixYear = '',
        prefixWeek = '',
        suffixYear = dropdownPointers ? "before:content-['↓']" : '',
        suffixWeek = dropdownPointers ? "before:content-['↓']" : '',
        popupInner = '',
        popupStyles = '',
        labelledby = 'Select site-date',
    }: {
        currentSiteId: number;
        currentSiteDateId: number;

        heading: any;
        yearPrefix: any;
        weekPrefix: any;

        dropdownPointers: boolean;
        dropdownShowDate: boolean;

        controlOuter: CssClasses;
        controlBody: CssClasses;
        buttonLeft: CssClasses;
        buttonYear: CssClasses;
        buttonWeek: CssClasses;
        buttonRight: CssClasses;
        prefixYear: CssClasses;
        prefixWeek: CssClasses;
        suffixYear: CssClasses;
        suffixWeek: CssClasses;
        popupInner: CssClasses;
        popupStyles: string;
        labelledby: string;
    } = $props();

    buttonYear = dropdownPointers ? (prefixYear ? 'w-28' : 'w-20') : prefixYear ? 'w-24' : 'w-16';
    buttonWeek = dropdownPointers ? (prefixYear ? 'w-28' : 'w-20') : prefixYear ? 'w-24' : 'w-16';

    //console.log('SiteDatePicker:currentSiteId', currentSiteId, 'currentSiteDateId', currentSiteDateId);

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    // export let dropdownPointers: boolean = true;
    /** Includes date in weeks dropdown.  Default: false */
    // export let dropdownShowDate: boolean = false;

    /*-- Context */

    // siteDate list for respective site via Context
    const siteDates: SiteDateYearSiteDates[] = $state(getContext('siteDates') ?? []);
    console.log('siteDates - 1:', siteDates);
    //console.log('SiteDatePicker:siteDates', siteDates);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    // export let controlOuter: CssClasses = '';
    // export let controlBody: CssClasses = '';
    // export let buttonLeft: CssClasses = '';
    // export let buttonYear: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    // export let buttonWeek: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    // export let buttonRight: CssClasses = '';
    // export let prefixYear: CssClasses = '';
    // export let prefixWeek: CssClasses = '';
    // export let suffixYear: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    // export let suffixWeek: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    // export let popupInner: CssClasses = '';
    // export let popupStyles: string = '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    // export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlOuter = 'block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2';
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonYear = '';
    const cButtonWeek = '';
    const cButtonRight = '';
    const cPrefixYear = '';
    const cPrefixWeek = '';
    const cSuffixYear = '';
    const cSuffixWeek = '';
    const cPopupInner = 'card w-48 shadow-xl py-2 overflow-y-auto';
    const cPopupStyles = 'max-height: calc(100vh - 272px);';

    /*-- Reactives (styles) */
    let classesControlOuter = $derived.by(() => `${cControlOuter} ${controlOuter}`); // ${this.className ?? ''}`);
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); // ${this.className ?? ''}`);
    let classesButtonLeft = $derived(`${cButtonLeft} ${buttonLeft}`); // ${this.className ?? ''}`);
    let classesButtonYear = $derived(`${cButtonYear} ${buttonYear}`); // ${this.className ?? ''}`);
    let classesButtonWeek = $derived(`${cButtonWeek} ${buttonWeek}`); // ${this.className ?? ''}`);
    let classesButtonRight = $derived(`${cButtonRight} ${buttonRight}`); // ${this.className ?? ''}`);
    let classesPrefixYear = $derived(`${cPrefixYear} ${prefixYear}`); // ${this.className ?? ''}`);
    let classesPrefixWeek = $derived(`${cPrefixWeek} ${prefixWeek}`); // ${this.className ?? ''}`);
    let classesSuffixYear = $derived(`${cSuffixYear} ${suffixYear}`); // ${this.className ?? ''}`);
    let classesSuffixWeek = $derived(`${cSuffixWeek} ${suffixWeek}`); // ${this.className ?? ''}`);
    let classesPopupInner = $derived(`${cPopupInner} ${popupInner}`); // ${this.className ?? ''}`);
    let stylesPopup = $derived(`${cPopupStyles} ${popupStyles}`); // ${this.style ?? ''}`);

    /*-- -- Coding -- */
    /*-- Enums */
    type SdoWeek = {
        week: number;
        siteDateId: number;
        fDate: string;
    };

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

    const uniqueYears = [...new Set(siteDates.map((x) => x.year.toString()))];
    //console.log('uniqueYears:', uniqueYears);

    const yearsOfDate: any = {};
    uniqueYears.forEach((yr: string) => {
        yearsOfDate[yr] = siteDates
            .filter((x: SiteDateYear) => x.year.toString() === yr)
            .map<SdoWeek>((y: SiteDateYear) => ({
                week: y.week,
                siteDateId: y.siteDateId,
                fDate: y.recordDate ? formatDate(new Date(y.recordDate).toISOString()) : '',
            }));
    });
    //console.log('yearsOfDate:', yearsOfDate);

    const trackedWeeks = Array.from(siteDates)
        .map<DateTracking>((w: SiteDateYearSiteDates) => ({
            siteDateId: w.siteDateId,
            year: w.year,
            week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
            recordDate: new Date(w.recordDate),
            fDate: w.recordDate ? formatDate(new Date(w.recordDate).toISOString()) : '',
        }))
        .sort(compareYearWeek);
    //console.log('trackedWeeks:', trackedWeeks);

    /*-- Variables and objects */
    let recordSiteDateId = $state(currentSiteDateId);
    let recordYear: string = $state('');
    let recordWeek: number = $state(0);

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    $effect(() => {
        let tw = trackedWeeks.find((x) => x.siteDateId === currentSiteDateId);
        if (tw) {
            recordYear = tw.year.toString();
            recordWeek = tw.recordDate ? weekOfYearSince(new Date(tw.recordDate)) : -1;
        }
    });

    /*-- Handlers */
    function handleSelectYear(event: any) {
        let targetYear = event.currentTarget.value.toString();
        let idx = trackedWeeks.findIndex((x) => x.year.toString() === targetYear);
        //console.log('yearDates', yearDates.slice(0, 2));

        if (idx > -1) {
            updatePerHandler(idx);
        }
    }

    function handleSelectWeek(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === parseInt(event.currentTarget.value));
        if (idx > -1) {
            updatePerHandler(idx);
        }
    }

    function handleClickPrior(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === recordSiteDateId);
        if (idx > 0) {
            updatePerHandler(idx - 1);
        }
    }

    function handleClickNext(event: any) {
        let idx = trackedWeeks.findIndex((x) => x.siteDateId === recordSiteDateId);
        if (idx < trackedWeeks.length - 1) {
            updatePerHandler(idx + 1);
        }
    }

    function updatePerHandler(idx: number) {
        const tw = trackedWeeks[idx];
        recordYear = tw.year.toString();
        recordWeek = tw.week;
        recordSiteDateId = tw.siteDateId;
        goto('/api/sitedates/' + tw.siteDateId);
    }

    /*-- Methods */
    /*-- Reactives (functional) */
    let yearDates = $derived(yearsOfDate[recordYear]);
    let trackedWeekIndex = $derived(trackedWeeks.findIndex((x: DateTracking) => x.siteDateId === recordSiteDateId));
    let nextDisabled = $derived(trackedWeekIndex > trackedWeeks.length - 2);
    let prevDisabled = $derived(trackedWeekIndex < 1);

    /*-- Other */
</script>

{#snippet sHeading()}
    {#if heading}
        <div class="my-auto">
            {@render heading()}
        </div>
    {/if}
{/snippet}

{#snippet sPrefixYear()}
    {#if yearPrefix}
        <span class={classesPrefixYear}>
            {@render yearPrefix()}
        </span>
    {/if}
{/snippet}

{#snippet sPrefixWeek()}
    {#if weekPrefix}
        <span class={classesPrefixWeek}>
            {@render weekPrefix()}
        </span>
    {/if}
{/snippet}

<div class={classesControlOuter}>
    {@render sHeading()}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} onclick={handleClickPrior} disabled={prevDisabled}>◀</button>
        <button type="button" class={classesButtonYear} use:popup={popupSiteDateYears}>
            {@render sPrefixYear()}
            <span>{recordYear}</span>
            <span class={classesSuffixYear}></span>
        </button>
        <button type="button" class={classesButtonWeek} use:popup={popupSiteDateWeeks}>
            {@render sPrefixWeek()}
            <span>{recordWeek}</span>
            <span class={classesSuffixWeek}></span>
        </button>
        <button type="button" class={classesButtonRight} onclick={handleClickNext} disabled={nextDisabled}>▶</button>
    </div>

    <div data-popup="popupComboboxSiteDateYears">
        <div class={classesPopupInner} style={stylesPopup}>
            <ListBox rounded="rounded-none" labelledby="Years for site">
                {#each uniqueYears as year}
                    <ListBoxItem bind:group={recordYear} name="years" onchange={handleSelectYear} value={year}>
                        {year}
                    </ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>

    <div data-popup="popupComboboxSiteDateWeeks">
        {#if yearDates}
            <div class={`${classesPopupInner} ${dropdownShowDate ? 'w-44' : 'w-28'}`} style={stylesPopup}>
                <ListBox rounded="rounded-none" labelledby="Weeks in timeframe">
                    {#each yearDates as week}
                        <ListBoxItem bind:group={recordSiteDateId} name="weeks" on:change={handleSelectWeek} value={week.siteDateId}>
                            {@render sPrefixWeek()}{`${week.week}${dropdownShowDate ? ' - ' + week.fDate : ''}`}
                        </ListBoxItem>
                    {/each}
                </ListBox>
            </div>
        {/if}
    </div>
</div>
