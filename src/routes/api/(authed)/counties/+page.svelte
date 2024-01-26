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
        <div class="w-1/2">
            <dl class="list-dl max-w-80">
                {#each data.counties as county}
                    <div class="variant-outline-primary">
                        <span class="badge variant-outline-primary">🌎</span>
                        <span class="flex-auto">
                            <dt>{county.name}</dt>
                            <dd class="flex flex-row">
                                <div class="">{county.region.name}</div>
                                <div class="">{county.state.name}</div>
                                <div class="">
                                    {county.sites.length}
                                    {county.sites.length !== 1 ? 'sites' : 'site'}
                                </div>
                            </dd>
                        </span>
                    </div>
                    <!-- ... -->
                {/each}
            </dl>
            {#each data.counties as county}
                <a
                    class="variant-soft-primary hover:variant-filled-primary"
                    href="/api/countysites/{county.id}"
                >
                    <div class="flex flex-row">
                        <div class="w-40">{county.name}</div>
                        <div class="w-24">{county.region.name}</div>
                        <div class="w-16">{county.state.name}</div>
                        <div class="w-24">
                            {county.sites.length}
                            {county.sites.length !== 1 ? 'sites' : 'site'}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </svelte:fragment>
</StandardContainer>
<button
    type="button"
    class="btn"
    on:click={() =>
        county.sites.length === 1
            ? goto(`/api/sites/${county.sites[0].siteId}`)
            : goto(`/api/countysites/${county.id}`)}
>
</button>
