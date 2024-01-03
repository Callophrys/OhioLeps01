<script lang="ts">
    import type { Checklist } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    
    let comboboxValue: string;

    const popupComboboxSpecies: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxSpecies',
        placement: 'bottom',
    };

	export let speciesChecklist: Checklist[] = [];
	export let defaultShowAllSpecies: boolean = true;
	export let defaultLatinName: boolean = true;

	let speciesChecked: number[] = [];

	function toggleAllSpecies() {
        allSelected = !allSelected;
		if (allSelected) {
			speciesChecked = speciesChecklist.map(c => c.checklistId);
		} else {
			speciesChecked = [];
		}
	}

	onMount(() => {
        allSelected = !defaultShowAllSpecies;
        toggleAllSpecies();
	});
	
	$:allSelected = speciesChecklist.length === speciesChecked.length;
</script>


<div class="flex items-center space-x-2">
    <button class="btn variant-filled w-auto justify-between" use:popup={popupComboboxSpecies}>
        <span>Species</span>
        <span>↓</span>
    </button>
    <div class="text-warning-500 italic text-sm">
        {allSelected ? 'All species' : 'Species filtered'}
    </div>
</div>

<div class="card w-64 shadow-xl p-2" data-popup="popupComboboxSpecies">
    <label class="flex items-center space-x-2">
        <input type="checkbox" class="checkbox" checked={allSelected} on:click={toggleAllSpecies} /><p>All species</p>
    </label>
    <label class="flex items-center space-x-2 pl-6">
        <p>Use Latin name</p>
        <input type="checkbox" class="checkbox" bind:checked={defaultLatinName}>
    </label>
    <hr>
    {#each speciesChecklist as species}
    <label class="flex items-center space-x-2 pl-6">
        <input type="checkbox" class="checkbox"
            value={species.checklistId}
            bind:group={speciesChecked} >
        <p>{defaultLatinName ? species.xname : species.commonName}</p>
    </label>
    {/each}
</div>