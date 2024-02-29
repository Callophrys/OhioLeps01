<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { compareNumeric, compareYearWeek, formatDate, weekOfYearSince, convertFtoC } from '$lib/utils';
    import { afterUpdate, onMount } from 'svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { dateTracking, dateTrackingSet } from '$lib/types.js';
    import { setContext } from 'svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import { isNullOrWhiteSpace } from '$lib/utils.js';

    export let data;
    setContext('sites', data.sites);
    setContext('siteDates', data.siteDates);

    export let initialUseFarenheit: number = 0;
    export let accA = true;
    export let accB = false;
    export let accC = false;
    export let accD = false;
    export let accE = false;
    export let accF = false;
    export let accG = false;
    export let accH = false;
    export let accI = false;
    export let accJ = false;

    onMount(() => {
        let x: string = localStorage?.useFarenheit;
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
    });

    afterUpdate(() => {
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
    });

    $: foo = optAccB;

    function handleRadioGroupClick(event: any) {
        var ooo = document.getElementById('ftoc');
        console.log('was here', ooo?.getAttribute('open'));
        if (optAccB) {
            optAccB = false;
        }
        return true;
        /*
        var ooo = document.getElementById('ftoc');
        console.log('was here', ooo?.getAttribute('aria-expanded'));
        if (ooo?.getAttribute('aria-expanded') === 'true') {
            ooo.click();
        } else {
            return false;
        }
        */
    }

    function handleClick(event: any) {
        event.preventDefault();
        //console.log('/api/sitedates/' + event.currentTarget.value);
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + event.currentTarget.value);
        }
    }

    function handleClickPrior(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId);
        if (idx > 0) {
            goto('/api/sitedates/' + trackedWeeks[idx - 1].siteDateId);
        }
    }

    function handleClickNext(event: any) {
        let idx = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId);
        if (idx < trackedWeeks.length - 1) {
            goto('/api/sitedates/' + trackedWeeks[idx + 1].siteDateId);
        }
    }

    let startTemp: string;
    let endTemp: string;

    let useFarenheit: number;
    let optAccA: boolean;
    let optAccB: boolean;
    let optAccC: boolean;
    let optAccD: boolean;
    let optAccE: boolean;
    let optAccF: boolean;
    let optAccG: boolean;
    let optAccH: boolean;
    let optAccI: boolean;
    let optAccJ: boolean;

    let recordSiteId: number;
    let recordDate: Date;
    let recordYear: number;
    let recordWeek: number;
    let y: dateTrackingSet;
    let w: any;

    //console.log(data.siteDateSiteDates);
    const allYears = Array.from(data.siteDates).map((y) => new Date(y.recordDate).getFullYear());
    const uniqueYears = [...new Set(allYears)].sort(compareNumeric);

    const trackedWeeks: dateTracking[] = Array.from(data.siteDates)
        .map<dateTracking>((w) => ({
            siteDateId: w.siteDateId,
            year: new Date(w.recordDate).getFullYear(),
            week: weekOfYearSince(new Date(w.recordDate)),
            recordDate: new Date(w.recordDate),
            fDate: formatDate(new Date(w.recordDate).toISOString()),
        }))
        .sort(compareYearWeek);

    $: nextEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) < trackedWeeks.length - 1;
    console.log('nextEnabled', nextEnabled);
    $: prevEnabled = trackedWeeks.findIndex((x: dateTracking) => x.siteDateId === recordSiteId) > 0;
    console.log('prevEnabled', prevEnabled);

    $: recordDate = new Date(data.siteDate.recordDate);
    $: recordYear = new Date(data.siteDate.recordDate).getFullYear();
    $: recordWeek = weekOfYearSince(new Date(data.siteDate.recordDate));
    $: recordSiteId = data.siteDate.siteDateId;

    $: startTemp = String(data.siteDate.startTemp);
    $: endTemp = String(data.siteDate.endTemp);

    //console.log(uniqueYears);
    //console.log(trackedWeeks);

    //console.log(data.siteDateObservations[0]);
</script>

<DoubledContainer basisLeft="basis-2/5" basisRight="basis-3/5">
    <svelte:fragment slot="leftHead">
        <h2 class="flex flex-row justify-between pb-2">
            <div>{data.siteDate.siteName}</div>
            <div>
                Record Date: {formatDate(recordDate.toISOString(), 'medium', undefined)}
            </div>
        </h2>
        <hr />
        <div class="flex flex-row justify-between space-x-2">
            <div>
                year: {data.siteDate.year}&nbsp;&nbsp;week: {data.siteDate.week}
            </div>
            <div class="text-warning-600 text-wrap my-auto">Per data entry 'year' and 'week' fields</div>
        </div>
        <!-- Year and week dropdowns -->
        <div class="flex flex-row space-x-2 pb-2">
            <div>
                <select class="select w-28" bind:value={y} on:blur={() => ([w] = y.children)}>
                    {#each uniqueYears as year}
                        <option
                            value={{
                                id: year,
                                children: [...trackedWeeks.filter((z) => z.year === year)],
                            }}>{year}</option>
                    {/each}
                </select>
            </div>

            <div>
                {#if y}<select class="select w-36" bind:value={w} on:change={handleClick}>
                        {#each y.children as dateTrackingItem}
                            <option value={dateTrackingItem.siteDateId}>{dateTrackingItem.week} - {formatDate(dateTrackingItem.recordDate.toISOString())}</option>
                        {/each}
                    </select>{/if}
            </div>

            <div class="text-warning-600 text-wrap my-auto">Calculated from 'record date' field</div>
        </div>
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
                                <RadioItem on:click={handleRadioGroupClick} bind:group={useFarenheit} name="toggle-naming" value={1}>&deg;F</RadioItem>
                                <RadioItem on:click={handleRadioGroupClick} bind:group={useFarenheit} name="toggle-naming" value={0}>&degC</RadioItem>
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
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 2: {data.siteDate.w2}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 3: {data.siteDate.w3}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 4: {data.siteDate.w4}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 5: {data.siteDate.w5}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 6: {data.siteDate.w6}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 7: {data.siteDate.w7}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 8: {data.siteDate.w8}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 9: {data.siteDate.w9}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 10: {data.siteDate.w10}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 11: {data.siteDate.w11}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 12: {data.siteDate.w12}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 13: {data.siteDate.w13}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 14: {data.siteDate.w14}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                    <div class="pl-4">
                        Weather 15: {data.siteDate.w15}
                        <span class="bg-slate-800">Weather @default(U)</span>
                    </div>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccF}>
                <svelte:fragment slot="summary">Larva food sources</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        lEsec1: {data.siteDate.lEsec1}
                    </div>
                    <div class="pl-4">
                        lEsec2: {data.siteDate.lEsec2}
                    </div>
                    <div class="pl-4">
                        lEsec3: {data.siteDate.lEsec3}
                    </div>
                    <div class="pl-4">
                        lEsec4: {data.siteDate.lEsec4}
                    </div>
                    <div class="pl-4">
                        lEsec5: {data.siteDate.lEsec5}
                    </div>
                    <div class="pl-4">
                        lEsec6: {data.siteDate.lEsec6}
                    </div>
                    <div class="pl-4">
                        lEsec7: {data.siteDate.lEsec7}
                    </div>
                    <div class="pl-4">
                        lEsec8: {data.siteDate.lEsec8}
                    </div>
                    <div class="pl-4">
                        lEsec9: {data.siteDate.lEsec9}
                    </div>
                    <div class="pl-4">
                        lEsec10: {data.siteDate.lEsec10}
                    </div>
                    <div class="pl-4">
                        lEsec11: {data.siteDate.lEsec11}
                    </div>
                    <div class="pl-4">
                        lEsec12: {data.siteDate.lEsec12}
                    </div>
                    <div class="pl-4">
                        lEsec13: {data.siteDate.lEsec13}
                    </div>
                    <div class="pl-4">
                        lEsec14: {data.siteDate.lEsec14}
                    </div>
                    <div class="pl-4">
                        lEsec15: {data.siteDate.lEsec15}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccG}>
                <svelte:fragment slot="summary">Larva</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Larva Ob A: {data.siteDate.larvaObA ?? ''}
                    </div>
                    <div class="pl-4">
                        Larva Ob B: {data.siteDate.larvaObB ?? ''}
                    </div>
                    <div class="pl-4">
                        Larva Ob C: {data.siteDate.larvaObC ?? ''}
                    </div>
                    <div class="pl-4">
                        Larva Ob D: {data.siteDate.larvaObD ?? ''}
                    </div></svelte:fragment>
            </AccordionItem>
            <AccordionItem bind:open={optAccH}>
                <svelte:fragment slot="summary">Energy/blooming</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="pl-4">
                        Energy Source 1: {data.siteDate.energySource1 ?? ''}
                    </div>
                    <div class="pl-4">
                        Energy Source 2: {data.siteDate.energySource2 ?? ''}
                    </div>
                    <div class="pl-4">
                        Energy Source 3: {data.siteDate.energySource3 ?? ''}
                    </div>
                    <div class="pl-4">
                        Energy Source 4: {data.siteDate.energySource4 ?? ''}
                    </div>
                    <div class="pl-4">
                        Flowers in Bloom: {data.siteDate.flowersInBloom ?? ''}
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
            <div class="my-auto">{data.siteDate.siteName}</div>
            <SiteDatePicker bind:currentSiteId={data.siteDate.siteId} bind:currentSiteDateId={data.siteDate.siteDateId} controlBody="scale-90" buttonLeft="!px-2" buttonRight="!px-2" dropdownShowDate={false} dropdownPointers={false}>
                <svelte:fragment slot="prefixYear">Year:</svelte:fragment>
                <svelte:fragment slot="prefixWeek">Week:</svelte:fragment>
            </SiteDatePicker>
            <div class="btn-group variant-soft scale-90 my-auto">
                <button on:click={handleClickPrior}>◀</button>
                <button class="w-24">Year: {recordYear}</button>
                <button class="w-24">Week: {recordWeek}</button>
                <button on:click={handleClickNext}>▶</button>
            </div>
        </div>

        <hr />
        <div class="mt-2">
            {#each data.siteDateObservations as siteDateObservation}
                <div class={`card flex ${siteDateObservation.deleted ? 'line-through variant-ghost-error' : ''}`}>
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
