<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { SORTORDER } from '$lib/types.js';

    export let data;
    //console.log(data);

    const cCountyClasses = 'btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary';

    let groupCounties: HTMLElement;
    let useCounty: number;
    let showUnmonitored: number;
    let sortOrderCounty: SORTORDER = SORTORDER.NONE;
    let sortOrderRegion: SORTORDER = SORTORDER.NONE;
    let sortIconCounty: string = '';
    let sortIconRegion: string = '';

    function handleSortClick(e: any) {
        return true;
    }

    enum MonitorStatus {
        ALL = 0,
        MONITORED = 1,
        UNMONITORED = 2,
    }

    function handleShowClick(e: any) {
        const val = Number(e.target.value);
        switch (val) {
            case MonitorStatus.MONITORED:
                groupCounties.classList.toggle('hide-monitored', false);
                groupCounties.classList.toggle('hide-unmonitored', true);
                break;
            case MonitorStatus.UNMONITORED:
                groupCounties.classList.toggle('hide-monitored', true);
                groupCounties.classList.toggle('hide-unmonitored', false);
                break;
            default:
                groupCounties.classList.toggle('hide-monitored', false);
                groupCounties.classList.toggle('hide-unmonitored', false);
        }
        return true;
    }
</script>

<!-- Counties -->
<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="bg-red flex flex-row space-x-4 justify-between">
            <div class="my-auto">County count: {data.counties.length}</div>
            <div class="flex flex-row space-x-2">
                <span class="my-auto text-right">Sort by County Region</span>
                <div class="scale-75 origin-left">
                    <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
                        <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort" value={0}>County</RadioItem>
                        <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort" value={1}>Region</RadioItem>
                    </RadioGroup>
                </div>
            </div>
            <div class="my-auto">Counties with monitored sites: {data.counties.filter((c) => c.isMonitored).length}</div>
            <div class="flex flex-row space-x-2">
                <span class="my-auto text-right">Filter monitor status</span>
                <div class="scale-75 origin-left">
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                        <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show" value={MonitorStatus.ALL}>All</RadioItem>
                        <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show" value={MonitorStatus.MONITORED}>Monitored</RadioItem>
                        <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show" value={MonitorStatus.UNMONITORED}>Unmonitored</RadioItem>
                    </RadioGroup>
                </div>
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="standardBody">
        <div class="">
            <div bind:this={groupCounties} class="flex flex-wrap gap-2 group">
                {#each data.counties as county}
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
