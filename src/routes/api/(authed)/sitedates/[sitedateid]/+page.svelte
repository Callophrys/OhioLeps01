<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { formatDate, weekOfYearSince } from '$lib/utils';
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

    let startTemp: string;
    let endTemp: string;
    let useF = true;

    let recordDate = new Date(data.siteDate.recordDate);
    let recordYear = new Date(data.siteDate.recordDate).getFullYear();
    let recordWeek = weekOfYearSince(new Date(data.siteDate.recordDate));

    $: startTemp = String(data.siteDate.startTemp);
    $: endTemp = String(data.siteDate.endTemp);

    //console.log(data.siteRecordDates);
    const yrs = Array.from(data.siteRecordDates).map((y) => new Date(y.recordDate).getFullYear());
    const years = [...new Set(yrs)];
    const weeks = Array.from(data.siteRecordDates).map((w) => ({
        siteDateId: w.siteDateId,
        year: new Date(w.recordDate).getFullYear(),
        week: weekOfYearSince(new Date(w.recordDate)),
    }));
    //console.log(years);
    //console.log(weeks);

    //console.log(data.siteObservations[0]);
</script>

<DoubledContainer basisLeft="basis-2/5" basisRight="basis-3/5">
    <svelte:fragment slot="left">
        <h2 class="flex flex-row justify-between">
            <div>{data.siteDate.site.siteName}</div>
            <div>
                Record Date: {formatDate(recordDate.toISOString(), 'medium', undefined)}
            </div>
        </h2>
        <hr />
        <div>
            <div class="flex flex-row justify-between">
                <div>
                    year:{data.siteDate.year}&nbsp;&nbsp;week: {data.siteDate.week}
                </div>
            </div>
            <select class="select w-32">
                {#each years as year}
                    {#if year === recordYear}
                        <option selected>{year}</option>
                    {:else}
                        <option>{year}</option>
                    {/if}
                {/each}
            </select>
            <select class="select w-32">
                {#each weeks as week}
                    {#if week.year === recordYear && week.week === recordWeek}
                        <option value={week.siteDateId} selected>{week.year} {week.week}</option>
                    {:else}
                        <option value={week.siteDateId}>{week.year} {week.week}</option>
                    {/if}
                {/each}
            </select>
            <div>
                recorder: {data.siteDate.recorder}
            </div>
            <Accordion>
                <AccordionItem open>
                    <svelte:fragment slot="summary">Times</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4 flex flex-row">
                            <span class="basis-20 text-nowrap text-right">Start Time:</span>
                            <span class="pl-2 w-24 text-right">
                                {formatDate(
                                    new Date(data.siteDate.startTime).toISOString(),
                                    undefined,
                                    'short'
                                )}
                            </span>
                        </div>
                        <div class="pl-4 flex flex-row">
                            <span class="basis-20 text-nowrap text-right">End Time:</span>
                            <span class="pl-2 w-24 text-right">
                                {formatDate(
                                    new Date(data.siteDate.endTime).toISOString(),
                                    undefined,
                                    'short'
                                )}
                            </span>
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
                            Start Temp: {data.siteDate.startTemp}
                        </div>
                        <div class="pl-4">
                            End Temp: {data.siteDate.endTemp}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Cloud cover (&percnt;)</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            Start Clouds: {data.siteDate.startClouds}
                        </div>
                        <div class="pl-4">
                            End Clouds: {data.siteDate.endClouds}
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
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
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
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
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
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
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <div class="pl-4">
                    Field Notes: {data.siteDate.fieldNotes ?? ''}
                </div>
                <AccordionItem>
                    <svelte:fragment slot="summary">Change history</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="pl-4">
                            Created By: {data.siteDate.createdBy ?? ''}
                        </div>
                        <div class="pl-4">
                            Created At: {formatDate(
                                new Date(data.siteDate.createdAt).toISOString(),
                                'medium',
                                'medium'
                            )}
                        </div>
                        <div class="pl-4">
                            Updated By: {data.siteDate.updatedBy ?? ''}
                        </div>
                        <div class="pl-4">
                            Updated At: {data.siteDate.updatedAt ?? ''}
                        </div>
                        <div class="pl-4">
                            Confirm By: {data.siteDate.confirmBy ?? ''}
                        </div>
                        <div class="pl-4">
                            Confirm At: {data.siteDate.confirmAt ?? ''}
                        </div></svelte:fragment
                    >
                </AccordionItem>
            </Accordion>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="right">
        <h2 class="flex flex-row justify-between">
            <div>{data.siteDate.site.siteName}</div>
            <div>
                year: {recordYear}
                Week: {recordWeek}
            </div>
        </h2>
        <hr />
        <div class="mt-2">
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
