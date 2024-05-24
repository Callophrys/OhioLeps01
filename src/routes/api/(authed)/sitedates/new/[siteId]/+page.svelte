<script lang="ts">
    /*-- Imports */
    import Container from '$lib/components/layouts/Container.svelte';
    import { setContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    let { data } = $props();

    // export let data../$types.js;
    // console.log('data ***: ', data);
    // console.log('$page ***: ', $page);

    /*-- Context */
    setContext('counties', data.counties);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Variables (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */

    /*-- Properties (functional) */
    let currentCountyId: number = $state(data?.refCountyId ?? -1);
    let currentStateId: number = $state(data.counties.find((x) => x.id === currentCountyId)?.stateId ?? -1);

    // TODO make C to F of min max temps a thing
    // -89.3c  56.7c
    //°F = (9/5 × °C) + 32
    let useCelcius = $state(false);
    let minTemp = $derived(useCelcius ? -89.3 : -129);
    let maxTemp = $derived(useCelcius ? 56.7 : 135);

    let useMph = $state(true);

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */

    /*-- Reactives (functional) */
    $effect(() => {
        console.log('local currentCountyId:', currentCountyId);
        console.log('local currentStateId:', currentStateId);
    });

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

{#snippet energyLarva(id)}
    <label class="label">
        <span>Larval Energy Source - Section {id}:</span>
        <input type="text" class="input" id="lEsec{id}" name="lEsec{id}" title="Larval Energy Source - Section {id}" />
    </label>
{/snippet}

{#snippet larva(id)}
    <label class="label">
        <span>Larva Observed - Area {id}:</span>
        <input type="text" class="select" id="larvaOb{id}" name="larvaOb{id}" title="Larva Observed - Area {id}" />
    </label>
{/snippet}

{#snippet energyAdult(id)}
    <label class="label">
        <span>Energy Source - Group {id}:</span>
        <input type="text" class="input" id="energySource{id}" name="energySource{id}" title="Energy Source - Group {id}" />
    </label>
{/snippet}

{#snippet entryInput(fullId, fullLabel, inputType)}
    <label class="label">
        <span>{fullLabel}:</span>
        <input type={inputType} class="input" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet entryTemperature(fullId, fullLabel)}
    <label class="label">
        <span>{fullLabel} &deg;{useCelcius ? 'C' : 'F'}:</span>
        <input type="number" class="input" min={minTemp} max={maxTemp} step="0.1" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet body()}
    <form method="POST" action="?/addSiteDate" id="addSiteDate" name="addSiteDate">
        <input type="hidden" id="countyId" name="countyId" bind:value={currentCountyId} />
        <input type="hidden" id="stateId" name="stateId" bind:value={currentStateId} />
        <div class="w-[37em]">
            <div class="content">
                {@render entryInput('recorder', 'Recorder', 'input')}
                {@render entryInput('recorderDate', 'Record Date', 'date')}

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

                <div class="text-center mt-4">Weather</div>
                {#each { length: 15 } as _, i}
                    {@render weather(i + 1)}
                {/each}

                <div class="text-center mt-4">Larval Food Sources</div>
                {#each { length: 15 } as _, i}
                    {@render energyLarva(i + 1)}
                {/each}

                <div class="text-center mt-4">Larva</div>
                {@render larva('A')}
                {@render larva('B')}
                {@render larva('C')}
                {@render larva('D')}

                <div class="text-center mt-4">Energy/Blooming</div>
                {#each { length: 4 } as _, i}
                    {@render energyAdult(i + 1)}
                {/each}

                <div class="h-8"></div>
                {@render entryInput('flowersInBloom', 'Flowers In Bloom', 'input')}

                <label class="label">
                    <span>Field Notes</span>
                    <textarea class="textarea" id="fieldNotes" name="fieldNotes" rows="4" title="Field Notes"></textarea>
                </label>
            </div>
        </div>
    </form>
{/snippet}

<Container {head} {body} tail={null} />
