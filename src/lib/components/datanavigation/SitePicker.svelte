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
    const cButtonSite = "w-32 md:w-44 lg:w-56 xl:w-64";
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
    let allSitesIndex = -1;

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    function handleSiteSelect(e: any) {
        console.log(e.currentTarget.value);
        allSitesIndex = allSites.findIndex((c) => {
            return c.siteId === parseInt(e.currentTarget.value);
        });

        if (allSitesIndex > -1) {
            console.log('Found and setting to:', allSites[allSitesIndex]);
            currentSite = allSites[allSitesIndex];
            goto('/api/sites/' + currentSite.siteId);
        } else {
            console.log('Index not found');
        }
    }

    function handleClickPrev(event: any) {
        allSitesIndex = allSites.findIndex((s) => s.siteId === currentSiteId);
        if (allSitesIndex > 0) {
            allSitesIndex--;
            currentSiteId = allSites[allSitesIndex].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    function handleClickNext(event: any) {
        allSitesIndex = allSites.findIndex((s) => s.siteId === currentSiteId);
        if (allSitesIndex < allSites.length - 1) {
            allSitesIndex++;
            currentSiteId = allSites[allSitesIndex].siteId;
            goto('/api/sites/' + currentSiteId);
        }
    }

    /*-- Reactives (functional) */
    $: currentSite = allSites.find(x => x.siteId === currentSiteId);
    $: nextDisabled = allSitesIndex > allSites.length - 2;
    $: prevDisabled = allSitesIndex < 1;
    console.log(currentSite);

</script>

<!--
<button class="btn variant-filled w-32 justify-between" use:popup={popupComboboxHelp}>
    <span class="capitalize">Help</span>
    <span>↓</span>
</button>
-->
<!-- TODO: add help tooltip to show this is filtered and maybe an option of all and/or unfiltered -->
<div class="block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handleClickPrev} disabled={prevDisabled} >◀</button>
        <button type="button" class={classesButtonSite} use:popup={popupSites} title={currentSite.siteName}>
            <span class="w-full text-left truncate overflow-hidden text-ellipsis">
                {currentSite.siteName}
            </span>
            <span>↓</span>
        </button>
        <button type="button" class={classesButtonRight} on:click={handleClickNext} disabled={nextDisabled} >▶</button>
    </div>
</div>

<div data-popup="popupSites">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <ListBox rounded="rounded-none">
            {#each allSites as site}
                <ListBoxItem
                    bind:group={currentSiteId}
                    name="sites"
                    on:change={handleSiteSelect}
                    value={site.siteId}
                    class="capitalize">

                    {site.siteName}

                </ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
