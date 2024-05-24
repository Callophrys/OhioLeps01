<script lang="ts">
    /* TODO: figure out what site statuses in info block was all about - this was never returned and return type and results will need to change */
    /* TODO: after back action from sdo the sdo picker should update its selection to last visited sdo */

    /*-- Imports */
    import type { SiteCountySiteDatesSiteStatuses } from '$lib/types.js';
    import type { SiteCountyState } from '$lib/types.js';
    import Container from '$lib/components/layouts/Container.svelte';
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import CountySite from '$lib/components/datanavigation/CountySite.svelte';
    import { setContext } from 'svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE, type SiteDateYearSdo } from '$lib/types.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    /*-- -- Data -- */
    /*-- Exports */
    let { data } = $props();

    /*-- Context */
    setContext('counties', data.counties);
    setContext('sites', data.sites);
    setContext('siteDates', data.site.siteDates);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Variables (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */

    /*-- Properties (functional) */
    let filterByCounty: boolean = $state(false);

    /*-- Variables and objects */
    /*-- Run first stuff */

    /***************************************************************/
    /* TODO - see about updating SDO list on site change
    /*        so SD picker udpates correctly (at all)
    /***************************************************************/

    /*-- onMount, beforeUpdate, afterUpdate */
    $effect(() => {
        console.log('effect (onMount) for filterByCounty');
        let x = localStorage?.filterByCounty;
        if (x && x.length) {
            filterByCounty = x === '1';
        }
    });

    $effect(() => {
        console.log('effect for saving filterByCounty');
        localStorage.setItem('filterByCounty', filterByCounty ? '1' : '0');
    });

    /*-- Handlers */
    /*-- Methods */
    function addSiteDate() {
        goto(`/api/sitedates/new/${currentSiteId}`);
    }

    /*-- Reactives (functional) */

    let currentCountyId: number = $state(data.site.countyId);
    let currentSiteId: number = $state(data.site.siteId);
    let currentSiteDateId: number = $state(data.site.siteDates.length ? data.site.siteDates[0].siteDateId : -1);
    $inspect(currentCountyId, currentSiteId, currentSiteDateId);

    let currentSite: SiteCountyState | undefined = $derived(data.sites.find((x) => x.siteId === currentSiteId));
    $inspect(currentSite);
    /*-- Other */

    // const updateCounty = () => {
    //     console.log('set currentCountyId');
    //     let cn = currentCounty?.countyNumber ?? -1;
    //     const county = data.counties.find((x) => x.id === currentCountyId);
    //     const site: any = (() => {
    //         if (cn < currentCounty.countyNumber) return allSites.find((x: any) => x.countyId === currentCountyId);
    //         return allSites.findLast((x: any) => x.countyId === currentCountyId);
    //     })();
    //     if (site) currentSiteId = site.siteId; // this could cause nesting and looping infinitely
    //     return county;
    // };

    // const updateSite = () => {
    //     console.log('set currentSiteId');
    //     const site: any = data.sites.find((x) => x.siteId === currentSiteId);
    //     let county = allCounties.find((x: any) => x.id === site.countyId);
    //     if (county) currentCountyId = county.id; // this could cause nesting and looping infinitely
    //     return site;
    // };

    // let currentCounty: any = $derived(updateCounty());
    // let currentSite: any = $derived(updateSite());
    // $inspect(currentCounty, currentSite);
</script>

<CountySite bind:county={data.site.county.name} bind:site={data.site.siteName} bind:filterByCounty />

{#snippet head()}
    <div class="flex flex-row justify-between gap-1 md:gap-2">
        <GoBack bind:targetId={currentCountyId} bind:targetType={GOTYPE.COUNTYSITES} targetIdSecondary={null} controlBody="scale-90" buttonCenter="" scriptCenter="" labelledby="" />
        <GoNext targetId={currentSiteDateId} targetType={GOTYPE.SITEDATES} targetIdSecondary={currentSiteId} controlBody="scale-90" controlDisabled={data.site.siteDates.length < 1} />
        <CountyPicker bind:currentCountyId bind:currentSiteId bind:filterByCounty />
        <SitePicker bind:currentCountyId bind:currentSiteId bind:currentSiteDateId bind:filterByCounty controlBody="scale-90" />
        <div class="flex flex-row">
            {#if $page.data?.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN')}
                <button type="button" class="btn" onclick={addSiteDate} title="Add new site date observation"><span class="text-success-400">✚</span>&nbsp;Add site date</button>
            {/if}
            <SiteDatePicker bind:currentSiteId bind:currentSiteDateId controlBody="scale-90" buttonLeft="" buttonRight="" buttonYear="" buttonWeek="" dropdownShowDate={false} dropdownPointers={true} heading={null} yearPrefix="" weekPrefix="" controlOuter="" prefixYear="" prefixWeek="" suffixYear="" suffixWeek="" popupInner="" popupStyles="" labelledby="" />
        </div>
    </div>

    <!-- <div class="w-1/2 text-right my-auto">Observations (year/week)</div> -->
    <!-- <div class="w-1/2"> -->
    <!--     <button class="btn variant-soft w-40 justify-between" use:popup={popupComboSiteDate}> -->
    <!--         <span class="capitalize">{comboboxValueSiteDate ? `${comboboxValueSiteDate.toString().slice(0, 4)} week ${comboboxValueSiteDate % 100}` : 'Year week'}</span> -->
    <!--         <span>↓</span> -->
    <!--     </button> -->
    <!-- </div> -->

    <!-- TODO: Make this change the County by alphabetical -->
    <!--       Need to filter Sites where sites must indicate as such -->
    <!--       If limit is reached then move loudly to next regions's worth of sites - if region is present -->
    <!--       Maybe create some option for user to ignore this -->
    <!---->
    <!--       Any change here should advance the downstream pickers and the -->
    <!--       current data - as long as there is no unchanged data - Prompt -->
    <!--       user about this -->

    <!-- TODO: Add Region picker -->
    <!--       Need to filter Counties where counties must indicate as such -->
    <!--       Maybe make region and admin level option -->
    <!---->
    <!--       Any change here should advance the downstream pickers and the -->
    <!--       current data - as long as there is no unchanged data - Prompt -->
    <!--       user about this -->

    <!-- <div class="basis-1/3 my-auto"> -->
    <!-- </div> -->
    <!-- <div class="basis-1/3 flex flex-row justify-center space-x-4"> -->
    <!-- </div> -->
    <!-- <div class="basis-1/3 my-auto text-right"> -->
    <!-- </div> -->
{/snippet}

{#snippet body()}
    <div class="max-w-[600px]">
        <div class="content">
            <div>siteName: {currentSite?.siteName ?? ''}</div>
            <div>county: {currentSite?.county.name ?? ''}</div>
            <div>township: {currentSite?.township ?? ''}</div>
            <div>locationZip: {currentSite?.locationZip ?? ''}</div>
            <div>siteAddress: {currentSite?.siteAddress ?? ''}</div>
            <div>siteAddress2: {currentSite?.siteAddress2 ?? ''}</div>
            <div>siteCity: {currentSite?.siteCity ?? ''}</div>
            <div>siteState: {currentSite?.siteState ?? ''}</div>
            <div>siteZip: {currentSite?.siteZip ?? ''}</div>
            <div>person: {currentSite?.person ?? ''}</div>
            <div>personAddress: {currentSite?.personAddress ?? ''}</div>
            <div>personAddress2: {currentSite?.personAddress2 ?? ''}</div>
            <div>personCity: {currentSite?.personCity ?? ''}</div>
            <div>personState: {currentSite?.personState ?? ''}</div>
            <div>personZip: {currentSite?.personZip ?? ''}</div>
            <div>personPhone: {currentSite?.personPhone ?? ''}</div>
            <div>peronsEmail: {currentSite?.personEmail ?? ''}</div>
            <div>latitudeStart: {currentSite?.latitudeStart ?? ''}</div>
            <div>latitudeEnd: {currentSite?.latitudeEnd ?? ''}</div>
            <div>longitudeStart: {currentSite?.longitudeStart ?? ''}</div>
            <div>longitudeEnd: {currentSite?.longitudeEnd ?? ''}</div>
            <div>altPerson: {currentSite?.altPerson ?? ''}</div>
            <div>altPersonAddress: {currentSite?.altPersonAddress ?? ''}</div>
            <div>altPersonAddress2: {currentSite?.altPersonAddress2 ?? ''}</div>
            <div>altPersonCity: {currentSite?.altPersonCity ?? ''}</div>
            <div>altPersonState: {currentSite?.altPersonState ?? ''}</div>
            <div>altPersonZip: {currentSite?.altPersonZip ?? ''}</div>
            <div>altPersonPhone: {currentSite?.altPersonPhone ?? ''}</div>
            <div>altPersonEmail: {currentSite?.altPersonEmail ?? ''}</div>
            <div>otherParticipants: {currentSite?.otherParticipants ?? ''}</div>
            <div>description: {currentSite?.description ?? ''}</div>
            <div>Statuses</div>
            <ul class="pl-4">
                <!--
                {#each currentSite?.siteStatuses as siteStatus}
                    <li>{siteStatus?.year}: {siteStatus.statusCode.description ?? ''}</li>
                {/each}
                -->
            </ul>
            <div>
                createdAt: {currentSite?.createdAt ?? ''}
            </div>
            <div>
                updated at {currentSite?.updatedAt ?? ''}
            </div>
        </div>
    </div>
{/snippet}

<Container {head} {body} tail={null} />
