<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { ChecklistScientificName } from '$lib/types';

    // Properties
    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    // Properties (styles)
    /** */
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonYear: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let prefixYear: CssClasses = '';
    export let suffixYear: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
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
    const cPrefixYear = '';
    const cSuffixYear = '';

    const popupSiteDateYears: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateYears',
        placement: 'bottom',
    };

    function handleClick(event: any) {
        /*
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + trackedWeeksObject[recordWeek].siteDateId);
        }
        */
    }

    function handleClickPrior(event: any) {
        /*
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId);
        if (idx > 0) {
            goto('/api/sitedates/' + trackedWeeks[idx - 1].siteDateId);
        }
        */
    }

    function handleClickNext(event: any) {
        /*
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteDateId);
        if (idx < trackedWeeks.length - 1) {
            goto('/api/sitedates/' + trackedWeeks[idx + 1].siteDateId);
        }
        */
    }

    const siteDates: ChecklistScientificName[] = getContext('siteDates') ?? [];
    const siteDateYears = [...new Set(siteDates.map((x) => x.year))];

    let nextEnabled: boolean;
    let prevEnabled: boolean;

    let recordSiteDateId: number;

    let recordYear: number;

    // Reactive styles
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesButtonYear = `${cButtonYear} ${buttonYear} ${$$props.class ?? ''}`;
    $: classesPrefixYear = `${cPrefixYear} ${prefixYear} ${$$props.class ?? ''}`;
    $: classesSuffixYear = `${cSuffixYear} ${suffixYear} ${$$props.class ?? ''}`;
</script>

<div class="flex flex-col lg:flex-row gap-0 md:gap-1 lg:gap-2">
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
</div>
