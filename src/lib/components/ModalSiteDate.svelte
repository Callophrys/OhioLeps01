<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';
    import type { SiteDate } from '@prisma/client';
    import { enhance } from '$app/forms';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { weekOfYearSince } from '$lib/utils.js';

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();
    const sd = $modalStore[0].value.siteDate as SiteDate;
    const unitTemperature = $modalStore[0].value.useFarenheit === 'F' ? '&deg;F' : '&deg;C';
    let minTemp = $modalStore[0].value.useFarenheit !== 'F' ? -89.3 : -129;
    let maxTemp = $modalStore[0].value.useFarenheit !== 'F' ? 56.7 : 135;
    const unitWindSpeed = $modalStore[0].value.useMph === 'K' ? 'Kmph' : 'Mph';
    let maxWind = $modalStore[0].value.useMph === 'K' ? 302.6 : 188;

    const recordDate: Date = sd ? new Date(sd.recordDate) : new Date();
    const recordDateText = `${recordDate.getFullYear()}-${'0'.concat((1 + recordDate.getMonth()).toString()).slice(-2)}-${'0'.concat(recordDate.getDate().toString()).slice(-2)}`;

    const formData = $state(
        !$modalStore[0].value.isNewRecord && sd
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
                  weather1: sd.weather1 ?? 'U',
                  weather2: sd.weather2 ?? 'U',
                  weather3: sd.weather3 ?? 'U',
                  weather4: sd.weather4 ?? 'U',
                  weather5: sd.weather5 ?? 'U',
                  weather6: sd.weather6 ?? 'U',
                  weather7: sd.weather7 ?? 'U',
                  weather8: sd.weather8 ?? 'U',
                  weather9: sd.weather9 ?? 'U',
                  weather10: sd.weather10 ?? 'U',
                  weather11: sd.weather11 ?? 'U',
                  weather12: sd.weather12 ?? 'U',
                  weather13: sd.weather13 ?? 'U',
                  weather14: sd.weather14 ?? 'U',
                  weather15: sd.weather15 ?? 'U',
                  larvalEnergy1: sd.larvalEnergy1,
                  larvalEnergy2: sd.larvalEnergy2,
                  larvalEnergy3: sd.larvalEnergy3,
                  larvalEnergy4: sd.larvalEnergy4,
                  larvalEnergy5: sd.larvalEnergy5,
                  larvalEnergy6: sd.larvalEnergy6,
                  larvalEnergy7: sd.larvalEnergy7,
                  larvalEnergy8: sd.larvalEnergy8,
                  larvalEnergy9: sd.larvalEnergy9,
                  larvalEnergy10: sd.larvalEnergy10,
                  larvalEnergy11: sd.larvalEnergy11,
                  larvalEnergy12: sd.larvalEnergy12,
                  larvalEnergy13: sd.larvalEnergy13,
                  larvalEnergy14: sd.larvalEnergy14,
                  larvalEnergy15: sd.larvalEnergy15,
                  larvaObservedA: sd.larvaObservedA,
                  larvaObservedB: sd.larvaObservedB,
                  larvaObservedC: sd.larvaObservedC,
                  larvaObservedD: sd.larvaObservedD,
                  energySource1: sd.energySource1,
                  energySource2: sd.energySource2,
                  energySource3: sd.energySource3,
                  energySource4: sd.energySource4,
                  flowersInBloom: sd.flowersInBloom,
                  fieldNotes: sd.fieldNotes,
                  siteId: sd.siteId,
                  tzOffset: new Date().getTimezoneOffset().toString(),
                  unitWindSpeed: unitWindSpeed,
                  unitTemperature: unitTemperature,
              }
            : {
                  siteDateId: -1,
                  recordDate: recordDateText,
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
                  weather1: null,
                  weather2: null,
                  weather3: null,
                  weather4: null,
                  weather5: null,
                  weather6: null,
                  weather7: null,
                  weather8: null,
                  weather9: null,
                  weather10: null,
                  weather11: null,
                  weather12: null,
                  weather13: null,
                  weather14: null,
                  weather15: null,
                  larvalEnergy1: null,
                  larvalEnergy2: null,
                  larvalEnergy3: null,
                  larvalEnergy4: null,
                  larvalEnergy5: null,
                  larvalEnergy6: null,
                  larvalEnergy7: null,
                  larvalEnergy8: null,
                  larvalEnergy9: null,
                  larvalEnergy10: null,
                  larvalEnergy11: null,
                  larvalEnergy12: null,
                  larvalEnergy13: null,
                  larvalEnergy14: null,
                  larvalEnergy15: null,
                  larvaObservedA: null,
                  larvaObservedB: null,
                  larvaObservedC: null,
                  larvaObservedD: null,
                  energySource1: null,
                  energySource2: null,
                  energySource3: null,
                  energySource4: null,
                  flowersInBloom: null,
                  fieldNotes: null,
                  siteId: $modalStore[0].value.siteId,
                  tzOffset: new Date().getTimezoneOffset().toString(),
                  unitWindSpeed: unitWindSpeed,
                  unitTemperature: unitTemperature,
              }
    );
    // console.log(formData);

    let recordWeek = $derived(formData.recordDate ? weekOfYearSince(new Date(formData.recordDate)) : null);

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
    const cBase = 'card p-4 w-modal shadow-xl space-y-4 flex flex-col max-h-[calc(100vh_-_40px)]';
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
        <form class="modal-form {cForm}" method="post" use:enhance>
            <label class="label">
                <div>Recorder:</div>
                <input class="input" id="recorder" name="recorder" title="Name of the recorder(s) of the actual field data" bind:value={formData.recorder} />
            </label>

            <div class="flex flex-row justify-between">
                <label class="label w-1/3">
                    <div>Record Date:</div>
                    <input type="date" class="input" id="recordDate" name="recordDate" title="Record date" bind:value={formData.recordDate} />
                </label>

                <label class="label text-right">
                    <div>Week of Year:</div>
                    <input class="input text-right w-16" id="week" name="week" readonly title="Calculated period week of the year for the record" value={recordWeek} />
                </label>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Time</div>
                <div class="flex flex-row space-x-2">
                    <label class="label">
                        <div>Start:</div>
                        <input class="input w-32" id="startTime" name="startTime" type="time" title="Time at start" bind:value={formData.startTime} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-32" id="endTime" name="endTime" type="time" title="Time at end" bind:value={formData.endTime} />
                    </label>
                </div>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Temperature ({@html unitTemperature})</div>
                <input type="hidden" id="unitTemperature" name="unitTemperature" value={unitTemperature} />
                <div class="flex flex-row justify-center space-x-2">
                    <label class="label">
                        <div>Start:</div>
                        <input class="input w-16" id="startTemp" name="startTemp" type="number" min={minTemp} max={maxTemp} title="Temperature at start" bind:value={formData.startTemp} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-16" id="endTemp" name="endTemp" type="number" min={minTemp} max={maxTemp} title="Temperature at end" bind:value={formData.endTemp} />
                    </label>
                </div>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Cloud Cover (%)</div>
                <div class="flex flex-row justify-center space-x-2">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-24" id="startClouds" name="startClouds" type="number" min="0" title="Cloud cover at start" bind:value={formData.startClouds} />
                    </label>
                    <label class="label center">
                        <div>End:</div>
                        <input class="input w-24" id="endClouds" name="endClouds" type="number" min="0" title="Cloud cover at end" bind:value={formData.endClouds} />
                    </label>
                </div>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Wind Direction</div>
                <div class="flex flex-row justify-center space-x-2">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-16" id="startWindDir" name="startWindDir" title="Wind direction at start" bind:value={formData.startWindDir} />
                    </label>
                    <label class="label text-center">
                        <div>End:</div>
                        <input class="input w-16" id="endWindDir" name="endWindDir" title="Wind direction at end" bind:value={formData.endWindDir} />
                    </label>
                </div>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Wind Speed ({unitWindSpeed})</div>
                <input type="hidden" id="unitWindSpeed" name="unitWindSpeed" value={unitWindSpeed} />
                <div class="flex flex-row justify-center space-x-2">
                    <label class="label text-center">
                        <div>Start:</div>
                        <input class="input w-24" id="startWindMPH" name="startWindMPH" type="number" min="0" max={maxWind} title={`Wind speed at start in ${unitWindSpeed}`} bind:value={formData.startWindMPH} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-24" id="endWindMPH" name="endWindMPH" type="number" min="0" max={maxWind} title={`Wind speed at end in ${unitWindSpeed}`} bind:value={formData.endWindMPH} />
                    </label>
                </div>
            </div>

            <div class="mt-4 w-fit text-center">
                <div class="text-center">Weather</div>
                <div class="flex flex-wrap justify-start space-x-2">
                    {#each Object.keys(formData)
                        .filter((k) => k.startsWith('weather'))
                        .map((k) => ({ label: `Section ${k.substring(7)}`, section: `Weather - section ${k.substring(7)}`, key: k })) as { label, section, key }}
                        <label class="label text-center">
                            <div>{label}:</div>
                            <select class="select w-28" id={key} name={key} title={section} bind:value={formData[key as keyof typeof formData]}>
                                <option value="U" class="hidden"></option>
                                <option value="U">Unknown</option>
                                <option value="O">Overcast</option>
                                <option value="R">Rain</option>
                                <option value="S">Sun</option>
                            </select>
                        </label>
                    {/each}
                </div>
            </div>

            <div class="mt-4">
                <div class="text-center">Larval Food/Energy Sources</div>
                <div class="flex flex-wrap justify-start space-x-2">
                    {#each Object.entries(formData)
                        .filter((x) => x[0].startsWith('larvalEnergy'))
                        .map(([k, v]) => ({ label: `Section ${k.substring(12)}`, section: `Energy source - group ${k.substring(12)}`, key: k, value: v })) as { label, section, key }}
                        <label class="label">
                            <div>{label}:</div>
                            <input type="text" class="input w-16 pl-2.5" id={key} name={key} title={section} bind:value={formData[key as keyof typeof formData]} />
                        </label>
                    {/each}
                </div>
            </div>

            <div class="mt-4">
                <div class="text-center">Larva Observed</div>
                {#each Object.entries(formData)
                    .filter((x) => x[0].startsWith('larvaObserved'))
                    .map(([k, v]) => ({ label: `Area ${k.substring(13)}`, section: `Larva observed in area ${k.substring(13)}`, key: k, value: v })) as { label, section, key }}
                    <label class="label">
                        <span>{label}:</span>
                        <input type="text" class="input pl-2.5" id={key} name={key} title={section} bind:value={formData[key as keyof typeof formData]} />
                    </label>
                {/each}
            </div>

            <div class="mt-4">
                <div class="text-center">Energy/Blooming</div>
                {#each Object.entries(formData)
                    .filter((x) => x[0].startsWith('energySource'))
                    .map(([k, v]) => ({ label: `Group ${k.substring(12)}`, section: `Energy/bloom sources - group ${k.substring(12)}`, key: k, value: v })) as { label, section, key }}
                    <label class="label">
                        <span>{label}:</span>
                        <input type="text" class="input pl-2.5" id={key} name={key} title={section} bind:value={formData[key as keyof typeof formData]} />
                    </label>
                {/each}
            </div>

            <div class="mt-4">
                <label class="label center">
                    <div>Flowers in Bloom</div>
                    <textarea class="textarea" id="flowersInBloom" name="flowersInBloom" rows="2" title="Flowers in bloom" bind:value={formData.flowersInBloom}></textarea>
                </label>
                <label class="label">
                    <div>Field Notes</div>
                    <textarea class="textarea" id="fieldNotes" name="fieldNotes" rows="4" title="Field notes" bind:value={formData.fieldNotes}></textarea>
                </label>
            </div>
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
