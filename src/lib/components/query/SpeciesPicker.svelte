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
    export let initialUseLatinChoice: number = 1;

    let speciesChecked: number[] = [];

    let selectAllSpecies: number;
    let useLatin: number;
    let capturedSpecies: number[] = [];

    function handleNamingClick(e: any) {
        console.log(speciesChecklist[0]);
// TODO: handle flip flop of sort order
        if (useLatin) {
            console.log('Latin - 1', e.currentTarget.value);
            speciesChecklist = speciesChecklist.toSorted((a: Checklist, b: Checklist) => {
                if (a.scientificName < b.scientificName) return -1;
                if (a.scientificName > b.scientificName) return 1;
                if (a.commonName < b.commonName) return -1;
                if (a.commonName > b.commonName) return 1;
                return 0;
            });
        } else {
            console.log('Common - 0', e.currentTarget.value);
            speciesChecklist = speciesChecklist.toSorted((a: Checklist, b: Checklist) => {
                if (a.commonName < b.commonName) return -1;
                if (a.commonName > b.commonName) return 1;
                if (a.scientificName < b.scientificName) return -1;
                if (a.scientificName > b.scientificName) return 1;
                return 0;
            });
        }
        console.log('useLatin', useLatin);
        /*
        console.log('keys', Object.keys(speciesChecklist));
        console.log('values', Object.values(speciesChecklist));
        console.log('entries', Object.entries(speciesChecklist));
        */
    }

    function toggleAllSpecies() {
        allSelected = !allSelected;
        if (allSelected) {
            speciesChecked = speciesChecklist.map((c) => c.checklistId) as number[];
        } else {
            speciesChecked = [];
        }
    }

    onMount(() => {
        let z: string = localStorage?.useCapturedSpecies;
        if (z) {
            capturedSpecies = z.split(',').map((s: string) => parseInt(s));
        } else {
            capturedSpecies = speciesChecklist.map((s: any) => s.checklistId);
        }

        let y: string = localStorage?.useSelectAllSpecies;
        if (y && y.length) {
            selectAllSpecies = parseInt(y);
        } else {
            selectAllSpecies = 1;
        }

        let x: string = localStorage?.useLatinChoice;
        if (x && x.length) {
            useLatin = parseInt(x);
        } else {
            useLatin = initialUseLatinChoice;
        }

        //ned 1/24/24 toggleAllSpecies();
    });

    afterUpdate(() => {
        localStorage.setItem('useLatinChoice', useLatin.toString());
        localStorage.setItem('useSelectAllSpecies', allSelected ? '1' : '0');
        localStorage.setItem(
            'useCapturedSpecies',
            speciesChecked.map((s) => s.toString()).join(',')
        );
    });

    $: allSelected = speciesChecklist.length === speciesChecked.length;

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
        {allSelected
            ? 'All species'
            : speciesChecked.length > 0
              ? 'Species filtered'
              : 'Not filtered'}
    </div>
</div>

<div data-popup="popupComboboxSpecies">
    <div class="card w-64 shadow-xl p-2">
        <label class="flex justify-between space-x-2">
            <span>{allSelected ? 'Unselect all' : 'Select all'}</span>
            <SlideToggle
                name="toggle-all-species"
                size="sm"
                active="variant-filled-primary"
                bind:value={selectAllSpecies}
                checked={allSelected}
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
                    on:change={handleNamingClick}
                    name="toggle-naming"
                    value={0}>Common</RadioItem
                >
                <RadioItem
                    bind:group={useLatin}
                    on:change={handleNamingClick}
                    name="toggle-naming"
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
