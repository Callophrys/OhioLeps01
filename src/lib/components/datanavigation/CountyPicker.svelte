<!-- CountyPicker.svlete -->
<script lang="ts">
    /*-- Imports */
    import type { County, Site } from '@prisma/client';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { getContext, type Snippet } from 'svelte';
    import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';

    type CountyPickerProps = {
        currentCountyId: number;
        currentSiteId: number;
        filterByCounty: boolean | null;
        dropdownPointers: boolean | null;
        controlOuter: CssClasses | null;
        controlBody: CssClasses | null;
        buttonLeft: CssClasses | null;
        buttonCenter: CssClasses | null;
        buttonRight: CssClasses | null;
        prefixCenter: CssClasses | null;
        scriptCenter: CssClasses | null;
        suffixCenter: CssClasses | null;
        popupInner: CssClasses | null;
        popupStyles: string | null;
        labelledby: string | null;
        heading: Snippet | null;
    };

    /*-- -- Data -- */
    /*-- Exports */
    let { currentCountyId = $bindable(), currentSiteId = $bindable(), filterByCounty = $bindable(false), dropdownPointers = true, controlOuter = '', controlBody = '', buttonLeft = '', buttonCenter = '', buttonRight = '', prefixCenter = '', scriptCenter = '', suffixCenter = '', popupInner = '', popupStyles = '', labelledby = 'Select county', heading }: CountyPickerProps = $props();

    if (!buttonCenter) buttonCenter = dropdownPointers ? 'w-20' : 'w-16';
    if (!suffixCenter) suffixCenter = dropdownPointers ? "before:content-['↓']" : '';

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */

    /*-- Context */
    let allCounties: County[] = getContext('counties') ?? [];
    let allSites: Site[] = getContext('sites') ?? [];

    /*-- -- Styling -- */
    /*-- Properties (styles) */

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */

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
    let classesControlOuter = $derived(`${cControlOuter} ${controlOuter}`); //${$$props.class ?? ''}`);
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); //${$$props.class ?? ''}`);
    let classesButtonLeft = $derived(`${cButtonLeft} ${buttonLeft}`); //${$$props.class ?? ''}`);
    let classesButtonCenter = $derived(`${cButtonCenter} ${buttonCenter}`); //${$$props.class ?? ''}`);
    let classesButtonRight = $derived(`${cButtonRight} ${buttonRight}`); //${$$props.class ?? ''}`);
    let classesPrefixCenter = $derived(`${cPrefixCenter} ${prefixCenter}`); //${$$props.class ?? ''}`);
    let classesScriptCenter = $derived(`${cScriptCenter} ${scriptCenter}`); //${$$props.class ?? ''}`);
    let classesSuffixCenter = $derived(`${cSuffixCenter} ${suffixCenter}`); //${$$props.class ?? ''}`);
    let classesPopupInner = $derived(`${cPopupInner} ${popupInner}`); //${$$props.class ?? ''}`);
    let stylesPopup = $derived(`${cPopupStyles} ${popupStyles}`); //${$$props.style ?? ''}`);

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
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */

    // TODO: apply temporary animate-pulse to indicate site change or perhaps
    //       the inability to change; this class is from tailwind

    function handleSelect() {
        let filteredSitesIndex =
            filteredSites?.findIndex((c: any) => {
                return c.countyId === currentCountyId;
            }) ?? -1;

        if (filteredSitesIndex > -1) {
            currentSiteId = filteredSites[filteredSitesIndex].id;
            goto('/api/sites/' + currentSiteId);
        } else {
            currentSiteId = -1;
        }
    }

    function handlePrev() {
        if (allCountiesIndex > 0) {
            currentCountyId = allCounties[allCountiesIndex - 1].id;
            let siteIndex = allSites.findLastIndex((s: any) => s.countyId === currentCountyId);
            if (siteIndex > 0) {
                currentSiteId = allSites[siteIndex].id;
                goto('/api/sites/' + currentSiteId);
            } else {
                currentSiteId = -1;
            }
        }
    }

    function handleNext() {
        if (allCountiesIndex < allCounties.length - 1) {
            currentCountyId = allCounties[allCountiesIndex + 1].id;
            let siteIndex = allSites.findIndex((s) => s.countyId === currentCountyId);
            if (siteIndex > 0) {
                currentSiteId = allSites[siteIndex].id;
                goto('/api/sites/' + currentSiteId);
            } else {
                currentSiteId = -1;
            }
        }
    }

    /*-- Methods */

    /*-- Reactives (functional) */
    let filteredSites = $derived(filterByCounty ? allSites.filter((s: any) => s.countyId === currentCountyId) : allSites);
    let allCountiesIndex = $derived(allCounties.findIndex((c: any) => c.id === currentCountyId));
    let currentCounty = $derived(currentCountyId > -1 ? allCounties.find((x) => x.id === currentCountyId) : null);
    let prevDisabled = $derived(allCountiesIndex < 1);
    let nextDisabled = $derived(allCountiesIndex > allCounties.length - 2);

    // $effect(() => {
    //     let cn = currentCounty?.countyNumber ?? -1;
    //     const county = data.counties.find((x) => x.id === currentCountyId);
    //     const site: any = (() => {
    //         if (cn < currentCounty.countyNumber) return allSites.find((x: any) => x.countyId === currentCountyId);
    //         return allSites.findLast((x: any) => x.countyId === currentCountyId);
    //     })();
    //     if (site) currentSiteId = site.id; // this could cause nesting and looping infinitely
    // })

    //$inspect(currentCountyId);
</script>

<div class={classesControlOuter}>
    {#if heading}
        <div class="my-auto">
            {@render heading()}
        </div>
    {/if}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} onclick={handlePrev} disabled={prevDisabled}>◀</button>
        <button type="button" class={classesButtonCenter} use:popup={popupCounties}>
            <span class={classesScriptCenter}>{currentCounty?.name}</span>
            <span>↓</span>
        </button>
        <button type="button" class={classesButtonRight} onclick={handleNext} disabled={nextDisabled}>▶</button>
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
