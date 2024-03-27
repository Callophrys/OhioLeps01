<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';
    import type { Site } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentSiteId: number;
    export let filterByCounty: boolean;

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    /*-- Context */
    let allSites: Site[] = getContext('sites') ?? [];
    //console.log(allSites);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlOuter: CssClasses = '';
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonCenter: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let buttonRight: CssClasses = '';
    export let prefixCenter: CssClasses = '';
    export let scriptCenter: CssClasses = '';
    export let suffixCenter: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    export let popupInner: CssClasses = '';
    export let popupStyles: string = '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlOuter = 'block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2';
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonCenter = 'w-32 md:w-44 lg:w-56 xl:w-64';
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
    const popupSites: PopupSettings = {
        event: 'focus-click',
        target: 'popupSites',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    /*-- Properties (functional) */

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleSelect() {
        if (filteredSitesIndex > -1) {
            currentSiteId = filteredSites[filteredSitesIndex].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    function handlePrev() {
        if (filteredSitesIndex > 0) {
            let index = filteredSitesIndex - 1;
            currentSiteId = filteredSites[index].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    function handleNext() {
        if (filteredSitesIndex < filteredSites.length - 1) {
            let index = filteredSitesIndex + 1;
            currentSiteId = filteredSites[index].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    /*-- Methods */

    /*-- Reactives (functional) */
    $: filteredSites = filterByCounty ? allSites.filter((s: any) => s.countyId === currentSite?.countyId) : allSites;
    $: filteredSitesIndex = filteredSites.findIndex((s: any) => s.siteId === currentSiteId);
    $: currentSite = allSites.find((x) => x.siteId === currentSiteId);
    $: prevDisabled = filteredSitesIndex < 1;
    $: nextDisabled = filteredSitesIndex > filteredSites.length - 2;
    //console.log(currentSite);
</script>

<!-- TODO: add help tooltip to show this is filtered and maybe an option of all and/or unfiltered -->
<div class={classesControlOuter}>
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handlePrev} disabled={prevDisabled}>◀</button>
        <button type="button" class={classesButtonCenter} use:popup={popupSites} title={currentSite.siteName}>
            <span class={classesScriptCenter}>
                {currentSite.siteName}
            </span>
            <span>↓</span>
        </button>
        <button type="button" class={classesButtonRight} on:click={handleNext} disabled={nextDisabled}>▶</button>
    </div>
</div>

<div data-popup="popupSites">
    <div class={classesPopupInner} style={stylesPopup}>
        <ListBox rounded="rounded-none">
            {#each filteredSites as site}
                <ListBoxItem bind:group={currentSiteId} name="sites" on:change={handleSelect} value={site.siteId}>
                    {site.siteName}
                </ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
