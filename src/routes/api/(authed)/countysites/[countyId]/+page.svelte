<script lang="ts">
    import { goto } from '$app/navigation';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { formatDate } from '$lib/utils.js';
    import type { County } from '@prisma/client';
    export let data;

    function handleSiteSelect(e: any) {
        let id = e.currentTarget.value;
        goto(`/api/countysites/${id}`);

        /*
        if (id > -1 && data.counties.find((x: any) => x.id === id)?.sites.length === 1) {
            goto(`/api/sites/${county.sites[0].siteId}`);
        } else {
            goto(`/api/countysites/${county.id}`);
        }
        */
    }

    /*
	console.log(data);
	console.log(data.counties);
	console.log(data.sites[0].countyId);
    */
    let countyId = data.refCountyId; // data.sites[0].countyId;
    console.log(countyId);
    let county: County = data.counties.find((c: County) => c.id === countyId) as County;
    console.log(county);
</script>

<StandardContainer>
    <svelte:fragment slot="standard-head">
        <div class="flex flex-row justify-between">
            <div class="flex">
                <div class="my-auto">All sites in county: {county.name}</div>
                <button type="button" class="btn"
                    ><span class="text-success-400">✚</span>&nbsp;Add new site</button
                >
            </div>
            <div>
                <select class="select" bind:value={countyId} on:change={handleSiteSelect}>
                    <option value="-1">ALL SITES</option>
                    {#each data.counties as county}
                        <option value={county.id}>{county.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="standard-content">
        <div>
            <div class="flex flex-wrap gap-2">
                {#each data.sites as site, i}
                    <a href="/api/sites/{site.siteId}">
                        <div
                            class="card relative grid w-56 h-32 p-0 m-0 text-wrap hover:variant-soft"
                        >
                            <div class="absolute top-2 left-2">🔍</div>
                            <div class="px-2 pt-2 w-full text-center">
                                <h3>{site.siteName}</h3>
                                <div>
                                    {site.county.name}
                                </div>
                                <div>{site.person}</div>
                                <div class="text-wrap">
                                    Last update: {formatDate(site.createdAt)}
                                </div>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
