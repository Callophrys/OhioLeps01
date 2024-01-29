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
    let i: number;

    let namingSort: string; // L or C + N or A or D
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

    function GetSortedSpecies(isLatin: bool) {

        if ((sortOrderCommon | sortOrderLatin) === SORTORDER.NONE) {
            return;
        }

        if (isLatin) {

            let sortDir = sortOrderLatin === SORTORDER.ASC ? 1 : -1;

            speciesChecklist.sort((a: Checklist, b: Checklist) => {
                if (a.scientificName > b.scientificName) return 1 * sortDir;
                if (a.scientificName < b.scientificName) return -1 * sortDir;
                return 0;
            });

        } else {

            let sortDir = sortOrderCommon === SORTORDER.ASC ? 1 : -1;

            speciesChecklist.sort((a: Checklist, b: Checklist) => {
                if ((a.commonName ?? a.scientificName) > (b.commonName ?? b.scientificName)) return 1 * sortDir;
                if ((a.commonName ?? a.scientificName) < (b.commonName ?? b.scientificName)) return -1 * sortDir;
                return 0;
            });
        }
    }

    function handleNamingClick(e: any) {

        if (e.currentTarget.name === 'toggle-naming-latin') {

            if (useLatin) {

                if (sortOrderLatin !== SORTORDER.ASC) {
                    sortOrderLatin = SORTORDER.ASC;
                    sortIconLatin = 'table-sort-asc';
                } else {
                    sortOrderLatin = SORTORDER.DSC;
                    sortIconLatin = 'table-sort-dsc';
                }

                sortOrderCommon = SORTORDER.NONE;
                sortIconCommon = '';
                GetSortedSpecies(true);
                speciesChecklist = speciesChecklist;

            } else if (sortOrderCommon !== SORTORDER.NONE) {
                sortOrderLatin = SORTORDER.NONE;
                sortIconLatin = '';
            }

        } else {

            if (!useLatin) {

                if (sortOrderCommon !== SORTORDER.ASC) {
                    sortOrderCommon = SORTORDER.ASC;
                    sortIconCommon = 'table-sort-asc';
                } else {
                    sortOrderCommon = SORTORDER.DSC;
                    sortIconCommon = 'table-sort-dsc';
                }

                sortOrderLatin = SORTORDER.NONE;
                sortIconLatin = '';
                GetSortedSpecies(false);
                speciesChecklist = speciesChecklist;

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

    function clearSort() {
        sortOrderCommon = SORTORDER.NONE;
        sortOrderLatin = SORTORDER.NONE;
        sortIconCommon = '';
        sortIconLatin = '';
    }

    onMount(() => {
        let z: string = localStorage?.namingSort;
        console.log('Fetching namingSort:', z);
        if (z && z.length === 2) {
            if (z[0] === 'L') {
                if (z[1] === 'A') {
                    sortOrderLatin = SORTORDER.ASC;
                    sortIconLatin = 'table-sort-asc';
                } else if (z[1] === 'D') {
                    sortOrderLatin = SORTORDER.DSC;
                    sortIconLatin = 'table-sort-dsc';
                } else {
                    sortOrderLatin = SORTORDER.NONE;
                    sortIconLatin = '';
                }
                sortOrderCommon = SORTORDER.NONE;
                sortIconCommon = '';

                // treat as latin even if other button is to be selected
                GetSortedSpecies(true);
                speciesChecklist = speciesChecklist;
            } else if (z[0] === 'C') {
                if (z[1] === 'A') {
                    sortOrderCommon = SORTORDER.ASC;
                    sortIconCommon = 'table-sort-asc';
                } else if (z[1] === 'D') {
                    sortOrderCommon = SORTORDER.DSC;
                    sortIconCommon = 'table-sort-dsc';
                } else {
                    sortOrderCommon = SORTORDER.NONE;
                    sortIconCommon = '';
                }
                sortOrderLatin = SORTORDER.NONE;
                sortIconLatin = '';

                // treat as common even if other button is to be selected
                GetSortedSpecies(false);
                speciesChecklist = speciesChecklist;
            } else {
                clearSort();
            }

        } else {
            clearSort();
        }

        let y: string = localStorage?.useAllSpeciesChoice;
        if (y && y.length) {
            useAllSpecies = parseInt(y);
        } else {
            useAllSpecies = initialUseAllSpeciesChoice;
        }

        let x: string = localStorage?.useLatinChoice;
        if (x && x.length) {
            useLatin = parseInt(x);
        } else {
            useLatin = initialUseLatinChoice;
        }

        if (useAllSpecies) {
            speciesChecked = speciesChecklist.map((c) => c.checklistId);
        } else {
            let z: string = localStorage?.useCapturedSpecies;
            if (z) {
                capturedSpecies = z.split(',').map((s: string) => parseInt(s));
                speciesChecked = capturedSpecies;
                capturedSpecies = speciesChecklist.map((s: any) => s.checklistId);
            }
        }
    });

    const getSortSave = () => {
        if (sortOrderLatin !== SORTORDER.NONE) {
            return 'L' + (sortOrderLatin === SORTORDER.DSC ? 'D' : 'A');
        }
        if (sortOrderCommon !== SORTORDER.NONE) {
            return 'C' + (sortOrderCommon === SORTORDER.DSC ? 'D' : 'A');
        }
        return '';
    }

    afterUpdate(() => {
        localStorage.setItem('useLatinChoice', useLatin ? '1' : '0');
        localStorage.setItem('namingSort', getSortSave());
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
            {#each speciesChecklist as species}
                <label class="flex items-center space-x-2 pl-6">
                    <input
                        type="checkbox"
                        class="checkbox"
                        value={species.checklistId}
                        bind:group={speciesChecked}
                        name="select-species"
                    />
                    <p class="text-nowrap">{useLatin ?
                        species.scientificName :
                        (species.commonName ?? `(${species.scientificName})`)}</p>
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
