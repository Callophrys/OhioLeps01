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
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonSite: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let prefixSite: CssClasses = '';
    export let suffixSite: CssClasses = dropdownPointers ? "before:content-['↓']" : '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonRight = '';
    const cButtonSite = 'w-32 md:w-44 lg:w-56 xl:w-64';
    const cPrefixSite = '';
    const cSuffixSite = '';

    /*-- Reactives (styles) */
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesButtonSite = `${cButtonSite} ${buttonSite} ${$$props.class ?? ''}`;
    $: classesPrefixSite = `${cPrefixSite} ${prefixSite} ${$$props.class ?? ''}`;
    $: classesSuffixSite = `${cSuffixSite} ${suffixSite} ${$$props.class ?? ''}`;

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
<div class="block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handlePrev} disabled={prevDisabled}>◀</button>
        <button type="button" class={classesButtonSite} use:popup={popupSites} title={currentSite.siteName}>
            <span class="w-full text-left truncate overflow-hidden text-ellipsis">
                {currentSite.siteName}
            </span>
            <span>↓</span>
        </button>
        <button type="button" class={classesButtonRight} on:click={handleNext} disabled={nextDisabled}>▶</button>
    </div>
</div>

<div data-popup="popupSites">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <ListBox rounded="rounded-none">
            {#each filteredSites as site}
                <ListBoxItem bind:group={currentSiteId} name="sites" on:change={handleSelect} value={site.siteId}>
                    {site.siteName}
                </ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
