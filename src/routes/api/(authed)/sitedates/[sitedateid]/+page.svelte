<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    export let data;
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
            <Accordion autocollapse>
                <AccordionItem open>
                    <svelte:fragment slot="summary">Times</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startTime: {data.siteDate.startTime}
                            <span class="bg-slate-800">DateTime?</span>
                        </div>
                        <div>
                            endTime: {data.siteDate.endTime}
                            <span class="bg-slate-800">DateTime?</span>
                        </div></svelte:fragment
                    >
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Temperature</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div>
                            startTemp: {data.siteDate.startTemp}&deg;F
                        </div>
                        <div>endTemp: {data.siteDate.endTemp}&deg;F</div></svelte:fragment
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
                    </div>
                </AccordionItem>
                <AccordionItem>
                    <div>
                        larvaObA: {data.siteDate.larvaObA}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        larvaObB: {data.siteDate.larvaObB}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        larvaObC: {data.siteDate.larvaObC}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        larvaObD: {data.siteDate.larvaObD}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                </AccordionItem>
                <AccordionItem>
                    <div>
                        energySource1: {data.siteDate.energySource1}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        energySource2: {data.siteDate.energySource2}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        energySource3: {data.siteDate.energySource3}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        energySource4: {data.siteDate.energySource4}
                        <span class="bg-slate-800">String? // @db.String(25)</span>
                    </div>
                    <div>
                        flowersInBloom: {data.siteDate.flowersInBloom}
                        <span class="bg-slate-800">String? // @db.String(150)</span>
                    </div>
                </AccordionItem>
                <div>
                    fieldNotes: {data.siteDate.fieldNotes}
                    <span class="bg-slate-800">String? // @db.String(100)</span>
                </div>
                <AccordionItem>
                    <div>
                        createdBy: {data.siteDate.createdBy}
                        <span class="bg-slate-800"
                            >String @default("") // must be user id or something</span
                        >
                    </div>
                    <div>
                        createdAt: {data.siteDate.createdAt}
                        <span class="bg-slate-800">DateTime @default(now())</span>
                    </div>
                    <div>
                        updatedBy: {data.siteDate.updatedBy}
                        <span class="bg-slate-800">String?</span>
                    </div>
                    <div>
                        updatedAt: {data.siteDate.updatedAt}
                        <span class="bg-slate-800">DateTime?</span>
                    </div>
                    <div>
                        confirmBy: {data.siteDate.confirmBy}
                        <span class="bg-slate-800">String?</span>
                    </div>
                    <div>
                        confirmAt: {data.siteDate.confirmAt}
                        <span class="bg-slate-800">DateTime?</span>
                    </div>
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
