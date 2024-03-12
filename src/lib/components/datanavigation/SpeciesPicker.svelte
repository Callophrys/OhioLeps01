<script lang="ts">
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SiteDateObservationChecklist } from '$lib/types';
    import { sortByStringProperty, setDifferenceByProp } from '$lib/utils';
    
    /** SiteDateObservationChecklist object for current data */
    export let currentSdoChecklistItem: SiteDateObservationChecklist;

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    export let isEditing: boolean = false;
    export let isAdding: boolean = false;

    const checklistsSiteDateObs: SiteDateObservationChecklist[] = getContext('checklistsSiteDateObs') ?? [];
    const checklistsSite: any[] = getContext('checklistsSite') ?? [];
    const checklistsAll: any[] = getContext('checklistsAll') ?? [];

    const sdoA = [...new Set(checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({
        checklistId: x.checklistId, name: x.checklist.commonName
    })))];
    const sdoB = [...new Set(checklistsSite.map((x: any) => ({
        checklistId: x.checklistId, name: x.commonName
    })))];
    const sdoC = [...new Set(checklistsAll.map((x: any) => ({
        checklistId: x.checklistId, name: x.commonName
    })))];
    
    console.log('sdoA >>', sdoA);
    console.log('sdoB >>', sdoB);
    console.log('sdoC >>', sdoC);

    const availableSeenBefore = setDifferenceByProp(sdoB, sdoA, 'checklistId');
    const availableAllPossible = setDifferenceByProp(sdoC, sdoB, 'checklistId');

    console.log('availableSeenBefore >>', availableSeenBefore);
    console.log('availableAllPossible >>', availableAllPossible);

    // Properties
    const sdoCommon = [...new Set(checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({ siteDateObservationId: x.siteDateObservationId, name: x.checklist.commonName })))];
    sortByStringProperty(sdoCommon, 'name', true);

    const sdoLatin = [...new Set(checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({ siteDateObservationId: x.siteDateObservationId, name: x.checklist.scientificName})))];
    sortByStringProperty(sdoLatin, 'name', true);

    // Nav control enable/disable configs
    let enabledNext: boolean;
    let enabledPrev: boolean;
    let enabledDrop: boolean;

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
            goto(`/api/sitedateobservations/${e.currentTarget.value}/${currentSdoChecklistItem.siteDate.site.siteId}`);
        }
    }

    function handleClickPrior(event: any) {
        let idx = sdoCommon.findIndex(o => o.siteDateObservationId === currentSdoChecklistItem.siteDateObservationId);
        if (idx > 0) {
            goto(`/api/sitedateobservations/${sdoCommon[idx - 1].siteDateObservationId}/${currentSdoChecklistItem.siteDate.site.siteId}`);
        }
    }

    function handleClickNext(event: any) {
        let idx = sdoCommon.findIndex(o => o.siteDateObservationId === currentSdoChecklistItem.siteDateObservationId);
        console.log('x:', currentSdoChecklistItem.siteDateObservationId, 'idx:', idx, 'sdo', sdoCommon);
        if (idx > -1 && idx < sdoCommon.length - 1) {
            goto(`/api/sitedateobservations/${sdoCommon[idx + 1].siteDateObservationId}/${currentSdoChecklistItem.siteDate.site.siteId}`);
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
    $: currentSdoChecklistItem = currentSdoChecklistItem;

    // reactive for nav controls - is one time so could just be onMount
    $: {
        let currentIndex = sdoCommon.findIndex(o => o.siteDateObservationId === currentSdoChecklistItem.siteDateObservationId);
        enabledDrop = !isAdding && !isEditing;
        enabledNext = !isAdding && !isEditing && currentIndex > -1 && currentIndex < sdoCommon.length - 1;
        enabledPrev = !isAdding && !isEditing && currentIndex > 0;

        console.log(enabledDrop, enabledNext, enabledPrev);
        //console.log(currentSdoChecklistItem);
    }

</script>

<div class="block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handleClickPrior} disabled={!enabledPrev}>◀</button>
        <button type="button" class={classesButtonSpecies}
            use:popup={popupSiteDateObservations}
            title={currentSdoChecklistItem.checklist.commonName}
            on:keydown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    return handleClickNext(e);
                } else if (e.key === 'ArrowUp') {
                    return handleClickPrior(e);
                } else {
                    return true;
                }
            }}
            disabled={!enabledDrop}>
            {#if $$slots.prefixSiteDateObservation}<span class={classesPrefixSiteDateObservation}><slot name="prefixSiteDateObservation" /></span>{/if}
            <span class="truncate">{currentSdoChecklistItem.checklist.commonName}</span>
            <span class={classesSuffixSiteDateObservation} />
        </button>
        <button type="button" class={classesButtonRight} on:click={handleClickNext} disabled={!enabledNext}>▶</button>
    </div>

    <div data-popup="popupComboboxSiteDateObservations">
        <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
            <ListBox rounded="rounded-none" labelledby="Years for site">
                {#each sdoCommon as sdo}
                    <ListBoxItem bind:group={currentSdoChecklistItem.siteDateObservationId} name="years" value={sdo.siteDateObservationId} on:click={handleClick}>{sdo.name}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>
</div>
