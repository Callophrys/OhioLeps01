<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { goto } from '$app/navigation';
    import { setContext } from 'svelte';
    import CountyFilter from '$lib/components/counties/countyFilter.svelte';
    import CountySort from '$lib/components/counties/countySort.svelte';

    export let data;

    const cCountyClasses = 'btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary';
    let countyGroup: HTMLElement;

    setContext('counties', data.counties);
    $: counties = data.counties;
</script>

<!-- Counties -->
<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="bg-red flex flex-row space-x-4 justify-between">
            <CountySort bind:counties />
            <CountyFilter bind:countyGroup />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="standardBody">
        <div class="">
            <div bind:this={countyGroup} class="flex flex-wrap gap-2 group">
                {#each counties as county}
                    <button type="button" class={`${cCountyClasses} group-[.hide-${county.isMonitored ? 'monitored' : 'unmonitored'}]:hidden`} on:click={() => (county.sites.length === 1 ? goto(`/api/sites/${county.sites[0].siteId}`) : goto(`/api/countysites/${county.id}`))}>
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
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
