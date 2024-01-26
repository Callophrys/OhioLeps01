<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { goto } from '$app/navigation';
    export let data;
</script>

<!-- Counties -->
<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="bg-red">
        County count: {data.counties.length}
        &nbsp;&nbsp;Counties with monitored sites: {data.counties.filter((c) => c.isMonitored)
            .length}
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
