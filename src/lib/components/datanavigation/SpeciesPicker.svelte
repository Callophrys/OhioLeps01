<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SiteDateObservationChecklist } from '$lib/types';
    import { sortByStringProperty } from '$lib/utils';
    
    /** SiteDateObservationChecklist object for current data */
    export let currentSpecies: SiteDateObservationChecklist;

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    const siteDateObservations: SiteDateObservationChecklist[] = getContext('siteDateObservations') ?? [];
    
    // Properties
    const sdoCommon = [...new Set(siteDateObservations.map((x: SiteDateObservationChecklist) => ({
        siteDateObservationId: x.siteDateObservationId, name: x.checklist.commonName
    })))];
    sortByStringProperty(sdoCommon, 'name', true);

    const sdoLatin = [...new Set(siteDateObservations.map((x: SiteDateObservationChecklist) => ({ siteDateObservationId: x.siteDateObservationId, name: x.checklist.scientificName})))];
    sortByStringProperty(sdoLatin, 'name', true);

    // Nav control enable/disable configs
    let enabledNext: boolean;
    let enabledPrev: boolean;

    // Properties (styles)
    /** */
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let buttonSpecies: CssClasses = 'w-32 md:w-44 lg:w-56 xl:w-64 truncate'; // dropdownPointers ? ($$slots.prefixSiteDateObservation ? 'w-28' : 'w-20') : $$slots.prefixSiteDateObservation ? 'w-24' : 'w-16';
    export let prefixSiteDateObservation: CssClasses = '';
    export let suffixSiteDateObservation: CssClasses = dropdownPointers ? "before:content-['↓']" : '';
    /** */
    ///export let spacing: CssClasses = 'space-y-1';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    // Constants (styles)
    const cControlBody = 'btn-group variant-soft my-auto';
    const cButtonLeft = '';
    const cButtonRight = '';
    const cButtonSpecies = '';
    const cPrefixSiteDateObservation = '';
    const cSuffixSiteDateObservation = '';

    const popupSiteDateObservations: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSiteDateObservations',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    function handleClick(e: any) {
        if (e.currentTarget?.value) {
            goto(`/api/sitedateobservations/${e.currentTarget.value}/${currentSpecies.siteDate.site.siteId}`);
        }
    }

    function handleClickPrior(event: any) {
        let idx = sdoCommon.findIndex(o => o.siteDateObservationId === currentSpecies.siteDateObservationId);
        if (idx > 0) {
            goto(`/api/sitedateobservations/${sdoCommon[idx - 1].siteDateObservationId}/${currentSpecies.siteDate.site.siteId}`);
        }
    }

    function handleClickNext(event: any) {
        let idx = sdoCommon.findIndex(o => o.siteDateObservationId === currentSpecies.siteDateObservationId);
        //console.log('x:', currentSpecies.siteDateObservationId, 'idx:', idx, 'sdo', sdoCommon);
        if (idx > -1 && idx < sdoCommon.length - 1) {
            goto(`/api/sitedateobservations/${sdoCommon[idx + 1].siteDateObservationId}/${currentSpecies.siteDate.site.siteId}`);
        }
    }

    // Reactive styles
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesButtonSpecies = `${cButtonSpecies} ${buttonSpecies} ${$$props.class ?? ''}`;
    $: classesPrefixSiteDateObservation = `${cPrefixSiteDateObservation} ${prefixSiteDateObservation} ${$$props.class ?? ''}`;
    $: classesSuffixSiteDateObservation = `${cSuffixSiteDateObservation} ${suffixSiteDateObservation} ${$$props.class ?? ''}`;

    // reactive for data - don't think this is needed for anything anymore
    // Does this actually obviated the need for onMount?
    $: currentSpecies = currentSpecies;

    // reactive for nav controls - is one time so could just be onMount
    $: {
        let currentIndex = sdoCommon.findIndex(o => o.siteDateObservationId === currentSpecies.siteDateObservationId);
        enabledNext = currentIndex > -1 && currentIndex < sdoCommon.length - 1;
        enabledPrev = currentIndex > 0;

        //console.log(currentSpecies);
    }

</script>

<div class="block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handleClickPrior} disabled={enabledPrev ? '' : 'disabled'}>◀</button>
        <button type="button" class={classesButtonSpecies}
            use:popup={popupSiteDateObservations}
            title={currentSpecies.checklist.commonName}
            on:keydown={(e) => {
                if (e.code === DOM_VK_DOWN || e.code === DOM_VK_RETURN) {
                    return handleClickNext(e);
                } else if (e.code === DOM_VK_UP) {
                    return handleClickPrior(e);
                } else {
                    return true;
                }
            }}>
            {#if $$slots.prefixSiteDateObservation}<span class={classesPrefixSiteDateObservation}><slot name="prefixSiteDateObservation" /></span>{/if}
            <span class="truncate">{currentSpecies.checklist.commonName}</span>
            <span class={classesSuffixSiteDateObservation} />
        </button>
        <button type="button" class={classesButtonRight} on:click={handleClickNext} disabled={enabledNext ? '' : 'disabled'}>▶</button>
    </div>

    <div data-popup="popupComboboxSiteDateObservations">
        <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
            <ListBox rounded="rounded-none" labelledby="Years for site">
                {#each sdoCommon as sdo}
                    <ListBoxItem bind:group={currentSpecies.siteDateObservationId} name="years" value={sdo.siteDateObservationId} on:click={handleClick}>{sdo.name}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>
</div>
