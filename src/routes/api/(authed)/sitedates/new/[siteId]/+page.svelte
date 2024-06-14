<script lang="ts">
    // import type { PageLoad } from '../../../sites/$types';
    import Container from '$lib/components/layouts/Container.svelte';
    import { weekOfYearSince } from '$lib/utils.js';

    /*-- -- Data -- */
    /*-- Exports */
    let { data } = $props();

    console.log('data ***: ', data);

    /*-- Context */

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Variables (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */

    /*-- Properties (functional) */

    // TODO make C to F of min max temps a thing
    // -89.3c  56.7c
    //°F = (9/5 × °C) + 32
    let useCelcius = $state(false);
    let minTemp = $derived(useCelcius ? -89.3 : -129);
    let maxTemp = $derived(useCelcius ? 56.7 : 135);

    let useMph = $state(true);

    let recordDate: Date | null = $state(null);
    let rxRecordDate = $derived(recordDate ? weekOfYearSince(recordDate) : null);

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */

    /*-- Reactives (functional) */

    /*-- Other */
</script>

{#snippet head()}
    <div class="flex flex-row gap-1 md:gap-2">
        <button type="submit" class="btn variant-filled" form="addSite">
            Save Site Date
            <span class="pl-2">✎</span>
        </button>
        <button type="button" class="btn variant-filled" form="addSite">
            Cancel
            <span class="pl-2">✎</span>
        </button>
    </div>
{/snippet}

{#snippet weather(id)}
    <label class="label">
        <span>Weather - Section {id}:</span>
        <select class="select" id="w{id}" name="w{id}" title="Weather - Section {id}">
            <option value="U" class="hidden"></option>
            <option value="U">Unknown</option>
            <option value="O">Overcast</option>
            <option value="R">Rain</option>
            <option value="S">Sun</option>
        </select>
    </label>
{/snippet}

{#snippet entryInput(fullId, fullLabel, inputType)}
    <label class="label">
        <span>{fullLabel}:</span>
        <input type={inputType} class="input" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet entryInputForSets(rootId, idKey, rootLabel, inputType)}
    <label class="label">
        <span>{rootLabel} {idKey}:</span>
        <input type={inputType} class="input" id="{rootId}{idKey}" name="{rootId}{idKey}" title="{rootLabel} {idKey}" />
    </label>
{/snippet}

{#snippet entryTemperature(fullId, fullLabel)}
    <label class="label">
        <span>{fullLabel} &deg;{useCelcius ? 'C' : 'F'}:</span>
        <input type="number" class="input" min={minTemp} max={maxTemp} step="0.1" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet entryTextarea(fullId, fullLabel, rows)}
    <label class="label">
        <span>{fullLabel}:</span>
        <textarea class="textarea" id={fullId} name={fullId} {rows} title={fullLabel}></textarea>
    </label>
{/snippet}

{#snippet body()}
    <form method="POST" action="?/addSiteDate" id="addSiteDate" name="addSiteDate">
        <input type="hidden" id="siteId" name="siteId" value={data.siteId} />
        <div class="w-[37em]">
            <div class="content">
                {@render entryInput('recorder', 'Recorder', 'input')}

                <label class="label">
                    <span>Record Date:</span>
                    <input type="date" class="input" id="recordDate" name="recordDate" title="Record date" bind:value={recordDate} />
                </label>

                <label class="label">
                    <span>Week of Year: {rxRecordDate}</span>
                    <input type="number" class="input" id="week" name="week" readonly title="Survey period week of the year for the record" />
                </label>

                {@render entryInput('startTime', 'Start Time', 'time')}
                {@render entryInput('endTime', 'End Time', 'time')}

                {@render entryTemperature('startTemp', 'Start Temperature')}
                {@render entryTemperature('endTemp', 'End Temperature')}

                {@render entryInput('startClouds', 'Start Clouds', 'input')}
                {@render entryInput('endClouds', 'End Clouds', 'input')}

                {@render entryInput('startWindDir', 'Start Wind Direction', 'input')}
                {@render entryInput('endWindDir', 'End Wind Direction', 'input')}

                <label class="label">
                    <span>Start Wind Speed ({useMph ? 'mph' : 'km'})</span>
                    <input type="number" min="0" class="input" id="startWindMPH" name="startWindMPH" title="Start Wind Speed" />
                </label>

                <label class="label">
                    <span>End Wind Speed ({useMph ? 'mph' : 'km'})</span>
                    <input type="number" min="0" class="input" id="endWindMPH" name="endWindMPH" title="End Wind Speed" />
                </label>

                <div class="mt-4">
                    <div class="text-center">Weather</div>
                    {#each { length: 15 } as _, i}
                        {@render weather(i + 1)}
                    {/each}
                </div>

                <div class="mt-4">
                    <div class="text-center">Larval Food Sources</div>
                    {#each { length: 15 } as _, i}
                        {@render entryInputForSets('lEsec', i + 1, 'Larval Energy Source - Section', 'input')}
                    {/each}
                </div>

                <div class="mt-4">
                    <div class="text-center">Larva</div>
                    {#each ['A', 'B', 'C', 'D'] as areaId}
                        {@render entryInputForSets('larvaOb', areaId, 'Larva Observed - Area', 'input')}
                    {/each}
                </div>

                <div class="mt-4">
                    <div class="text-center">Energy/Blooming</div>
                    {#each { length: 4 } as _, i}
                        {@render entryInputForSets('energySource', i + 1, 'Energy Source - Group', 'input')}
                    {/each}
                </div>

                <div class="mt-4">
                    {@render entryInput('flowersInBloom', 'Flowers In Bloom', 'input')}
                    {@render entryTextarea('fieldNotes', 'Field Notes', '4')}
                </div>
            </div>
        </div>
    </form>
{/snippet}

<Container {head} {body} tail={null} />
