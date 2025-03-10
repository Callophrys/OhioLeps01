<script lang="ts">
    import { GOTYPE } from "$lib/types.js";
    import type { CssClasses } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { setContext } from "svelte";
    import Container from "$lib/components/layouts/Container.svelte";
    import GoBack from "$lib/components/datanavigation/GoBack.svelte";
    import GoNext from "$lib/components/datanavigation/GoNext.svelte";
    import CountyFilter from "$lib/components/counties/countyFilter.svelte";
    import CountySort from "$lib/components/counties/countySort.svelte";

    let { data } = $props();
    setContext("counties", data.counties);

    const cButtonGroupClasses = "flex flex-wrap gap-2";
    const cButtonClasses =
        "btn w-56 flex flex-col variant-outline-primary hover:variant-ghost-primary";

    let vButtonGroupClasses: CssClasses = $state("");

    let buttonGroupClasses = $derived(
        `${cButtonGroupClasses} ${vButtonGroupClasses}`,
    );
    let counties = $state(data.counties);

    const goNextCountyId = () => {
        if (counties.length) {
            if (counties[0].sites.length === 1) {
                return counties[0].sites[0].id;
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
    // const cClassesElementEins = "my-auto before:content-['Counties:'] before:lg:content-['County_count:']";
</script>

<div class="text-sm fixed top-[102px] pl-8">
    <span class="before:content-['County_count:']"></span>
    <span>{data.counties.length}</span>
</div>

<div class="text-sm fixed top-[102px] pl-40">
    <span class="before:content-['Monitored_counties:']"></span>
    <span>{data.counties.filter((c) => c.isMonitored).length}</span>
</div>

<div class="text-sm fixed top-[102px] pl-80">
    <span class="before:content-['Unmonitored_counties:']"></span>
    <span>{data.counties.filter((c) => !c.isMonitored).length}</span>
</div>

<!-- Counties -->
{#snippet head()}
    <div class="bg-red flex flex-col lg:flex-row justify-between">
        <div class="flex flex-row">
            <GoBack
                targetId={-1}
                targetIdSecondary={null}
                targetType={GOTYPE.HOME}
                controlBody="scale-90"
                buttonCenter=""
                scriptCenter=""
                labelledby=""
            />
            <GoNext
                targetId={goNextCountyId()}
                targetIdSecondary={-1}
                targetType={goNextTargetType()}
                controlBody="scale-90"
                {controlDisabled}
                buttonCenter=""
                scriptCenter=""
                labelledby=""
            />
        </div>
        <CountySort
            bind:counties
            controlBody="scale-90 origin-left"
            elementZwei=""
            elementDrei=""
        />
        <CountyFilter
            bind:vButtonGroupClasses
            controlBody="scale-90 origin-left"
            elementZwei=""
            elementDrei=""
        />
    </div>
{/snippet}

{#snippet body()}
    <div class={buttonGroupClasses}>
        {#each counties as county}
            <button
                type="button"
                class={`${cButtonClasses} ${county.isMonitored ? "group-[.hide-monitored]:hidden" : "group-[.hide-unmonitored]:hidden"}`}
                onclick={() =>
                    county.sites.length === 1
                        ? goto(`/api/site/${county.sites[0].id}`)
                        : goto(`/api/countysites/${county.id}`)}
            >
                <div class="w-full text-left">🌎 {county.name}</div>
                <div class="flex flex-row gap-4">
                    <div class="">{county.stateRegion.name}</div>
                    <div class="">{county.state.name}</div>
                    <div class="">
                        {county.sites.length}
                        {county.sites.length !== 1 ? "sites" : "site"}
                    </div>
                </div>
            </button>
        {/each}
    </div>
{/snippet}

<Container {head} {body} bodyClasses="overflow-y-auto" tail={null} />
