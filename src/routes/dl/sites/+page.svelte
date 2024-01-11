<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { formatDate } from '$lib/utils';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    export let data;
    console.log('sites: ', data);
    function submitting(e: any) {
        console.log(e);
    }
</script>

<StandardContainer>
    <div class="bg-red">Site Count: {data.sites.length}</div>
    <section>
        {#if $page.data?.user?.role === 'ADMIN'}
            <form action="?/sites" on:submit={submitting} id="pickSite" class="grid grid-cols-3 gap-2 w-fit"><!-- later add use:enhance-->
            </form>
            {#each data.sites as site, i}
                <button type="submit" form="pickSite" value={site.siteId} name="siteId"
                    class="card btn w-60 p-2 grid grid-cols-1 text-wrap">
                    <h3>{site.siteName}</h3>
                    <div>{site.person}</div>
                    <div>{site.stateCounty.state}</div>
                    <div>{site.stateCounty.county}</div>
                    <div>Last update: {formatDate(site.changeDate)}</div>
                </button>
            {/each}
        {:else}
            <div class="grid grid-cols-3 gap-4 w-fit">
                {#each data.sites as site, i}
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
                {/each}
            </div>
        {/if}
    </section>
</StandardContainer>
