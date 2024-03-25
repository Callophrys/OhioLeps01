<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';
    import type { County, Site } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentCountyId: number;
    console.log('currentCountyId', currentCountyId);

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    /*-- Context */
    let allCounties: County[] = getContext('counties') ?? [];
    let allSites: Site[] = getContext('sites') ?? [];
    //console.log(allCounties);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonCounty: CssClasses = dropdownPointers ? ($$slots.prefixYear ? 'w-28' : 'w-20') : $$slots.prefixYear ? 'w-24' : 'w-16';
    export let prefixCounty: CssClasses = '';
    export let suffixCounty: CssClasses = dropdownPointers ? "before:content-['↓']" : '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select county';

    /*-- Constants (styles) */
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonRight = '';
    const cButtonCounty = "w-32 md:w-44 lg:w-56 xl:w-64";
    const cPrefixCounty = '';
    const cSuffixCounty = '';

    /*-- Reactives (styles) */
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesButtonCounty = `${cButtonCounty} ${buttonCounty} ${$$props.class ?? ''}`;
    $: classesPrefixCounty = `${cPrefixCounty} ${prefixCounty} ${$$props.class ?? ''}`;
    $: classesSuffixCounty = `${cSuffixCounty} ${suffixCounty} ${$$props.class ?? ''}`;

    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupCounties: PopupSettings = {
        event: 'focus-click',
        target: 'popupCounties',
        placement: 'bottom',
        closeQuery: '.listbox-item',
        state: (e: Record<string, boolean>) => console.log('popup state:', e),
    };

    /*-- Properties (functional) */
    /*-- Variables and objects */
    let allCountiesIndex = -1;
    let allSitesIndex = -1;

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleSelect(e: any) {
        console.log(e.currentTarget.value);
        let countyId = parseInt(e.currentTarget.value);
        if (countyId !== currentCountyId) {

            currentCounty = allCounties.find((c) => c.id === countyId);

            allSitesIndex = allSites.findIndex((c) => {
                return c.countyId === countyId;
            });

            if (allSitesIndex > -1) {
                if (currentSiteId !== allSites[allSitesIndex].siteId) {
                    currentSite = allSites[allSitesIndex];
                    goto('/api/sites/' + currentSite.siteId);
                }
            } else {
                console.log('Site index not found')
            }
        }
    }

    function handlePrev(e: any) {
        console.log('handlePrev', 'currentCountyId (1)', currentCountyId);
        allCountiesIndex = allCounties.findIndex((c) => c.id === currentCountyId);
        console.log('handlePrev', 'allCountiesIndex', allCountiesIndex);
        if (allCountiesIndex > 0) {
            allCountiesIndex--;
            currentCountyId = allCounties[allCountiesIndex].id;
            console.log('handlePrev', 'currentCountyId (2)', currentCountyId);
            allSitesIndex = allSites.findLastIndex((s) => s.countyId === currentCountyId);
            console.log('handlePrev', 'allSitesIndex', allSitesIndex);
            if (allSitesIndex > 0) {
                currentSiteId = allSites[allSitesIndex].siteId;
                console.log('handlePrev', 'currentSiteId', currentSiteId);
                goto('/api/sites/' + currentSiteId);
            }
        }
    }

    function handleNext() {
        console.log('handleNext', 'currentCountyId (1)', currentCountyId);
        allCountiesIndex = allCounties.findIndex((c) => c.id === currentCountyId);
        console.log('handleNext', 'allCountiesIndex', allCountiesIndex);
        if (allCountiesIndex < allCounties.length - 1) {
            allCountiesIndex++;
            currentCountyId = allCounties[allCountiesIndex].id;
            console.log('handleNext', 'currentCountyId (2)', currentCountyId);
            allSitesIndex = allSites.findIndex((s) => s.countyId === currentCountyId);
            console.log('handleNext', 'allSitesIndex', allSitesIndex);
            if (allSitesIndex > 0) {
                currentSiteId = allSites[allSitesIndex].siteId;
                console.log('handleNext', 'currentSiteId', currentSiteId);
                goto('/api/sites/' + currentSiteId);
            }
        }
    }

    /*-- Methods */
    /*-- Reactives (functional) */
    $: currentCounty = allCounties.find(x => x.id === currentCountyId);
    $: currentSite = allSites.find(x => x.countyId === currentCountyId);
    $: currentSiteId = currentSite?.siteId;
    $: nextDisabled = allCountiesIndex > allCounties.length - 2;
    $: prevDisabled = allCountiesIndex < 1;
    console.log("currentCounty", currentCounty);

</script>

<div class="flex flex-col lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class={classesControlBody} aria-labelledby={labelledby}>
        <!--TODO: Still breaks and/or locks up when arrowing to Adams county, also select 2 get stuck to only the 2 on next-prev -->
        <button class={classesButtonLeft} on:click={handlePrev} disabled={prevDisabled}>◀</button>
        <button class="w-44" use:popup={popupCounties}>
            <span class="w-full text-left text-nowrap overflow-hidden text-ellipsis">
                {currentCounty.name}
            </span>
            <span class="flex-auto">↓</span>
        </button>
        <button class={classesButtonRight} on:click={handleNext} disabled={nextDisabled}>▶</button>
    </div>
</div>

<div data-popup="popupCounties">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <!--TODO: this must close out right after clicking -->
        <ListBox rounded="rounded-none">
            {#each allCounties as county}
                <ListBoxItem
                    bind:group={currentCountyId}
                    name="counties"
                    on:change={handleSelect}
                    value={county.id}>

                    {county.name}

                </ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
