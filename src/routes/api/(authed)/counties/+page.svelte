<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    import { goto } from '$app/navigation';
    import { setContext } from 'svelte';
    import CountyFilter from '$lib/components/counties/countyFilter.svelte';
    import CountySort from '$lib/components/counties/countySort.svelte';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    let { data } = $props();
    setContext('counties', data.counties);

    const cButtonGroupClasses = 'flex flex-wrap gap-2';
    const cButtonClasses = 'btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary';

    let vButtonGroupClasses: CssClasses = $state('');

    let buttonGroupClasses = $derived(`${cButtonGroupClasses} ${vButtonGroupClasses}`);
    let counties = $state(data.counties);

    const goNextCountyId = () => {
        if (counties.length) {
            if (counties[0].sites.length === 1) {
                return counties[0].sites[0].siteId;
            } else {
                return counties[0].id;
            }
        }
        return -1;
    };

    const goNextTargetType = () => {
        if (counties.length && counties[0].sites.length === 1) {
            return GOTYPE.SITES;
        }
        return GOTYPE.COUNTYSITES;
    };

    let controlDisabled = $derived(counties.length === 0);
</script>

<!-- Counties -->
{#snippet head()}
    <div class="bg-red flex flex-col lg:flex-row justify-between">
        <GoBack targetId={-1} targetType={GOTYPE.HOME} controlBody="scale-90" />
        <GoNext targetId={goNextCountyId()} targetType={goNextTargetType()} controlBody="scale-90" {controlDisabled} />
        <CountySort bind:counties controlBody="scale-90" />
        <CountyFilter bind:vButtonGroupClasses controlBody="scale-90" />
    </div>
{/snippet}

{#snippet body()}
    <div class={buttonGroupClasses}>
        {#each counties as county}
            <button type="button" class={`${cButtonClasses} ${county.isMonitored ? 'group-[.hide-monitored]:hidden' : 'group-[.hide-unmonitored]:hidden'}`} onclick={() => (county.sites.length === 1 ? goto(`/api/sites/${county.sites[0].siteId}`) : goto(`/api/countysites/${county.id}`))}>
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
{/snippet}
<Container {head} {body} tail={null} />
