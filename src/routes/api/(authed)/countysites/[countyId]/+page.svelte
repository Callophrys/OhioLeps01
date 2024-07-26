<script lang="ts">
    import type { County } from '@prisma/client';
    import Container from '$lib/components/layouts/Container.svelte';
    import { goto } from '$app/navigation';
    import { formatDate } from '$lib/utils.js';
    import { page } from '$app/stores';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    let { data } = $props();

    function handleSiteSelect(e: any) {
        let id = e.currentTarget.value;
        goto(`/api/countysites/${id}`);

        /*
        if (id > -1 && data.counties.find((x: any) => x.id === id)?.sites.length === 1) {
            goto(`/api/sites/${county.sites[0].id}`);
        } else {
            goto(`/api/countysites/${county.id}`);
        }
        */
    }

    function addSite() {
        goto(`/api/sites/new/${countyId}`);
    }

    /*
	console.log(data);
	console.log(data.counties);
	console.log(data.sites[0].countyId);
    */
    let countyId = $state(data.refCountyId); // data.sites[0].countyId;
    $inspect(countyId);

    let county: County = $derived(data.counties.find((c: County) => c.id === countyId) as County);
    $inspect(county);

    let goNextSiteId = $derived(data.sites.length ? data.sites[0].id : -1);
</script>

{#snippet head()}
    <div class="flex flex-row justify-between">
        <div class="flex flex-row space-x-2">
            <div class="my-auto">All sites in county: {county.name}</div>

            {#if $page.data?.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN')}
                <button type="button" class="btn h-10 variant-soft" onclick={addSite}><span class="text-success-400">✚</span>&nbsp;Add new site</button>
            {/if}
        </div>
        <div class="flex flex-row">
            <GoBack targetId={-1} targetIdSecondary={null} targetType={GOTYPE.COUNTIES} controlBody="scale-90" buttonCenter="" scriptCenter="" labelledby="" />
            <GoNext targetId={goNextSiteId} targetIdSecondary={-1} targetType={GOTYPE.SITES} controlBody="scale-90" controlDisabled={goNextSiteId === -1} buttonCenter="" scriptCenter="" labelledby="Go to sites" />
            <select class="select scale-90" bind:value={countyId} onchange={handleSiteSelect}>
                <option value="-1">ALL SITES</option>
                {#each data.counties as county}
                    <option value={county.id}>{county.name}</option>
                {/each}
            </select>
        </div>
    </div>
{/snippet}
{#snippet body()}
    <div>
        <div class="flex flex-wrap gap-2">
            {#each data.sites as site}
                <a href="/api/sites/{site.id}">
                    <div class="card relative grid w-56 h-32 p-0 m-0 text-wrap hover:variant-soft">
                        <div class="absolute top-2 left-2">🔍</div>
                        <div class="px-2 pt-2 w-full text-center">
                            <h3>{site.siteName}</h3>
                            <div>
                                {site.county.name}
                            </div>
                            <div>{site.person}</div>
                            <div class="text-wrap">
                                Last update: {formatDate(new Date(site.createdAt).toISOString())}
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
{/snippet}
<!-- {#snippet tail()}{/snippet} -->
<Container {head} {body} bodyClasses={''} tail={null} />
