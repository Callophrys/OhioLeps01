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

    export let initialUseLatinChoice: number = 0;
    export let speciesChecklist: Checklist[] = [];     // ChecklistCombinedName<Checklist>[] = [];

    let useLatin: number;
    let speciesChecked: number[] = [];

    function toggleAllSpecies() {
        allSelected = !allSelected;
        if (allSelected) {
            speciesChecked = speciesChecklist.map((c) => c.checklistId) as number[];
        } else {
            speciesChecked = [];
        }
    }

    onMount(() => {
        let x: string = localStorage?.useLatinChoice;
        if (x && x.length) {
            useLatin = parseInt(x);
        } else {
            useLatin = initialUseLatinChoice;
        }

        toggleAllSpecies();
    });

    afterUpdate(() => {
        localStorage.setItem('useLatinChoice', useLatin.toString());
    });

    $: allSelected = speciesChecklist.length === speciesChecked.length;
</script>

<div class="flex items-center space-x-2">
    <button class="btn w-32 variant-filled justify-between"
        use:popup={popupComboboxSpecies}
        on:click={e => e.preventDefault()}>
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
            <SlideToggle name="toggle-all-species" size="sm" active="variant-filled-primary"
             checked={allSelected} on:click={toggleAllSpecies} /><input hidden>
        </label>

        <span class="my-auto">Naming</span>
        <div class="scale-75 origin-right">
        <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={useLatin} name="toggle-naming" value={0}>Common</RadioItem>
            <RadioItem bind:group={useLatin} name="toggle-naming" value={1}>Latin</RadioItem>
        </RadioGroup>
        </div>

        {#each speciesChecklist as species}
        <label class="flex items-center space-x-2 pl-6">
            <input type="checkbox" class="checkbox"
                name="select-species"
                value={species.checklistId}
                bind:group={speciesChecked} >
            <p>{useLatin ? species.scientificName : species.commonName}</p>
        </label>
        {/each}

    </div>
</div>
