<script lang="ts">
    /*-- Imports */
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import CountySite from '$lib/components/datanavigation/CountySite.svelte';
    import { setContext } from 'svelte';
    import { afterUpdate, onMount } from 'svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    /*-- -- Data -- */
    /*-- Exports */
    export let data;

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
    let filterByCounty: boolean = false;

    /*-- Variables and objects */
    /*-- Run first stuff */

    /*-- onMount, beforeUpdate, afterUpdate */
    onMount(() => {
        let x = localStorage?.filterByCounty;
        if (x && x.length) {
            filterByCounty = x === '1';
        }
    });

    // console.log(data.site);
    afterUpdate(() => {
        localStorage.setItem('filterByCounty', filterByCounty ? '1' : '0');
    });

    /*-- Handlers */
    /*-- Methods */

    /*-- Reactives (functional) */
    $: currentCountyId = data.site.countyId;
    $: currentSiteId = data.site.siteId;
    $: currentSiteDateId = data.site.siteDates.length ? data.site.siteDates[0].siteDateId : -1;

    /*-- Other */
</script>

<CountySite county={data.site.county.name} site={data.site.siteName} bind:filterByCounty />

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="flex flex-row justify-between gap-1 md:gap-2">
            <GoBack targetId={currentCountyId} targetType={GOTYPE.COUNTYSITES} controlBody="scale-90" />
            <GoNext targetId={currentSiteDateId} targetType={GOTYPE.SITEDATES} controlBody="scale-90" />
            <CountyPicker {currentCountyId} {filterByCounty} controlBody="scale-90" />
            <!-- TODO: Filter sites to selected country -->
            <SitePicker {currentSiteId} {filterByCounty} controlBody="scale-90" />
            <SiteDatePicker bind:currentSiteId bind:currentSiteDateId controlBody="scale-90" buttonLeft="" buttonRight="" buttonYear="" buttonWeek="" dropdownShowDate={false} dropdownPointers={false} heading={null} yearPrefix="" weekPrefix="" controlOuter="" prefixYear="" prefixWeek="" suffixYear="" suffixWeek="" popupInner="" popupStyles="" labelledby=""></SiteDatePicker>
        </div>

        <!-- TODO: Make this change the site by alphabetical -->
        <!--       Need to filter Observations where observations must indicate as such -->
        <!--       If limit is reached then move loudly to next county's worth of sites -->
        <!---->
        <!--       Any change here should advance the downstream pickers and the -->
        <!--       current data - as long as there is no unchanged data - Prompt -->
        <!--       user about this -->

        <!-- <div class="w-1/2 text-right my-auto">Observations (year/week)</div> -->
        <!-- <div class="w-1/2"> -->
        <!--     <button class="btn variant-soft w-40 justify-between" use:popup={popupComboboxSiteDate}> -->
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
    </svelte:fragment>

    <svelte:fragment slot="standardBody">
        <div class="max-w-[600px]">
            <div class="content">
                <div>siteName: {data.site.siteName ?? ''}</div>
                <div>county: {data.site.county.name ?? ''}</div>
                <div>township: {data.site.township ?? ''}</div>
                <div>locationZip: {data.site.locationZip ?? ''}</div>
                <div>siteAddress: {data.site.siteAddress ?? ''}</div>
                <div>siteAddress2: {data.site.siteAddress2 ?? ''}</div>
                <div>siteCityStateZip: {data.site.siteCityStateZip ?? ''}</div>
                <div>person: {data.site.person ?? ''}</div>
                <div>address: {data.site.address ?? ''}</div>
                <div>address2: {data.site.address2 ?? ''}</div>
                <div>cityStateZip: {data.site.cityStateZip ?? ''}</div>
                <div>phone: {data.site.phone ?? ''}</div>
                <div>email: {data.site.email ?? ''}</div>
                <div>latitudeStart: {data.site.latitudeStart ?? ''}</div>
                <div>latitudeEnd: {data.site.latitudeEnd ?? ''}</div>
                <div>longitudeStart: {data.site.longitudeStart ?? ''}</div>
                <div>longitudeEnd: {data.site.longitudeEnd ?? ''}</div>
                <div>altPerson: {data.site.altPerson ?? ''}</div>
                <div>altAddress: {data.site.altAddress ?? ''}</div>
                <div>altAddress2: {data.site.altAddress2 ?? ''}</div>
                <div>altCityStateZip: {data.site.altCityStateZip ?? ''}</div>
                <div>altPhone: {data.site.altPhone ?? ''}</div>
                <div>altEmail: {data.site.altEmail ?? ''}</div>
                <div>otherParticipants: {data.site.otherParticipants ?? ''}</div>
                <div>description: {data.site.description ?? ''}</div>
                <div>Statuses</div>
                <ul class="pl-4">
                    {#each data.site.siteStatuses as siteStatus}
                        <li>{siteStatus.year}: {siteStatus.statusCode.description ?? ''}</li>
                    {/each}
                </ul>
                <div>
                    createdAt: {data.site.createdAt ?? ''}
                </div>
                <div>
                    updated at {data.site.updatedAt ?? ''}
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
