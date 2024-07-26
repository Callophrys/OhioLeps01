<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SiteDateObservationChecklist } from '$lib/types';
    import { sortByStringProperty, setDifferenceByProp } from '$lib/utils';

    /*-- -- Data -- */
    /*-- Exports */

    /** SiteDateObservationChecklist object for current data */
    export let currentSdoChecklistItemId: number | null;
    console.log('bbb>', currentSdoChecklistItemId);
    //export let currentSdoChecklistItem: SiteDateObservationChecklist | null;

    /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
    export let dropdownPointers: boolean = true;

    export let isAdding: boolean = false;
    export let isEditing: boolean = false;
    export let showDeletedData: boolean = false;
    export let isViewAll: boolean = false;

    /*-- Context */
    const checklistsSiteDateObs: SiteDateObservationChecklist[] = getContext('checklistsSiteDateObs') ?? [];
    const checklistsSite: any[] = getContext('checklistsSite') ?? [];
    const checklistsAll: any[] = getContext('checklistsAll') ?? [];

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlOuter: CssClasses = '';
    export let controlBody: CssClasses = '';
    export let buttonLeft: CssClasses = '';
    export let buttonCenter: CssClasses = '';
    export let buttonRight: CssClasses = '';
    export let prefixCenter: CssClasses = '';
    // export let scriptCenter: CssClasses = '';
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
    const cButtonCenter = 'w-32 md:w-44 lg:w-56 xl:w-64 truncate'; // dropdownPointers ? ($$slots.prefixSiteDateObservation ? 'w-28' : 'w-20') : $$slots.prefixSiteDateObservation ? 'w-24' : 'w-16';
    const cButtonRight = '';
    const cPrefixCenter = '';
    // const cScriptCenter = '';
    const cSuffixCenter = '';
    const cPopupInner = 'card w-48 shadow-xl py-2 overflow-y-auto';
    const cPopupStyles = 'max-height: calc(100vh - 272px);';

    const cDeleted = 'bg-warning-100-800-token hover:bg-warning-200-700-token active:bg-surface-200-700 line-through';

    /*-- Reactives (styles) */
    $: classesControlOuter = `${cControlOuter} ${controlOuter} ${$$props.class ?? ''}`;
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonLeft = `${cButtonLeft} ${buttonLeft} ${$$props.class ?? ''}`;
    $: classesButtonCenter = `${cButtonCenter} ${buttonCenter} ${$$props.class ?? ''}`;
    $: classesButtonRight = `${cButtonRight} ${buttonRight} ${$$props.class ?? ''}`;
    $: classesPrefixCenter = `${cPrefixCenter} ${prefixCenter} ${$$props.class ?? ''}`;
    // $: classesScriptCenter = `${cScriptCenter} ${scriptCenter} ${$$props.class ?? ''}`;
    $: classesSuffixCenter = `${cSuffixCenter} ${suffixCenter} ${$$props.class ?? ''}`;
    $: classesPopupInner = `${cPopupInner} ${popupInner} ${$$props.class ?? ''}`;
    $: stylesPopup = `${cPopupStyles} ${popupStyles} ${$$props.style ?? ''}`;

    /*-- -- Coding -- */
    /*-- Enums */
    type sdoSpeciesObject = { siteDateObservationId: number; name: string; deleted: boolean };

    /*-- Constants (functional) */
    const popupSdoSpecies: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboSpecies',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    /*-- Properties (functional) */
    const sdoCommon: sdoSpeciesObject[] = [];
    const sdoLatin: sdoSpeciesObject[] = [];
    let currentSdoChecklistItem: SiteDateObservationChecklist = checklistsSiteDateObs.find((x) => x.id === currentSdoChecklistItemId) as SiteDateObservationChecklist;

    /*-- Variables and objects */

    // Nav control enable/disable configs
    let enabledNext: boolean;
    let enabledPrev: boolean;
    let enabledDrop: boolean;

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleClick(e: any) {
        if (e.currentTarget?.value) {
            goto(`/api/sitedateobservations/${e.currentTarget.value}/${currentSdoChecklistItem.siteDate.siteId}`);
        }
    }

    function handleClickPrior() {
        let idx = sdoCommon.findIndex((o) => o.siteDateObservationId === currentSdoChecklistItem.id);
        if (idx > 0) {
            goto(`/api/sitedateobservations/${sdoCommon[idx - 1].siteDateObservationId}/${currentSdoChecklistItem.siteDate.siteId}`);
        }
    }

    function handleClickNext() {
        let idx = sdoCommon.findIndex((o) => o.siteDateObservationId === currentSdoChecklistItem.id);
        console.log('x:', currentSdoChecklistItem.id, 'idx:', idx, 'sdo', sdoCommon);
        if (idx > -1 && idx < sdoCommon.length - 1) {
            goto(`/api/sitedateobservations/${sdoCommon[idx + 1].siteDateObservationId}/${currentSdoChecklistItem.siteDate.siteId}`);
        }
    }

    /*-- Methods */
    /*-- Reactives (functional) */

    // reactive for nav controls - is one time so could just be onMount
    $: {
        sdoCommon.length = 0;
        sdoLatin.length = 0;
        console.log('ccc>', currentSdoChecklistItem);

        if (showDeletedData) {
            sdoCommon.push(
                ...new Set(
                    checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({
                        siteDateObservationId: x.id,
                        name: x.checklist.commonName ?? `(${x.checklist.scientificName})`,
                        deleted: x.deleted,
                    }))
                )
            );

            sdoLatin.push(
                ...new Set(
                    checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({
                        siteDateObservationId: x.id,
                        name: x.checklist.scientificName,
                        deleted: x.deleted,
                    }))
                )
            );
        } else {
            /*

            // When currentSdoChecklistItem is deleted try to get next successive sdo checklist item that is NOT deleted
            // else get the next preceeding sdo checklist item that is NOT deleted.  If either fails then set to empty
            // Since this would indicate all records in sdo are deleted.
            if (currentSdoChecklistItem && currentSdoChecklistItem.deleted) {

                let idSelected = currentSdoChecklistItem.siteDateObservationId;
                let indexOfSelected: number = sdoCommon.findIndex((s: sdoSpeciesObject) => s.siteDateObservationId === idSelected);

                const commonRight: sdoSpeciesObject | undefined = sdoCommon.find((s: sdoSpeciesObject, idx: number) => {idx > indexOfSelected && !s.deleted });

                if (typeof commonRight !== 'undefined') {

                    const tempSdo: SiteDateObservationChecklist = checklistsSiteDateObs.find((s: SiteDateObservationChecklist) => s.siteDateObservationId === commonRight.siteDateObservationId) as SiteDateObservationChecklist;
                    //currentSdoChecklistItemId = tempSdo.siteDateObservationId;

                } else {

                    const sdoCommonReversed = sdoCommon.toReversed();
                    indexOfSelected = sdoCommonReversed.length - indexOfSelected - 1;
                    const commonLeft: sdoSpeciesObject | undefined = sdoCommonReversed.find((s: sdoSpeciesObject, idx: number) => {idx > indexOfSelected && !s.deleted });

                    if (typeof commonLeft !== 'undefined') {
                        const tempSdo = checklistsSiteDateObs
                            .find((s: SiteDateObservationChecklist) => s.siteDateObservationId === commonLeft.siteDateObservationId) as SiteDateObservationChecklist;
                        //currentSdoChecklistItemId = tempSdo.siteDateObservationId;
                    }

                }
            }

            */

            sdoCommon.push(
                ...new Set(
                    checklistsSiteDateObs
                        .filter((x: SiteDateObservationChecklist) => !x.deleted)
                        .map((x: SiteDateObservationChecklist) => ({
                            siteDateObservationId: x.id,
                            name: x.checklist.commonName ?? `(${x.checklist.scientificName})`,
                            deleted: false,
                        }))
                )
            );

            sdoLatin.push(
                ...new Set(
                    checklistsSiteDateObs
                        .filter((x: SiteDateObservationChecklist) => !x.deleted)
                        .map((x: SiteDateObservationChecklist) => ({
                            siteDateObservationId: x.id,
                            name: x.checklist.scientificName,
                            deleted: false,
                        }))
                )
            );
        }

        sortByStringProperty(sdoCommon, 'name', true);
        sortByStringProperty(sdoLatin, 'name', true);
    }

    $: {
        let currentIndex = sdoCommon.findIndex((o) => o.siteDateObservationId === currentSdoChecklistItemId);
        enabledDrop = !isAdding && !isEditing && !isViewAll;
        enabledNext = !isAdding && !isEditing && !isViewAll && currentIndex > -1 && currentIndex < sdoCommon.length - 1;
        enabledPrev = !isAdding && !isEditing && !isViewAll && currentIndex > 0;

        console.log(enabledDrop, enabledNext, enabledPrev);
        //console.log(currentSdoChecklistItem);
        console.log('ddd>', currentSdoChecklistItem);
    }

    /*-- Other */
    const sdoA = [
        ...new Set(
            checklistsSiteDateObs.map((x: SiteDateObservationChecklist) => ({
                checklistId: x.checklistId,
                name: x.checklist.commonName,
            }))
        ),
    ];
    const sdoB = [
        ...new Set(
            checklistsSite.map((x: any) => ({
                checklistId: x.checklistId,
                name: x.commonName,
            }))
        ),
    ];
    const sdoC = [
        ...new Set(
            checklistsAll.map((x: any) => ({
                checklistId: x.checklistId,
                name: x.commonName,
            }))
        ),
    ];

    console.log('sdoA >>', sdoA);
    console.log('sdoB >>', sdoB);
    console.log('sdoC >>', sdoC);

    const availableSeenBefore = setDifferenceByProp(sdoB, sdoA, 'checklistId');
    const availableAllPossible = setDifferenceByProp(sdoC, sdoB, 'checklistId');

    console.log('availableSeenBefore >>', availableSeenBefore);
    console.log('availableAllPossible >>', availableAllPossible);

    // Does this actually obviated the need for onMount?
    // .... well maybe if an html element - user thing updates it
    $: currentSdoChecklistItem = checklistsSiteDateObs.find((x) => x.id === currentSdoChecklistItemId) as SiteDateObservationChecklist;
</script>

<div class={classesControlOuter}>
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}

    <div class={classesControlBody} aria-labelledby={labelledby}>
        <button type="button" class={classesButtonLeft} on:click={handleClickPrior} disabled={!enabledPrev}>◀</button>
        <button
            type="button"
            class={classesButtonCenter}
            use:popup={popupSdoSpecies}
            title={currentSdoChecklistItem.checklist.commonName}
            on:keydown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    return handleClickNext();
                } else if (e.key === 'ArrowUp') {
                    return handleClickPrior();
                } else {
                    return true;
                }
            }}
            disabled={!enabledDrop}>
            {#if $$slots.prefixSiteDateObservation}<span class={classesPrefixCenter}><slot name="prefixSiteDateObservation" /></span>{/if}
            <span class={`truncate ${currentSdoChecklistItem.deleted ? 'line-through' : ''}`}>{currentSdoChecklistItem?.checklist.commonName}</span>
            <span class={classesSuffixCenter}></span>
        </button>
        <button type="button" class={classesButtonRight} on:click={handleClickNext} disabled={!enabledNext}>▶</button>
    </div>

    <div data-popup="popupComboSpecies">
        <div class={classesPopupInner} style={stylesPopup}>
            <ListBox rounded="rounded-none" labelledby="Species for site">
                {#each sdoCommon as sdo}
                    <ListBoxItem class={`${sdo.deleted ? (showDeletedData ? cDeleted : 'hidden') : ''}`} bind:group={currentSdoChecklistItemId} name="species" value={sdo.siteDateObservationId} on:click={handleClick}>{sdo.name}</ListBoxItem>
                {/each}
            </ListBox>
        </div>
    </div>
</div>
