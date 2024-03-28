<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { goto } from '$app/navigation';
    import { setContext } from 'svelte';
    import CountyFilter from '$lib/components/counties/countyFilter.svelte';
    import CountySort from '$lib/components/counties/countySort.svelte';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    export let data;
    setContext('counties', data.counties);

    const cButtonGroupClasses = 'flex flex-wrap gap-2';
    const cButtonClasses = 'btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary';

    let vButtonGroupClasses: CssClasses = '';
    $: buttonGroupClasses = `${cButtonGroupClasses} ${vButtonGroupClasses}`;
    $: counties = data.counties;
    $: goNextCountyId = () => {
        if (counties.length) {
            if (counties[0].sites.length === 1) {
                return counties[0].sites[0].siteId;
            } else {
                return counties[0].id;
            }
        }
        return -1;
    };
    $: goNextTargetType = () => {
        if (counties.length && counties[0].sites.length === 1) {
            return GOTYPE.SITES;
        }
        return GOTYPE.COUNTYSITES;
    } satisfies GOTYPE;
</script>

<!-- Counties -->
<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="bg-red flex flex-col lg:flex-row justify-between">
            <GoBack targetId={-1} targetType={GOTYPE.HOME} controlBody="scale-90" />
            <GoNext targetId={goNextCountyId} targetType={goNextTargetType} controlBody="scale-90" />
            <CountySort bind:counties controlBody="scale-90" />
            <CountyFilter bind:vButtonGroupClasses controlBody="scale-90" />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="standardBody">
        <div class="">
            <div class={buttonGroupClasses}>
                {#each counties as county}
                    <button type="button" class={`${cButtonClasses} ${county.isMonitored ? 'group-[.hide-monitored]:hidden' : 'group-[.hide-unmonitored]:hidden'}`} on:click={() => (county.sites.length === 1 ? goto(`/api/sites/${county.sites[0].siteId}`) : goto(`/api/countysites/${county.id}`))}>
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
