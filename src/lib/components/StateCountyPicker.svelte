<script lang="ts">
    import type { StateCounty } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { setInitialClassState } from '@skeletonlabs/skeleton';

    let comboboxValue: string;

    const popupComboboxStateCounty: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxStateCounty',
        placement: 'bottom',
    };

	export let stateCounties: StateCounty[] = [];
	
	let useMonitoredSitesOnly: boolean = true;
	let counties: number[] = [];
	function toggleAllCounties() {
		if (allSelected) {
			counties = []
		} else {
			counties = stateCounties.filter(c => c.isMonitored).map(c => c.stateCountyId);
		}
	}
	
	$:allSelected = stateCounties.map(c => c.isMonitored).length === counties.length;

</script>

<button class="btn variant-filled w-36 justify-between" use:popup={popupComboboxStateCounty}>
    <span class="capitalize">State/Counties</span>
    <span>↓</span>
</button>

<div class="card w-64 shadow-xl py-2" data-popup="popupComboboxStateCounty">
    <label class="flex items-center space-x-2">
        <input type="checkbox" class="checkbox" checked={allSelected} on:click={toggleAllCounties} /><p>Ohio - All</p>
    </label>
    <label class="flex items-center space-x-2 pl-6">
        <p>Limit to counties with monitored sites</p>
        <input type="checkbox" class="checkbox" bind:checked={useMonitoredSitesOnly}>
    </label>
    {#each stateCounties as stateCounty}
    {#if !useMonitoredSitesOnly || stateCounty.isMonitored}
    <label class="flex items-center space-x-2 pl-6">
        <input type="checkbox" class="checkbox"
            value={stateCounty.stateCountyId}
            bind:group={counties}
            disabled={!stateCounty.isMonitored} />
        <p>{stateCounty.county}{stateCounty.isMonitored ? '' : '*'}</p>
    </label>
    {/if}
    {/each}
</div>