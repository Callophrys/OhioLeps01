<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { formatDate } from '$lib/utils';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    export let data;

    function toggleTempScale(e: any) {
        useF = !useF;
        if (useF) {
            startTemp = String(data.siteDate.startTemp);
            endTemp = String(data.siteDate.endTemp);
        } else {
            startTemp = String(
                data.siteDate.startTemp ? Math.floor(((data.siteDate.startTemp - 32) * 5) / 9) : ''
            );
            endTemp = String(
                data.siteDate.endTemp ? Math.floor(((data.siteDate.endTemp - 32) * 5) / 9) : ''
            );
        }
    }

    function daysIntoYear(date: Date) {
        return (
            (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
                Date.UTC(date.getFullYear(), 0, 0)) /
            24 /
            60 /
            60 /
            1000
        );
    }

    function weekSince(date: Date) {
        let x = new Date(date.getFullYear(), 3, 1);
        let daysPassed = (date.getTime() - x.getTime()) / 24 / 60 / 60 / 1000;
        return 1 + Math.floor(daysPassed / 7);
    }

    let startTemp: string;
    let endTemp: string;
    let useF = true;
    $: startTemp = String(data.siteDate.startTemp);
    $: endTemp = String(data.siteDate.endTemp);

    console.log(data.siteRecordDates);
    const yrs = Array.from(data.siteRecordDates).map((y) => new Date(y.recordDate).getFullYear());
    const years = [...new Set(yrs)];
    const weeks = Array.from(data.siteRecordDates).map((w) => ({
        siteDateId: w.siteDateId,
        year: new Date(w.recordDate).getFullYear(),
        week: weekSince(new Date(w.recordDate)),
    }));
    console.log(years);
    console.log(weeks);

    //console.log(data.siteObservations[0]);
</script>

<DoubledContainer basisLeft="basis-2/5" basisRight="basis-3/5">
    <svelte:fragment slot="left">
        <h2>{data.siteDate.site.siteName}</h2>
        <hr />
        <div>
            <div class="flex flex-row justify-between">
                <div>
                    year:{data.siteDate.year}&nbsp;&nbsp;week: {data.siteDate.week}
                </div>
                <div>
                    Record Date: {formatDate(
                        new Date(data.siteDate.recordDate).toISOString(),
                        'medium',
                        undefined
                    )}
                </div>
            </div>
            <select>
                {#each years as year}
                    <option>{year}</option>
                {/each}
            </select>
            <select>
                {#each weeks as week}
                    <option value={week.siteDateId}>{week.year} {week.week}</option>
                {/each}
            </select>
            <div>
                recorder: {data.siteDate.recorder}
            </div>
            <Accordion>
                <AccordionItem open>
                    <svelte:fragment slot="summary">Times</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            startTime: {data.siteDate.startTime}
                        </div>
                        <div class="pl-4">
                            endTime: {data.siteDate.endTime}
                        </div>
                    </svelte:fragment>
                </AccordionItem>
                <AccordionItem id="ftoc">
                    <svelte:fragment slot="summary">
                        <div class="flex space-x-4">
                            <span>Temperature</span>
                            <label class="flex justify-start space-x-2">
                                <span class={useF ? 'font-bold text-success-800' : ''}>&deg;F</span>
                                <SlideToggle
                                    name="toggle-all-species"
                                    size="sm"
                                    active="variant-filled-primary"
                                    on:click={toggleTempScale}
                                /><input hidden />
                                <span class={useF ? '' : 'font-bold text-success-800'}>&deg;C</span>
                            </label>
                        </div>
                    </svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            startTemp: {startTemp}
                        </div>
                        <div class="pl-4">endTemp: {endTemp}</div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Cloud cover (&percnt;)</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            startClouds: {data.siteDate.startClouds}
                        </div>
                        <div class="pl-4">
                            endClouds: {data.siteDate.endClouds}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Wind</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            startWindDir: {data.siteDate.startWindDir}
                        </div>
                        <div class="pl-4">
                            endWindDir: {data.siteDate.endWindDir}
                        </div>
                        <div class="pl-4">
                            startWindMPH: {data.siteDate.startWindMPH}
                        </div>
                        <div class="pl-4">
                            endWindMPH: {data.siteDate.endWindMPH}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Weather</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            w1: {data.siteDate.w1}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w2: {data.siteDate.w2}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w3: {data.siteDate.w3}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w4: {data.siteDate.w4}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w5: {data.siteDate.w5}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w6: {data.siteDate.w6}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w7: {data.siteDate.w7}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w8: {data.siteDate.w8}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w9: {data.siteDate.w9}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w10: {data.siteDate.w10}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w11: {data.siteDate.w11}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w12: {data.siteDate.w12}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w13: {data.siteDate.w13}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w14: {data.siteDate.w14}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div class="pl-4">
                            w15: {data.siteDate.w15}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                    </svelte:fragment>
                </AccordionItem>
                <AccordionItem>
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
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Larva</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            larvaObA: {data.siteDate.larvaObA}
                        </div>
                        <div class="pl-4">
                            larvaObB: {data.siteDate.larvaObB}
                        </div>
                        <div class="pl-4">
                            larvaObC: {data.siteDate.larvaObC}
                        </div>
                        <div class="pl-4">
                            larvaObD: {data.siteDate.larvaObD}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Energy/blooming</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            energySource1: {data.siteDate.energySource1}
                        </div>
                        <div class="pl-4">
                            energySource2: {data.siteDate.energySource2}
                        </div>
                        <div class="pl-4">
                            energySource3: {data.siteDate.energySource3}
                        </div>
                        <div class="pl-4">
                            energySource4: {data.siteDate.energySource4}
                        </div>
                        <div class="pl-4">
                            flowersInBloom: {data.siteDate.flowersInBloom}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <div class="pl-4">
                    fieldNotes: {data.siteDate.fieldNotes}
                </div>
                <AccordionItem>
                    <svelte:fragment slot="summary">Data history</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            createdBy: {data.siteDate.createdBy}
                        </div>
                        <div class="pl-4">
                            createdAt: {data.siteDate.createdAt}
                        </div>
                        <div class="pl-4">
                            updatedBy: {data.siteDate.updatedBy}
                        </div>
                        <div class="pl-4">
                            updatedAt: {data.siteDate.updatedAt}
                        </div>
                        <div class="pl-4">
                            confirmBy: {data.siteDate.confirmBy}
                        </div>
                        <div class="pl-4">
                            confirmAt: {data.siteDate.confirmAt}
                        </div></svelte:fragment
                    >
                </AccordionItem>
            </Accordion>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="right">
        <div>
            {#each data.siteObservations as siteObservation}
                <div class="card flex">
                    <div class="flex">
                        <div class="w-48">{siteObservation.checklist.commonName}</div>
                        <div class="w-48">{siteObservation.checklist.scientificName}</div>
                        <div class="w-16">total: {siteObservation.total}</div>
                    </div>
                </div>
            {/each}
        </div>
    </svelte:fragment>
</DoubledContainer>
