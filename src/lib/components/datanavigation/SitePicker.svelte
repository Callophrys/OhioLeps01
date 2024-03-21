<script lang="ts">
    /*-- Imports */
    import type { Site } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentSiteId: number;

    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
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
    let allSites: Site[] = getContext('sites') ?? [];
    console.log(allSites);
    console.log(currentSite);

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    function handleSiteSelect(e: any) {
        console.log(e.currentTarget.value);
        let idx = allSites.findIndex((c) => {
            return c.siteId === parseInt(e.currentTarget.value);
        });
        if (idx > -1) {
            console.log('Found and setting to:', allSites[idx]);
            currentSite = allSites[idx];
        } else {
            console.log('Index not found');
        }
    }

    /*-- Reactives (functional) */
    $: currentSite = allSites.find(x => x.siteId === currentSiteId);
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
    <div class="btn-group variant-soft my-auto">
        <button class="!px-2">◀</button>
        <button class="w-32 md:w-44 lg:w-56 xl:w-64" use:popup={popupSites} title={currentSite.siteName}>
            <span class="h-full truncate">
                {currentSite.siteName}
            </span>
            <span>↓</span>
        </button>
        <button class="!px-2">▶</button>
    </div>
</div>

<div data-popup="popupSites">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <ListBox rounded="rounded-none">
            {#each allSites as site}
                <ListBoxItem bind:group={currentSite.siteId} name="medium" on:change={handleSiteSelect} value={site.siteId} class="capitalize">{site.siteName}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
