<script lang="ts">
    import type { ChecklistCombinedName } from '$lib/types';
    import type { Checklist } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { afterUpdate, onMount } from 'svelte';

    const popupComboboxSpecies: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSpecies',
        placement: 'bottom',
    };

    export let speciesChecklist: Checklist[] = []; // ChecklistCombinedName<Checklist>[] = [];
    export let initialUseAllSpeciesChoice: number = 1;
    export let initialUseLatinChoice: number = 1;

    let speciesChecked: number[] = [];

    let useAllSpecies: number;
    let useLatin: number;
    let capturedSpecies: number[] = [];

    enum SORTORDER {
        NONE = 0,
        ASC = 1,
        DSC = 2
    }

    let sortOrderCommon: SORTORDER = SORTORDER.NONE;
    let sortOrderLatin: SORTORDER = SORTORDER.NONE;
    let sortIconCommon: string = '';
    let sortIconLatin: string = '';

    function GetSortedSpecies() {
        /*
        console.log(speciesChecklist[0]); console.log('Sort species - useLatin', useLatin);
        console.log('sortOrderLatin', sortOrderLatin); console.log('sortOrderCommon',sortOrderCommon);
        console.log('sortIconLatin', sortIconLatin); console.log('sortIconCommon', sortIconCommon);
        */

        if (useLatin) {

            let factor1 = sortOrderLatin !== SORTORDER.ASC ? 1 : -1;
            let factor2 = -1 * factor1;

            return speciesChecklist.toSorted((a: Checklist, b: Checklist) => {
                if (a.scientificName < b.scientificName) return factor1;
                if (a.scientificName > b.scientificName) return factor2;
                if (a.commonName < b.commonName) return factor1;
                if (a.commonName > b.commonName) return factor2;
                return 0;
            });
        } else {

            let factor1 = sortOrderCommon !== SORTORDER.ASC ? 1 : -1;
            let factor2 = -1 * factor1;

            return speciesChecklist.toSorted((a: Checklist, b: Checklist) => {
                if (a.commonName < b.commonName) return factor1;
                if (a.commonName > b.commonName) return factor2;
                if (a.scientificName < b.scientificName) return factor1;
                if (a.scientificName > b.scientificName) return factor2;
                return 0;
            });
        }
    }

    function handleNamingClick(e: any) {

        if (e.currentTarget.name === 'toggle-naming-latin') {

            if (useLatin) {

                if (sortOrderLatin !== SORTORDER.ASC) {
                    sortOrderLatin = SORTORDER.ASC;
                    sortIconLatin = 'table-sort-dsc';
                } else {
                    sortOrderLatin = SORTORDER.DSC;
                    sortIconLatin = 'table-sort-asc';
                }

                sortOrderCommon = SORTORDER.NONE;
                sortIconCommon = '';
                speciesChecklist = GetSortedSpecies();

            } else if (sortOrderCommon !== SORTORDER.NONE) {
                sortOrderLatin = SORTORDER.NONE;
                sortIconLatin = '';
            }

        } else {

            if (!useLatin) {

                if (sortOrderCommon !== SORTORDER.ASC) {
                    sortOrderCommon = SORTORDER.ASC;
                    sortIconCommon = 'table-sort-dsc';
                } else {
                    sortOrderCommon = SORTORDER.DSC;
                    sortIconCommon = 'table-sort-asc';
                }

                sortOrderLatin = SORTORDER.NONE;
                sortIconLatin = '';
                speciesChecklist = GetSortedSpecies();

            } else if (sortOrderLatin !== SORTORDER.NONE) {
                sortOrderCommon = SORTORDER.NONE;
                sortIconCommon = '';
            }
        }
    }

    function toggleAllSpecies(e: any) {
        console.log('checked in as', useAllSpecies);
        if (useAllSpecies) {
            speciesChecked = [];
        } else {
            speciesChecked = speciesChecklist.map((c) => c.checklistId) as number[];
        }
    }

    onMount(() => {
        let y: string = localStorage?.useAllSpeciesChoice;
        //console.log('y', y, 'useallspecies', useAllSpecies);
        if (y && y.length) {
            useAllSpecies = parseInt(y);
        } else {
            useAllSpecies = initialUseAllSpeciesChoice;
        }
        //console.log('useallspecies', useAllSpecies);

        let x: string = localStorage?.useLatinChoice;
        if (x && x.length) {
            useLatin = parseInt(x);
        } else {
            useLatin = initialUseLatinChoice;
        }
        speciesChecklist = GetSortedSpecies(useLatin);

        //ned 1/24/24 toggleAllSpecies();
        if (useAllSpecies) {
            speciesChecked = speciesChecklist.map((c) => c.checklistId);
            //console.log('species checked', speciesChecked);
        } else {
            let z: string = localStorage?.useCapturedSpecies;
            //console.log('z', z);
            if (z) {
                capturedSpecies = z.split(',').map((s: string) => parseInt(s));
                speciesChecked = capturedSpecies;
                capturedSpecies = speciesChecklist.map((s: any) => s.checklistId);
            }
        }
    });

    afterUpdate(() => {
        localStorage.setItem('useLatinChoice', useLatin ? '1' : '0');
        localStorage.setItem('useAllSpeciesChoice', useAllSpecies ? '1' : '0');
        localStorage.setItem(
            'useCapturedSpecies',
            speciesChecked.map((s) => s.toString()).join(',')
        );
    });

    $: useAllSpecies = speciesChecked.length === speciesChecklist.length;

</script>

<div class="flex items-center space-x-2">
    <button
        class="btn w-32 variant-filled justify-between"
        use:popup={popupComboboxSpecies}
        on:click={(e) => e.preventDefault()}
    >
        <span>Species</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {useAllSpecies
            ? 'All species'
            : speciesChecked.length > 0
              ? 'Species filtered'
              : 'Not filtered'}
    </div>
</div>

<div data-popup="popupComboboxSpecies">
    <div class="card w-64 shadow-xl p-2">
        <label class="flex justify-between space-x-2">
            <span>{useAllSpecies ? 'Select all' : 'Unselect all'}</span>
            <SlideToggle
                name="toggle-all-species"
                size="sm"
                active="variant-filled-primary"
                bind:checked={useAllSpecies}
                on:click={toggleAllSpecies}
            /><input hidden />
        </label>

        <span class="my-auto">Naming</span>
        <div class="scale-75 origin-right">
            <RadioGroup
                name="toggle-naming-group"
                active="variant-filled-primary"
                hover="hover:variant-soft-primary"
            >
                <RadioItem
                    bind:group={useLatin}
                    on:click={handleNamingClick}
                    class={sortIconCommon}
                    name="toggle-naming-common"
                    value={0}>Common</RadioItem
                >
                <RadioItem
                    bind:group={useLatin}
                    on:click={handleNamingClick}
                    class={sortIconLatin}
                    name="toggle-naming-latin"
                    value={1}>Latin</RadioItem
                >
            </RadioGroup>
        </div>

        <div class="half-vh">
            {#each speciesChecklist as species (species.checklistId)}
                <label class="flex items-center space-x-2 pl-6">
                    <input
                        type="checkbox"
                        class="checkbox"
                        value={species.checklistId}
                        bind:group={speciesChecked}
                        name="select-species"
                    />
                    <p>{useLatin ? species.scientificName : species.commonName}</p>
                </label>
            {/each}
        </div>
    </div>
</div>

<style>
    .half-vh {
        @apply overflow-y-auto;
        height: calc(100vh - 432px);
        min-height: 160px;
    }
</style>
