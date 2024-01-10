<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { formatDate } from '$lib/utils';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    export let data;
    console.log('sites');
</script>

<StandardContainer>
    <div class="bg-red">Site Count: {data.sites.length}</div>
    <section>
        <div class="grid grid-cols-3 gap-4 w-fit">
            {#each data.sites as site, i}
                {#if $page.data?.user?.role === 'ADMIN'}
                    <button class="card btn w-60 p-2 grid grid-cols-1 text-wrap">
                        <h3>{site.siteName}</h3>
                        <div>{site.person}</div>
                        <div>{site.stateCounty.state}</div>
                        <div>{site.stateCounty.county}</div>
                        <div>Last update: {formatDate(site.changeDate)}</div>
                    </button>
                {:else}
                    <!-- Trigger -->
                    <div
                        class="card w-60 p-4 [&>*]:pointer-events-none"
                        use:popup={{
                            event: 'hover',
                            target: 'loopExample-' + i,
                            placement: 'right',
                        }}
                    >
                        <h3>{site.siteName}</h3>
                        <div>
                            {site.siteAddress ?? ''}{#if site.siteCityStateZip}
                                {site.siteAddress ? ',' : ''}
                                {@html site.siteCityStateZip + '&nbsp;&#124;&nbsp;'}{/if}
                            {site.stateCounty.state} (County: {site.stateCounty.county})
                        </div>
                    </div>

                    <!-- Popup -->
                    <div data-popup="loopExample-{i}">
                        <div class="card py-2 px-4 shadow-xl variant-filled-surface">
                            <div class="underline">Directions</div>
                            <p>{site.siteName}<br />{site.person}</p>
                            <div class="arrow variant-filled-surface" />
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </section>
</StandardContainer>
