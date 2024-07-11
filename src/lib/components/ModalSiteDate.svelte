<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';
    import type { SiteDate } from '@prisma/client';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { weekOfYearSince } from '$lib/utils.js';

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();
    const sd = $modalStore[0].value.siteDate as SiteDate;
    const unitTemperature = $modalStore[0].value.useFarenheit === 'F' ? '&deg;F' : '&deg;C';
    let minTemp = $derived($modalStore[0].value.useFarenheit !== 'F' ? -89.3 : -129);
    let maxTemp = $derived($modalStore[0].value.useFarenheit !== 'F' ? 56.7 : 135);
    const unitWindSpeed = $modalStore[0].value.useMph === 'K' ? 'Kmph' : 'Mph';

    const recordDate: Date | null = sd.recordDate ? new Date(sd.recordDate) : null;
    const recordDateText = recordDate ? `${recordDate.getFullYear()}-${'0'.concat((1 + recordDate.getMonth()).toString()).slice(0, 2)}-${'0'.concat(recordDate.getDate().toString()).slice(0, 2)}` : null;
    let recordWeek = $derived(sd.recordDate ? weekOfYearSince(new Date(sd.recordDate)) : null);

    const formData = $state(
        sd
            ? {
                  siteDateId: sd.siteDateId,
                  recordDate: recordDateText,
                  week: -1,
                  recorder: sd.recorder,
                  startTime: sd.startTime ? new Date(sd.startTime).toTimeString().slice(0, 5) : null,
                  endTime: sd.endTime ? new Date(sd.endTime).toTimeString().slice(0, 5) : null,
                  startTemp: sd.startTemp,
                  endTemp: sd.endTemp,
                  startClouds: sd.startClouds,
                  endClouds: sd.endClouds,
                  startWindDir: sd.startWindDir,
                  endWindDir: sd.endWindDir,
                  startWindMPH: sd.startWindMPH,
                  endWindMPH: sd.endWindMPH,
                  w1: sd.w1 ?? 'U',
                  w2: sd.w2 ?? 'U',
                  w3: sd.w3 ?? 'U',
                  w4: sd.w4 ?? 'U',
                  w5: sd.w5 ?? 'U',
                  w6: sd.w6 ?? 'U',
                  w7: sd.w7 ?? 'U',
                  w8: sd.w8 ?? 'U',
                  w9: sd.w9 ?? 'U',
                  w10: sd.w10 ?? 'U',
                  w11: sd.w11 ?? 'U',
                  w12: sd.w12 ?? 'U',
                  w13: sd.w13 ?? 'U',
                  w14: sd.w14 ?? 'U',
                  w15: sd.w15 ?? 'U',
                  lEsec1: sd.lEsec1,
                  lEsec2: sd.lEsec2,
                  lEsec3: sd.lEsec3,
                  lEsec4: sd.lEsec4,
                  lEsec5: sd.lEsec5,
                  lEsec6: sd.lEsec6,
                  lEsec7: sd.lEsec7,
                  lEsec8: sd.lEsec8,
                  lEsec9: sd.lEsec9,
                  lEsec10: sd.lEsec10,
                  lEsec11: sd.lEsec11,
                  lEsec12: sd.lEsec12,
                  lEsec13: sd.lEsec13,
                  lEsec14: sd.lEsec14,
                  lEsec15: sd.lEsec15,
                  larvaObA: sd.larvaObA,
                  larvaObB: sd.larvaObB,
                  larvaObC: sd.larvaObC,
                  larvaObD: sd.larvaObD,
                  energySource1: sd.energySource1,
                  energySource2: sd.energySource2,
                  energySource3: sd.energySource3,
                  energySource4: sd.energySource4,
                  flowersInBloom: sd.flowersInBloom,
                  fieldNotes: sd.fieldNotes,
                  siteId: sd.siteId,
              }
            : {
                  siteDateId: -1,
                  recordDate: null,
                  week: null,
                  recorder: null,
                  startTime: null,
                  endTime: null,
                  startTemp: null,
                  endTemp: null,
                  startClouds: null,
                  endClouds: null,
                  startWindDir: null,
                  endWindDir: null,
                  startWindMPH: null,
                  endWindMPH: null,
                  w1: null,
                  w2: null,
                  w3: null,
                  w4: null,
                  w5: null,
                  w6: null,
                  w7: null,
                  w8: null,
                  w9: null,
                  w10: null,
                  w11: null,
                  w12: null,
                  w13: null,
                  w14: null,
                  w15: null,
                  lEsec1: null,
                  lEsec2: null,
                  lEsec3: null,
                  lEsec4: null,
                  lEsec5: null,
                  lEsec6: null,
                  lEsec7: null,
                  lEsec8: null,
                  lEsec9: null,
                  lEsec10: null,
                  lEsec11: null,
                  lEsec12: null,
                  lEsec13: null,
                  lEsec14: null,
                  lEsec15: null,
                  larvaObA: null,
                  larvaObB: null,
                  larvaObC: null,
                  larvaObD: null,
                  energySource1: null,
                  energySource2: null,
                  energySource3: null,
                  energySource4: null,
                  flowersInBloom: null,
                  fieldNotes: null,
                  siteId: null,
              }
    );
    console.log(formData);

    // const htmlHodges = (h: string | null | undefined) => (!h || h === 'null' ? '&varnothing;' : h);

    // Custom submit function to pass the response and close the modal.
    function onFormSubmit(e: Event): void {
        e.preventDefault();
        formData.week = recordWeek;
        if ($modalStore[0].response) {
            console.log(formData);
            $modalStore[0].response(formData);
        }
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
    const cForm: CssClasses = 'border border-surface-500 p-4 rounded-container-token overflow-y-auto';
    // let checklist: ChecklistScientificName[] = $modalStore[0].value.checklist as ChecklistScientificName[];
    // let hodges = $derived(htmlHodges(checklist.find((x: ChecklistScientificName) => x.checklistId === formData.checklistId)?.hodges));
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <div class="flex flex-row justify-between">
                <label class="label w-1/2">
                    <span>Record Date:</span>
                    <input type="date" class="input" id="recordDate" name="recordDate" title="Record date" bind:value={formData.recordDate} />
                </label>

                <label class="label w-1/4 text-right">
                    <span>Week of Year:</span>
                    <input class="input text-right w-16" id="week" name="week" readonly title="Calculated period week of the year for the record" value={recordWeek} />
                </label>
            </div>

            <div>
                <div class="text-center">Time</div>
                <div class="flex flex-row">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-32" id="startTime" name="startTime" type="time" title="Time at start" bind:value={formData.startTime} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-32" id="endTime" name="endTime" type="time" title="Time at end" bind:value={formData.endTime} />
                    </label>
                </div>
            </div>

            <div>
                <div class="text-center">Temperature ({@html unitTemperature})</div>
                <div class="flex flex-row">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-16" id="startTemp" name="startTemp" type="number" min={minTemp} max={maxTemp} title="Temperature at start" bind:value={formData.startTemp} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-16" id="endTemp" name="endTemp" type="number" min={minTemp} max={maxTemp} title="Temperature at end" bind:value={formData.endTemp} />
                    </label>
                </div>
            </div>

            <div>
                <div class="text-center">Cloud Cover (%)</div>
                <div class="flex flex-row">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-24" id="startClouds" name="startClouds" type="number" min="0" title="Cloud cover at start" bind:value={formData.startClouds} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-24" id="endClouds" name="endClouds" type="number" min="0" title="Cloud cover at end" bind:value={formData.endClouds} />
                    </label>
                </div>
            </div>

            <div>
                <div class="text-center">Wind Direction</div>
                <div class="flex flex-row">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-16" id="startWindDir" name="startWindDir" title="Wind direction at start" bind:value={formData.startWindDir} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-16" id="endWindDir" name="endWindDir" readonly title="Wind direction at end" bind:value={formData.endWindDir} />
                    </label>
                </div>
            </div>

            <div>
                <div class="text-center">Wind Speed ({unitWindSpeed})</div>
                <div class="flex flex-row">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-16" id="startWindMPH" name="startWindMPH" type="number" min="0" title={`Wind speed at start in ${unitWindSpeed}`} bind:value={formData.startWindMPH} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-16" id="endWindMPH" name="endWindMPH" type="number" min="0" title={`Wind speed at end in ${unitWindSpeed}`} bind:value={formData.endWindMPH} />
                    </label>
                </div>
            </div>

            <!-- <div class="flex flex-row justify-between"></div> -->
            <!-- <div class="mt-4"> -->
            <!--     <div class="text-center">Weather</div> -->
            <!--     {#each { length: 15 } as _, i} -->
            <!--         <label class="label"> -->
            <!--             <span>Weather - Section {i + 1}:</span> -->
            <!--             <select class="select" id="w{i + 1}" name="w{i + 1}" title="Weather - Section {i + 1}"> -->
            <!--                 <option value="U" class="hidden"></option> -->
            <!--                 <option value="U">Unknown</option> -->
            <!--                 <option value="O">Overcast</option> -->
            <!--                 <option value="R">Rain</option> -->
            <!--                 <option value="S">Sun</option> -->
            <!--             </select> -->
            <!--         </label> -->
            <!--     {/each} -->
            <!-- </div> -->
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
