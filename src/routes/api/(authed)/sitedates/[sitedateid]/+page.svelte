<script lang="ts">
    /*-- Imports */
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { Accordion, AccordionItem, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { setContext } from 'svelte';
    import { formatDate, weekOfYearSince, convertFtoC } from '$lib/utils';
    import DataOptions from '$lib/components/datanavigation/DataOptions.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import YearWeek from '$lib/components/datanavigation/YearWeek.svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';
    import { goto } from '$app/navigation';

    /*-- -- Data -- */
    /*-- Exports */
    let {
        data,
        initialUseFarenheit = 0,
        accA = true,
        accB = false,
        accC = false,
        accD = false,
        accE = false,
        accF = false,
        accG = false,
        accH = false,
        accI = false,
        accJ = false,
    }: {
        data: any;
        initialUseFarenheit: number;
        accA: boolean;
        accB: boolean;
        accC: boolean;
        accD: boolean;
        accE: boolean;
        accF: boolean;
        accG: boolean;
        accH: boolean;
        accI: boolean;
        accJ: boolean;
    } = $props();

    /*-- Context */
    setContext('sites', data.sites);
    setContext('siteDates', data.siteDates);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    const cClassesObservation = 'card flex';

    /*-- Variables (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */
    //let currentSiteDate: SiteDateYear = data.siteDate;
    let useFarenheit: number = $state(0);
    let optAccA: boolean = $state(false);
    let optAccB: boolean = $state(false);
    let optAccC: boolean = $state(false);
    let optAccD: boolean = $state(false);
    let optAccE: boolean = $state(false);
    let optAccF: boolean = $state(false);
    let optAccG: boolean = $state(false);
    let optAccH: boolean = $state(false);
    let optAccI: boolean = $state(false);
    let optAccJ: boolean = $state(false);

    let showRecentEdits: boolean = $state(false);
    let showDeletedData: boolean = $state(false);

    /*-- Variables and objects */

    /*-- Run first stuff */
    //console.log('sd ##', data.siteDates);
    //console.log(data.siteDateSiteDates);
    //console.log(uniqueYears);
    //console.log(trackedWeeks);

    //console.log(data.siteDateObservations[0]);

    /*-- onMount, beforeUpdate, afterUpdate */
    $effect(() => {
        let x: string;

        x = localStorage?.useFarenheit;
        useFarenheit = x && x.length ? parseInt(x) : initialUseFarenheit;
        x = localStorage?.optAccA;
        optAccA = x && x.length ? x === 'true' : accA;
        x = localStorage?.optAccB;
        optAccB = x && x.length ? x === 'true' : accB;
        x = localStorage?.optAccC;
        optAccC = x && x.length ? x === 'true' : accC;
        x = localStorage?.optAccD;
        optAccD = x && x.length ? x === 'true' : accD;
        x = localStorage?.optAccE;
        optAccE = x && x.length ? x === 'true' : accE;
        x = localStorage?.optAccF;
        optAccF = x && x.length ? x === 'true' : accF;
        x = localStorage?.optAccG;
        optAccG = x && x.length ? x === 'true' : accG;
        x = localStorage?.optAccH;
        optAccH = x && x.length ? x === 'true' : accH;
        x = localStorage?.optAccI;
        optAccI = x && x.length ? x === 'true' : accI;
        x = localStorage?.optAccJ;
        optAccJ = x && x.length ? x === 'true' : accJ;

        x = localStorage?.showRecentEdits;
        if (x && x.length) {
            showRecentEdits = x === '1';
        }

        x = localStorage?.showDeletedData;
        if (x && x.length) {
            showDeletedData = x === '1';
        }
    });

    $effect(() => {
        localStorage.setItem('useFarenheit', useFarenheit.toString());
        localStorage.setItem('optAccA', optAccA.toString());
        localStorage.setItem('optAccB', optAccB.toString());
        localStorage.setItem('optAccC', optAccC.toString());
        localStorage.setItem('optAccD', optAccD.toString());
        localStorage.setItem('optAccE', optAccE.toString());
        localStorage.setItem('optAccF', optAccF.toString());
        localStorage.setItem('optAccG', optAccG.toString());
        localStorage.setItem('optAccH', optAccH.toString());
        localStorage.setItem('optAccI', optAccI.toString());
        localStorage.setItem('optAccJ', optAccJ.toString());

        localStorage.setItem('showRecentEdits', showRecentEdits ? '1' : '0');
        localStorage.setItem('showDeletedData', showDeletedData ? '1' : '0');
    });

    /*-- Handlers */
    function handleRadioGroupClick() {
        var ooo = document.getElementById('ftoc');
        console.log('was here', ooo?.getAttribute('open'));
        if (optAccB) {
            optAccB = false;
        }
        return true;
    }

    /*-- Methods */
    function addSiteDate() {
        goto(`/api/sitedates/new/${currentSiteId}`);
    }

    /*-- Reactives (functional) */
    let recordDate: Date = $state(new Date(data.siteDate.recordDate));
    let recordYear: number = $state(new Date(data.siteDate.recordDate).getFullYear());
    let recordWeek: number = $state(weekOfYearSince(new Date(data.siteDate.recordDate)));
    let recordSdoCount: number = $state(data.siteDate.siteDateObservations.filter((o: any) => showDeletedData || !o.deleted).length);

    let currentSiteId: number = $state(data.siteDate.siteId);

    let firstSdoId = $derived(recordSdoCount > 0 ? data.siteDate.siteDateObservations[0].siteDateObservationId : -1);

    // let startTemp = $derived(String(data.siteDate.startTemp));
    // let endTemp = $derived(String(data.siteDate.endTemp));

    $inspect(showRecentEdits);
    $inspect(showDeletedData);

    /*-- Other */
    let currentSiteDateId = $state(data.siteDate.siteDateId);
</script>

<YearWeek bind:year={recordYear} bind:week={recordWeek} bind:sdoCount={recordSdoCount} />
<DataOptions bind:showRecentEdits bind:showDeletedData />

<DoubledContainer basisLeft="basis-2/5" basisRight="basis-3/5">
    <svelte:fragment slot="leftHead">
        <h2 class="flex flex-row justify-between pb-2">
            <div class="overflow-hidden text-ellipsis text-nowrap w-80">{data.siteDate.siteName}</div>
            <div class="text-nowrap text-right">
                Record Date: {formatDate(recordDate.toISOString(), 'short', undefined)}
            </div>
        </h2>
        <hr />
    </svelte:fragment>

    <svelte:fragment slot="leftBody">
        <div>
            recorder: {data.siteDate.recorder}
        </div>
        <Accordion>
            <AccordionItem bind:open={optAccA}>
                <svelte:fragment slot="summary">Times</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4 flex flex-row">
                        <span class="basis-20 text-nowrap text-right">Start Time:</span>
                        <span class="pl-2 w-24 text-right">
                            {data.siteDate.startTime ? formatDate(new Date(data.siteDate.startTime).toISOString(), undefined, 'short') : ''}
                        </span>
                    </div>
                    <div class="pl-4 flex flex-row">
                        <span class="basis-20 text-nowrap text-right">End Time:</span>
                        <span class="pl-2 w-24 text-right">
                            {data.siteDate.endTime ? formatDate(new Date(data.siteDate.endTime).toISOString(), undefined, 'short') : ''}
                        </span>
                    </div>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem id="ftoc" bind:open={optAccB}>
                <svelte:fragment slot="summary">
                    <div class="flex space-x-4">
                        <span class="my-auto">Temperature</span>
                        <div class="scale-75 origin-right">
                            <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
                                <RadioItem onclick={handleRadioGroupClick} bind:group={useFarenheit} name="toggle-naming" value={1}>&deg;F</RadioItem>
                                <RadioItem onclick={handleRadioGroupClick} bind:group={useFarenheit} name="toggle-naming" value={0}>&deg;C</RadioItem>
                            </RadioGroup>
                        </div>
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Start Temp: {useFarenheit ? data.siteDate.startTemp : convertFtoC(data.siteDate.startTemp)}
                    </div>
                    <div class="pl-4">
                        End Temp: {useFarenheit ? data.siteDate.endTemp : convertFtoC(data.siteDate.endTemp)}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccC}>
                <svelte:fragment slot="summary">Cloud cover (&percnt;)</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Start Clouds: {data.siteDate.startClouds}
                    </div>
                    <div class="pl-4">
                        End Clouds: {data.siteDate.endClouds}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccD}>
                <svelte:fragment slot="summary">Wind</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Start Wind Dir: {data.siteDate.startWindDir}
                    </div>
                    <div class="pl-4">
                        End Wind Dir: {data.siteDate.endWindDir}
                    </div>
                    <div class="pl-4">
                        Start Wind MPH: {data.siteDate.startWindMPH}
                    </div>
                    <div class="pl-4">
                        End Wind MPH: {data.siteDate.endWindMPH}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccE}>
                <svelte:fragment slot="summary">Weather</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Weather 1: {data.siteDate.w1}
                    </div>
                    <div class="pl-4">
                        Weather 2: {data.siteDate.w2}
                    </div>
                    <div class="pl-4">
                        Weather 3: {data.siteDate.w3}
                    </div>
                    <div class="pl-4">
                        Weather 4: {data.siteDate.w4}
                    </div>
                    <div class="pl-4">
                        Weather 5: {data.siteDate.w5}
                    </div>
                    <div class="pl-4">
                        Weather 6: {data.siteDate.w6}
                    </div>
                    <div class="pl-4">
                        Weather 7: {data.siteDate.w7}
                    </div>
                    <div class="pl-4">
                        Weather 8: {data.siteDate.w8}
                    </div>
                    <div class="pl-4">
                        Weather 9: {data.siteDate.w9}
                    </div>
                    <div class="pl-4">
                        Weather 10: {data.siteDate.w10}
                    </div>
                    <div class="pl-4">
                        Weather 11: {data.siteDate.w11}
                    </div>
                    <div class="pl-4">
                        Weather 12: {data.siteDate.w12}
                    </div>
                    <div class="pl-4">
                        Weather 13: {data.siteDate.w13}
                    </div>
                    <div class="pl-4">
                        Weather 14: {data.siteDate.w14}
                    </div>
                    <div class="pl-4">
                        Weather 15: {data.siteDate.w15}
                    </div>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccF}>
                <svelte:fragment slot="summary">Larva food sources</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        lEsec1: {@html data.siteDate.lEsec1 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec2: {@html data.siteDate.lEsec2 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec3: {@html data.siteDate.lEsec3 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec4: {@html data.siteDate.lEsec4 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec5: {@html data.siteDate.lEsec5 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec6: {@html data.siteDate.lEsec6 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec7: {@html data.siteDate.lEsec7 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec8: {@html data.siteDate.lEsec8 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec9: {@html data.siteDate.lEsec9 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec10: {@html data.siteDate.lEsec10 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec11: {@html data.siteDate.lEsec11 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec12: {@html data.siteDate.lEsec12 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec13: {@html data.siteDate.lEsec13 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec14: {@html data.siteDate.lEsec14 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        lEsec15: {@html data.siteDate.lEsec15 ?? '&varnothing;'}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccG}>
                <svelte:fragment slot="summary">Larva</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Larva Ob A: {@html data.siteDate.larvaObA ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Larva Ob B: {@html data.siteDate.larvaObB ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Larva Ob C: {@html data.siteDate.larvaObC ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Larva Ob D: {@html data.siteDate.larvaObD ?? '&varnothing;'}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccH}>
                <svelte:fragment slot="summary">Energy/blooming</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Energy Source 1: {@html data.siteDate.energySource1 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Energy Source 2: {@html data.siteDate.energySource2 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Energy Source 3: {@html data.siteDate.energySource3 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Energy Source 4: {@html data.siteDate.energySource4 ?? '&varnothing;'}
                    </div>
                    <div class="pl-4">
                        Flowers in Bloom: {@html data.siteDate.flowersInBloom ?? '&varnothing;'}
                    </div></svelte:fragment>
            </AccordionItem>
            <div class="pl-4">
                Field Notes: {data.siteDate.fieldNotes ?? ''}
            </div>
            <AccordionItem bind:open={optAccI}>
                <svelte:fragment slot="summary">Change history</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Created By: {data.siteDate.createdBy.lastFirst ?? ''}
                    </div>
                    <div class="pl-4">
                        Created At: {data.siteDate.createdAt ? formatDate(new Date(data.siteDate.createdAt).toISOString(), 'medium', 'medium') : ''}
                    </div>
                    <div class="pl-4">
                        Updated By: {data.siteDate.updatedBy.lastFirst ?? ''}
                    </div>
                    <div class="pl-4">
                        Updated At: {data.siteDate.updatedAt ?? ''}
                    </div>
                    <div class="pl-4">
                        Confirm By: {data.siteDate.confirmBy.lastFirst ?? ''}
                    </div>
                    <div class="pl-4">
                        Confirm At: {data.siteDate.confirmAt ?? ''}
                    </div></svelte:fragment>
            </AccordionItem>
        </Accordion>
    </svelte:fragment>

    <svelte:fragment slot="rightBody">
        <div class="flex flex-row justify-between mb-2">
            <div class="flex flex-row">
                <div class="my-auto mr-4">{data.siteDate.siteName}</div>
                <GoBack targetId={data.siteDate.siteId} targetType={GOTYPE.SITES} controlBody="scale-90" />
                <GoNext targetId={firstSdoId} targetType={GOTYPE.SITEDATEOBSERVATIONS} targetIdSecondary={data.siteDate.siteId} controlBody="scale-90" controlDisabled={firstSdoId < 0} />
            </div>
            <div class="flex flex-row">
                <button type="button" class="btn" onclick={addSiteDate} title="Add new site date observation"><span class="text-success-400">✚</span>&nbsp;Add site date</button>
                <SiteDatePicker bind:currentSiteId bind:currentSiteDateId controlBody="scale-90" buttonLeft="" buttonRight="" buttonYear="" buttonWeek="" dropdownShowDate={false} dropdownPointers={false} heading={null} yearPrefix="" weekPrefix="" controlOuter="" prefixYear="" prefixWeek="" suffixYear="" suffixWeek="" popupInner="" popupStyles="" labelledby="" />
            </div>
            <!-- below version breaks -->
            <!--     <SiteDatePicker -->
            <!--         bind:currentSiteId -->
            <!--         bind:currentSiteDateId -->
            <!--         controlBody="scale-90" -->
            <!--         buttonLeft="!px-2" -->
            <!--         buttonRight="!px-2" -->
            <!--         buttonYear="w-28 px-0 md:px-1 lg:px-2" -->
            <!--         buttonWeek="w-24 px-0 md:px-1 lg:px-2" -->
            <!--         dropdownShowDate={false} -->
            <!--         dropdownPointers={false} -->
            <!--         heading={null} -->
            <!--         yearPrefix="Year:" -->
            <!--         weekPrefix="Week:" -->
            <!--         controlOuter="" -->
            <!--         prefixYear="" -->
            <!--         prefixWeek="" -->
            <!--         suffixYear="" -->
            <!--         suffixWeek="" -->
            <!--         popupInner="" -->
            <!--         popupStyles="" -->
            <!--         labelledby=""></SiteDatePicker> -->
        </div>

        <hr />
        <div class="mt-2">
            {#each data.siteDateObservations as siteDateObservation}
                <div
                    class={`
                    ${(() => {
                        let classes = 'hover:variant-soft-primary active:variant-filled-primary';
                        if (siteDateObservation.deleted) {
                            classes += showDeletedData ? cClassesObservation + ' line-through variant-ghost-error' : ' hidden';
                        } else if (showRecentEdits && siteDateObservation.updatedAt) {
                            let x = new Date();
                            x = new Date(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate() - 10);
                            classes += new Date(siteDateObservation.updatedAt).getTime() > x.getTime() ? cClassesObservation + ' variant-ghost-warning' : '';
                        }
                        return classes;
                    })()}`}>
                    <a href="/api/sitedateobservations/{siteDateObservation.siteDateObservationId}/{data.siteDate.siteId}" class="flex space-x-2 p-2">
                        <div class="w-4">
                            {#if siteDateObservation.confirmed}
                                <span class="text-success-800-100-token">✔</span>
                            {:else}
                                🔎
                            {/if}
                        </div>
                        <div class="w-56">{siteDateObservation.checklist.commonName ?? ''}</div>
                        <div class="w-56">{siteDateObservation.checklist.scientificName}</div>
                        <div class="w-16">total: {siteDateObservation.total}</div>
                    </a>
                </div>
            {/each}
        </div>
    </svelte:fragment>
</DoubledContainer>
