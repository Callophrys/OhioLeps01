<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { createEventDispatcher } from 'svelte';
    export let data;

    function handleToggle(e: any) {
        return true;
    }

    function toggleTempScale(e: any) {
        useF = !useF;
        if (useF) {
            startTemp = String(data.siteDate.startTemp);
            endTemp = String(data.siteDate.endTemp);
        } else {
            startTemp = String(data.siteDate.startTemp ? Math.floor((data.siteDate.startTemp - 32) * 5 / 9) : '');
            endTemp = String(data.siteDate.endTemp ? Math.floor((data.siteDate.endTemp - 32) * 5 / 9) : '');
        }
        acc.dispatch('toggleAccordion');
    }

    const dispatch = createEventDispatcher();

    let acc: any;

    let startTemp: string;
    let endTemp: string;
    let useF = true;
    $: startTemp = String(data.siteDate.startTemp);
    $: endTemp = String(data.siteDate.endTemp);

    console.log(data.siteObservations[0]);
</script>

<DoubledContainer>
    <svelte:fragment slot="left">
        <div>
            <div>
                recordDate: {data.siteDate.recordDate}
            </div>
            <div>
                year: {data.siteDate.year}&nbsp;&nbsp;week: {data.siteDate.week}
            </div>
            <div>
                recorder: {data.siteDate.recorder}
            </div>
            <Accordion>
                <AccordionItem open>
                    <svelte:fragment slot="summary">Times</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startTime: {data.siteDate.startTime}
                        </div>
                        <div>
                            endTime: {data.siteDate.endTime}
                        </div>
                        </svelte:fragment>
                </AccordionItem>
                <AccordionItem id="ftoc" bind:this={acc} on:toggle={handleToggle}>
                    <svelte:fragment slot="summary">
                    <div class="flex space-x-4">
                        <span>Temperature</span>
                        <label class="flex justify-start space-x-2">
                            <span class="{useF ? 'font-bold text-success-800' : ''}">&deg;F</span>
                            <SlideToggle name="toggle-all-species" size="sm" active="variant-filled-primary"
                             on:click={toggleTempScale} /><input hidden>
                            <span class="{useF ? '' : 'font-bold text-success-800'}">&deg;C</span>
                        </label>
                    </div>
                    </svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startTemp: {startTemp}
                        </div>
                        <div>endTemp: {endTemp}</div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Cloud</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startClouds: {data.siteDate.startClouds}
                            <span class="bg-slate-800">Int?</span>
                        </div>
                        <div>
                            endClouds: {data.siteDate.endClouds}
                            <span class="bg-slate-800">Int?</span>
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Wind</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startWindDir: {data.siteDate.startWindDir}
                            <span class="bg-slate-800">String? // @db.String(3)</span>
                        </div>
                        <div>
                            endWindDir: {data.siteDate.endWindDir}
                            <span class="bg-slate-800">String? // @db.String(3)</span>
                        </div>
                        <div>
                            startWindMPH: {data.siteDate.startWindMPH}
                            <span class="bg-slate-800">Int?</span>
                        </div>
                        <div>
                            endWindMPH: {data.siteDate.endWindMPH}
                            <span class="bg-slate-800">Int?</span>
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Weather</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            w1: {data.siteDate.w1}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w2: {data.siteDate.w2}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w3: {data.siteDate.w3}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w4: {data.siteDate.w4}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w5: {data.siteDate.w5}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w6: {data.siteDate.w6}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w7: {data.siteDate.w7}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w8: {data.siteDate.w8}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w9: {data.siteDate.w9}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w10: {data.siteDate.w10}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w11: {data.siteDate.w11}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w12: {data.siteDate.w12}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w13: {data.siteDate.w13}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w14: {data.siteDate.w14}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                        <div>
                            w15: {data.siteDate.w15}
                            <span class="bg-slate-800">Weather @default(U)</span>
                        </div>
                    </svelte:fragment>
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Larva food sources</svelte:fragment>
                    <svelte:fragment slot="content">
                    <div>
                        lEsec1: {data.siteDate.lEsec1}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec2: {data.siteDate.lEsec2}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec3: {data.siteDate.lEsec3}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec4: {data.siteDate.lEsec4}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec5: {data.siteDate.lEsec5}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec6: {data.siteDate.lEsec6}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec7: {data.siteDate.lEsec7}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec8: {data.siteDate.lEsec8}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec9: {data.siteDate.lEsec9}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec10: {data.siteDate.lEsec10}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec11: {data.siteDate.lEsec11}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec12: {data.siteDate.lEsec12}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec13: {data.siteDate.lEsec13}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec14: {data.siteDate.lEsec14}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div>
                    <div>
                        lEsec15: {data.siteDate.lEsec15}
                        <span class="bg-slate-800">String? // @db.String(8)</span>
                    </div></svelte:fragment>
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Larva</svelte:fragment>
                    <svelte:fragment slot="content">
                    <div>
                        larvaObA: {data.siteDate.larvaObA}
                    </div>
                    <div>
                        larvaObB: {data.siteDate.larvaObB}
                    </div>
                    <div>
                        larvaObC: {data.siteDate.larvaObC}
                    </div>
                    <div>
                        larvaObD: {data.siteDate.larvaObD}
                    </div></svelte:fragment>  
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Energy/blooming</svelte:fragment>
                    <svelte:fragment slot="content">
                    <div>
                        energySource1: {data.siteDate.energySource1}
                    </div>
                    <div>
                        energySource2: {data.siteDate.energySource2}
                    </div>
                    <div>
                        energySource3: {data.siteDate.energySource3}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        energySource4: {data.siteDate.energySource4}
                    </div>
                    <div>
                        flowersInBloom: {data.siteDate.flowersInBloom}
                    </div></svelte:fragment>  
                </AccordionItem>
                <div>
                    fieldNotes: {data.siteDate.fieldNotes}
                </div>
                <AccordionItem>
                    <svelte:fragment slot="summary">Data history</svelte:fragment>
                    <svelte:fragment slot="content">
                    <div>
                        createdBy: {data.siteDate.createdBy}
                    </div>
                    <div>
                        createdAt: {data.siteDate.createdAt}
                    </div>
                    <div>
                        updatedBy: {data.siteDate.updatedBy}
                    </div>
                    <div>
                        updatedAt: {data.siteDate.updatedAt}
                    </div>
                    <div>
                        confirmBy: {data.siteDate.confirmBy}
                    </div>
                    <div>
                        confirmAt: {data.siteDate.confirmAt}
                    </div></svelte:fragment>  
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
