<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { SORTORDER } from '$lib/types.js';

    export let data;

    let useCounty: number;
    let sortOrderCounty: SORTORDER = SORTORDER.NONE;
    let sortOrderRegion: SORTORDER = SORTORDER.NONE;
    let sortIconCounty: string = '';
    let sortIconRegion: string = '';

    function handleSortClick(e: any) {
        return true;
     }

</script>

<!-- Counties -->
<StandardContainer>
    <svelte:fragment slot="standardHead">
    <div class="bg-red flex flex-row space-x-4">
        <div class="my-auto">County count: {data.counties.length}</div>
        <div class="my-auto">Counties with monitored sites: {data.counties.filter((c) => c.isMonitored).length}</div>
        <div class="flex flex-row space-x-2">
            <span class="my-auto text-right">Sort by County Region</span>
            <div class="scale-75 origin-left">
                <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={0}>County</RadioItem>
                    <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort-region" value={1}>Region</RadioItem>
                </RadioGroup>
            </div>
        </div>

    </div>
</svelte:fragment>
<svelte:fragment slot="standardBody">
    <div class="">
        <dl class="flex flex-wrap gap-2">
            {#each data.counties as county}
            <button type="button"
                class="btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary"
                on:click={() =>
                    county.sites.length === 1
                        ? goto(`/api/sites/${county.sites[0].siteId}`)
                        : goto(`/api/countysites/${county.id}`)} >

                <div class="w-full text-left">🌎 {county.name}</div>
                <div class="flex flex-row gap-4">
                    <div class="">{county.region.name}</div>
                    <div class="">{county.state.name}</div>
                    <div class="">
                        {county.sites.length}
                        {county.sites.length !== 1 ? 'sites' : 'site'}
                    </div>
                </div>

            </button>
            {/each}
        </dl>
    </div>
</svelte:fragment>
</StandardContainer>
