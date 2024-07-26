<script lang="ts">
    /* TODO: figure out what site statuses in info block was all about - this was never returned and return type and results will need to change */
    /* TODO: after back action from sdo the sdo picker should update its selection to last visited sdo */

    /*-- Imports */
    import { GOTYPE, ROLE } from '$lib/types.js';
    import type { County, Section, Site, State } from '@prisma/client';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
    import type { SiteDateYear } from '$lib/types.js';
    import type { SiteCountyState, SiteCountySiteDatesSiteStatuses } from '$lib/types.js';
    import Container from '$lib/components/layouts/Container.svelte';
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
    import CountySite from '$lib/components/datanavigation/CountySite.svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import ModalSite from '$lib/components/ModalSite.svelte';
    import ModalSiteDate from '$lib/components/ModalSiteDate.svelte';
    import Papa from 'papaparse';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import { formatDate, weekOfYearSince, convertFtoC, convertMphToKm, isRecent, decodeWeather } from '$lib/utils';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { setContext } from 'svelte';

    async function fetchSiteData(siteId: number) {
        let sdpath = `/admin/${siteId}`;
        try {
            const response = await fetch(`${sdpath}`);
            const data = await response.json();
            return data.siteData;
        } catch (error) {
            console.error('Error fetching data:', error, 'from sdpath', sdpath);
        }
    }

    // https://www.basedash.com/blog/how-to-use-papaparse-with-typescript
    // https://www.papaparse.com/docs#json-to-csv
    async function exportToCSV() {
        try {
            // TODO: replace test json with return set from Prisma
            // TODO: figure out the upload-reverse
            //       Note upload will require a lot of data verification and cleaning code
            //
            const siteData = await fetchSiteData(currentSiteId);
            // console.log(siteData);
            // debugger;
            // const jsonD = JSON.stringify(data);

            // const csv = Papa.unparse(JSON.parse(jsonD), {
            const csv = Papa.unparse(siteData, {
                quotes: false,
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ',',
                header: true,
                newline: '\r\n',
                skipEmptyLines: false,
            });

            let csvData: string = '';
            csvData = csv;

            const csvContent = `data:text/csv;charset=utf-8,${csvData}`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link); // Required for Firefox
            link.click();
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    }

    /*-- -- Data -- */
    /*-- Exports */
    let { data } = $props();

    /*-- Context */
    setContext('counties', data.counties);

    // data.sites is type SiteCountySiteDatesSiteStatuses which is site, county, siteDates
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
    let unitTemp: string = $state('F');
    let unitSpeed: string = $state('M');
    let unitGps: string = $state('DMS'); // {DMS, DMM, DD}

    /*-- Run first stuff */
    const modalStore = getModalStore();

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

    $effect(() => {
        let x = localStorage?.useFarenheit;
        if (x) unitTemp = x;
        x = localStorage?.useMph;
        if (x) unitSpeed = x;
        x = localStorage?.unitGps;
        if (x) unitGps = x;
    });

    /*-- Handlers */
    /*-- Methods */
    //TODO: setup modal add-edit for a Site
    //TODO: fix site properties not saved on create

    function modalComponentSite(isNewRecord: boolean, unitGps: string, site: Site | null, countyId: number, counties: County[], stateId: number, states: State[]): void {
        const c: ModalComponent = { ref: ModalSite };
        const componentTitle = isNewRecord ? 'Add New Site' : `Edit Site - ${site?.siteName}`;
        const componentUrl = isNewRecord ? '../sites/-1?/createSite' : `../sites/${site?.id ?? '-1'}?/updateSite`;

        const componentValues = isNewRecord
            ? {
                  site: null,
                  siteId: -1,
                  countyId: countyId,
                  counties: data.counties,
                  stateId: stateId,
                  states: data.states,
                  unitGps: unitGps,
                  isNewRecord: isNewRecord,
              }
            : {
                  site: site,
                  siteId: site?.id ?? -1,
                  countyId: countyId,
                  counties: data.counties,
                  stateId: stateId,
                  states: data.states,
                  unitGps: unitGps,
                  isNewRecord: isNewRecord,
              };

        const modal: ModalSettings = {
            type: 'component',
            component: c,
            title: componentTitle,
            body: 'Complete the form below and then press submit.',
            value: componentValues,
            response: (r) => {
                if (typeof r === 'object') {
                    const formData = new FormData();
                    for (const [k, v] of Object.entries(r) as [string, any]) formData.append(k, v);

                    console.log('vv', r, componentUrl);

                    fetch(componentUrl, {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 200) {
                                const rdata = JSON.parse(data.data);
                                console.log('rdata:', rdata);
                                let dataIndex = rdata[0].data;
                                let valueIndex = rdata[dataIndex].siteId;
                                let siteId = rdata[valueIndex];
                                //TODO: Assure that SiteDatePicker updates.  The following goto + invalidateAll does
                                // not accomplish it.  Thought that udpating the bound currentSiteDateId would cause
                                // the SiteDatePicker to update itself.  Hmmm.
                                //currentSiteDateId = siteDateId;
                                //NOTE: verified that invalidateAll assure that browsed for data renders after update
                                goto('/api/sites/' + siteId, { invalidateAll: true });
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            },
        };
        modalStore.trigger(modal);
    }

    function modalComponentSiteDate(isNewRecord: boolean, unitTemp: string, unitSpeed: string, siteDate: SiteDateYear | null, siteId: number): void {
        const c: ModalComponent = { ref: ModalSiteDate };
        const componentTitle = isNewRecord ? 'Add New Date Record' : `Edit Date Record - ${formatDate(siteDate?.recordDate ? new Date(siteDate.recordDate).toISOString() : new Date().toISOString())}, ${siteDate?.recordDate}`;
        const componentUrl = isNewRecord ? '../sitedates/-1?/createSiteDate' : `../sitedates/${siteDate?.id}?/updateSiteDate`;

        const componentValues = isNewRecord
            ? {
                  siteId: siteId,
                  siteDate: null,
                  useMph: unitSpeed,
                  useFarenheit: unitTemp,
                  isNewRecord: isNewRecord,
              }
            : {
                  siteId: siteId,
                  siteDate: siteDate?.recordDate,
                  useMph: unitSpeed,
                  useFarenheit: unitTemp,
                  isNewRecord: isNewRecord,
              };

        const modal: ModalSettings = {
            type: 'component',
            component: c,
            title: componentTitle,
            body: 'Complete the form below and then press submit.',
            value: componentValues,
            response: (r) => {
                if (typeof r === 'object') {
                    const formData = new FormData();
                    for (const [k, v] of Object.entries(r) as [string, any]) formData.append(k, v);

                    fetch(componentUrl, {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 200) {
                                const rdata = JSON.parse(data.data);
                                console.log('rdata:', rdata);
                                let siteDateId = rdata[rdata[0].siteDateId];
                                //TODO: Assure that SiteDatePicker updates.  The following goto + invalidateAll does
                                // not accomplish it.  Thought that udpating the bound currentSiteDateId would cause
                                // the SiteDatePicker to update itself.  Hmmm.
                                //currentSiteDateId = siteDateId;
                                //NOTE: verified that invalidateAll assure that browsed for data renders after update
                                goto('/api/sitedates/' + siteDateId, { invalidateAll: true });
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            },
        };
        modalStore.trigger(modal);
    }

    /*-- Reactives (functional) */

    let currentCountyId: number = $state(data.site.countyId);
    let currentStateId: number = $state(data.site.stateId);

    let currentSiteId: number = $state(data.site.id);
    let currentSiteDate: SiteDateYear | null = $state(data.site.siteDates.length ? data.site.siteDates[0] : null);
    let currentSiteDateId: number = $state(data.site.siteDates.length ? data.site.siteDates[0].id : -1);
    // $inspect(currentCountyId, currentSiteId, currentSiteDateId);

    let currentSite: SiteCountyState | undefined = $derived(data.sites.find((x) => x.id === currentSiteId));
    // $inspect(currentSite);

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
        <div class="flex flex-row">
            <GoBack bind:targetId={currentCountyId} bind:targetType={GOTYPE.COUNTYSITES} targetIdSecondary={null} controlBody="scale-90" buttonCenter="" scriptCenter="" labelledby="" />
            <GoNext targetId={currentSiteDateId} targetType={GOTYPE.SITEDATES} targetIdSecondary={currentSiteId} controlBody="scale-90" controlDisabled={data.site.siteDates.length < 1} buttonCenter="" scriptCenter="" labelledby="" />
            <CountyPicker bind:currentCountyId bind:currentSiteId bind:filterByCounty controlBody="scale-90 -translate-x-2" heading={null} dropdownPointers={null} controlOuter={null} buttonLeft={null} buttonCenter={null} buttonRight={null} prefixCenter={null} scriptCenter={null} suffixCenter={null} popupInner={null} popupStyles={null} labelledby={null} />
            <SitePicker bind:currentCountyId bind:currentSiteId bind:currentSiteDateId bind:filterByCounty dropdownPointers={true} heading={null} controlOuter="" controlBody="scale-90 -translate-x-8" buttonLeft="" buttonCenter="" buttonRight="" scriptCenter="" suffixCenter="" popupInner="" popupStyles="" labelledby="Selectsite-date" />
        </div>
        <SiteDatePicker bind:currentSiteId bind:currentSiteDateId controlBody="scale-90" buttonLeft="" buttonRight="" buttonYear="" buttonWeek="" dropdownShowDate={false} dropdownPointers={true} heading={null} yearPrefix="" weekPrefix="" controlOuter="" prefixYear="" prefixWeek="" suffixYear="" suffixWeek="" popupInner="" popupStyles="" labelledby="" />
    </div>

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
    <div class="w-full flex flex-row justify-between">
        <div class="content space-y-2">
            <div>
                <div>Site Name: {currentSite?.siteName ?? ''}</div>
                <div class="pl-4">
                    <div>County: {currentSite?.county.name ?? ''}</div>
                    <div>Township: {currentSite?.township ?? ''}</div>
                    <div>Location Zip: {currentSite?.locationZip ?? ''}</div>
                </div>
            </div>

            <div>
                <div>Site Address</div>
                <div class="pl-4">
                    <div>Street Address: {currentSite?.siteAddress ?? ''}</div>
                    {#if currentSite?.siteAddress2}
                        <div>Street Address2: {currentSite.siteAddress2}</div>
                    {/if}
                    <div>City: {currentSite?.siteCity ?? ''}</div>
                    <div>State: {currentSite?.siteState ?? ''}</div>
                    <div>Zip: {currentSite?.siteZip ?? ''}</div>
                </div>
            </div>

            <div>
                <div>Person: {currentSite?.person ?? ''}</div>
                {#if $page.data?.user && ($page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN)}
                    <div class="pl-4">
                        <div>Address: {currentSite?.personAddress ?? ''}</div>
                        {#if currentSite?.personAddress2}
                            <div>Address2: {currentSite?.personAddress2 ?? ''}</div>
                        {/if}
                        <div>City: {currentSite?.personCity ?? ''}</div>
                        <div>State: {currentSite?.personState ?? ''}</div>
                        <div>Zip: {currentSite?.personZip ?? ''}</div>
                        <div>Phone: {currentSite?.personPhone ?? ''}</div>
                        <div>Email: {currentSite?.personEmail ?? ''}</div>
                    </div>
                {/if}
            </div>

            <div>
                <div>Geolocation</div>
                <div class="pl-4">
                    <div>latitudeStart: {currentSite?.latitudeStart ?? ''}</div>
                    <div>latitudeEnd: {currentSite?.latitudeEnd ?? ''}</div>
                    <div>longitudeStart: {currentSite?.longitudeStart ?? ''}</div>
                    <div>longitudeEnd: {currentSite?.longitudeEnd ?? ''}</div>
                </div>
            </div>

            <div>
                <div>Alternate Person: {currentSite?.altPerson ?? ''}</div>
                {#if currentSite?.altPerson && $page.data?.user && ($page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN)}
                    <div class="pl-4">
                        <div>Address: {currentSite?.altPersonAddress ?? ''}</div>
                        {#if currentSite?.altPersonAddress2}
                            <div>Address2: {currentSite?.altPersonAddress2 ?? ''}</div>
                        {/if}
                        <div>City: {currentSite?.altPersonCity ?? ''}</div>
                        <div>State: {currentSite?.altPersonState ?? ''}</div>
                        <div>Zip: {currentSite?.altPersonZip ?? ''}</div>
                        <div>Phone: {currentSite?.altPersonPhone ?? ''}</div>
                        <div>Email: {currentSite?.altPersonEmail ?? ''}</div>
                    </div>
                {/if}
            </div>

            <div>
                <div>Other Participants: {currentSite?.otherParticipants ?? ''}</div>
                <div>Description: {currentSite?.description ?? ''}</div>
            </div>

            <div>
                <div>Statuses</div>
                <ul class="pl-4">
                    {#each data.site.siteStatuses as siteStatus}
                        <li>{siteStatus.year}: {siteStatus.statusCode.description ?? ''}</li>
                    {/each}
                </ul>
            </div>

            <div>
                <div>Sections Available</div>
                <ul class="pl-4">
                    {#each Array.from(data.site.sections).sort((a: Section, b: Section) => a.sectionIndex - b.sectionIndex) as section}
                        <li>{section.labelLong}: {section.description ?? ''}</li>
                    {/each}
                </ul>
            </div>

            {#if $page.data?.user && ($page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN || $page.data.user.role === ROLE.REVIEWER)}
                <div>
                    <div>Change History</div>
                    <div class="pl-4 flex flex-row space-x-8">
                        <div>
                            <div>
                                Created at: {data.site?.createdAt ? formatDate(new Date(data.site.createdAt).toISOString(), 'medium', 'short') : ''}
                            </div>
                            <div>
                                Created by: {data.site?.createdBy?.lastFirst ?? ''}
                            </div>
                        </div>
                        <div>
                            <div>
                                Last Updated at: {data.site?.updatedAt ? formatDate(new Date(data.site.updatedAt).toISOString(), 'medium', 'short') : ''}
                            </div>
                            <div>
                                Last Updated by: {data.site.updatedBy?.lastFirst ?? ''}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div class="mr-4 flex flex-col md:flex-row space-x-2">
            {#if $page.data?.user}
                {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN'}
                    <button type="button" class="btn h-10 variant-soft" onclick={() => modalComponentSite(true, unitGps, null, currentCountyId, data.counties, currentStateId, data.states)} title="Add a new site"><span class="text-success-400">✚</span>&nbsp;Add Site</button>
                    <button type="button" class="btn h-10 variant-soft" onclick={() => modalComponentSite(false, unitGps, data.site, currentCountyId, data.counties, currentStateId, data.states)} title="for observations"><span class="text-success-400">✚</span>&nbsp;Edit Site</button>
                {/if}
                {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ENTRY'}
                    <button type="button" class="btn h-10 variant-soft" onclick={() => modalComponentSiteDate(true, unitTemp, unitSpeed, currentSiteDate, currentSiteId)} title="Add new date record for observations"><span class="text-success-400">✚</span>&nbsp;Add observations date</button>
                {/if}
            {/if}
            <button type="button" class="btn h-10 variant-soft" onclick={exportToCSV}><span class="text-success-400">✚</span>&nbsp;Export to CSV</button>
        </div>
    </div>
{/snippet}

<Container {head} {body} bodyClasses="overflow-y-auto" tail={null} />
