<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';
    import type { County, Site } from '@prisma/client';
    import { filter, popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentCountyId: number;
    export let filterByCounty: boolean = false;

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    /*-- Context */
    let allCounties: County[] = getContext('counties') ?? [];
    let allSites: Site[] = getContext('sites') ?? [];

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlOuter: CssClasses = '';
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonCenter: CssClasses = dropdownPointers ? 'w-20' : 'w-16';
    export let buttonRight: CssClasses = '';
    export let prefixCenter: CssClasses = '';
    export let scriptCenter: CssClasses = '';
    export let suffixCenter: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    export let popupInner: CssClasses = '';
    export let popupStyles: string = '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select county';

    /*-- Constants (styles) */
    const cControlOuter = 'block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2';
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonCenter = 'w-32 md:w-44 lg:w-56';
    const cButtonRight = '';
    const cPrefixCenter = '';
    const cScriptCenter = 'w-full text-left truncate overflow-hidden text-ellipsis';
    const cSuffixCenter = '';
    const cPopupInner = 'card w-48 shadow-xl py-2 overflow-y-auto';
    const cPopupStyles = 'max-height: calc(100vh - 272px);';

    /*-- Reactives (styles) */
    $: classesControlOuter = `${cControlOuter} ${controlOuter} ${$$props.class ?? ''}`;
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonCenter = `${cButtonCenter} ${buttonCenter} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesPrefixCenter = `${cPrefixCenter} ${prefixCenter} ${$$props.class ?? ''}`;
    $: classesScriptCenter = `${cScriptCenter} ${scriptCenter} ${$$props.class ?? ''}`;
    $: classesSuffixCenter = `${cSuffixCenter} ${suffixCenter} ${$$props.class ?? ''}`;
    $: classesPopupInner = `${cPopupInner} ${popupInner} ${$$props.class ?? ''}`;
    $: stylesPopup = `${cPopupStyles} ${popupStyles} ${$$props.style ?? ''}`;

    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupCounties: PopupSettings = {
        event: 'focus-click',
        target: 'popupCounties',
        placement: 'bottom',
        closeQuery: '.listbox-item',
        //, state: (e: Record<string, boolean>) => console.log('popup state:', e),
    };

    /*-- Properties (functional) */
    /*-- Variables and objects */
    let filteredSitesIndex: number;

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */

    // TODO: apply temporary animate-pulse to indicate site change or perhaps
    //       the inability to change; this class is from tailwind

    function handleSelect() {
        filteredSitesIndex = filteredSites.findIndex((c: any) => {
            return c.countyId === currentCountyId;
        });

        if (filteredSitesIndex > -1) {
            currentSiteId = filteredSites[filteredSitesIndex].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    function handlePrev() {
        if (allCountiesIndex > 0) {
            currentCountyId = allCounties[allCountiesIndex - 1].id;
            let siteIndex = allSites.findLastIndex((s: any) => s.countyId === currentCountyId);
            if (siteIndex > 0) {
                currentSiteId = allSites[siteIndex].siteId;
                goto('/api/sites/' + currentSiteId);
            }
        }
    }

    function handleNext() {
        if (allCountiesIndex < allCounties.length - 1) {
            currentCountyId = allCounties[allCountiesIndex + 1].id;
            let siteIndex = allSites.findIndex((s) => s.countyId === currentCountyId);
            if (siteIndex > 0) {
                currentSiteId = allSites[siteIndex].siteId;
                goto('/api/sites/' + currentSiteId);
            }
        }
    }

    /*-- Methods */

    /*-- Reactives (functional) */
    $: filteredSites = filterByCounty ? allSites.filter((s: any) => s.countyId === currentCountyId) : allSites;
    $: allCountiesIndex = allCounties.findIndex((c: any) => c.id === currentCountyId);
    $: currentCounty = currentCountyId > -1 ? allCounties.find((x) => x.id === currentCountyId) : null;
    $: currentSite = filteredSites.find((x: any) => x.countyId === currentCountyId);
    $: currentSiteId = currentSite?.siteId;
    $: prevDisabled = allCountiesIndex < 1;
    $: nextDisabled = allCountiesIndex > allCounties.length - 2;

    $: currentCountyId, console.log('CountyPicker.currentCountyId', currentCountyId);
</script>

<div class={classesControlOuter}>
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handlePrev} disabled={prevDisabled}>◀</button>
        <button type="button" class={classesButtonCenter} use:popup={popupCounties}>
            <span class={classesScriptCenter}>
                {currentCounty?.name}
            </span>
            <span>↓</span>
        </button>
        <button type="button" class={classesButtonRight} on:click={handleNext} disabled={nextDisabled}>▶</button>
    </div>
</div>

<div data-popup="popupCounties">
    <div class={classesPopupInner} style={stylesPopup}>
        <ListBox rounded="rounded-none">
            {#each allCounties as county}
                <ListBoxItem bind:group={currentCountyId} name="counties" on:change={handleSelect} value={county.id}>
                    {county.name}
                </ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
