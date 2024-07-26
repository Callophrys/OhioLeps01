<script lang="ts">
    // import type { PageLoad } from '../../../sites/$types';
    import Container from '$lib/components/layouts/Container.svelte';
    import { weekOfYearSince } from '$lib/utils.js';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    // TODO: handle cancel

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

    // TODO: choose storage unit and handle choice and conversion somewhere
    let useMph = $state(true);

    let recordDate: string | null = $state(null);
    let rxRecordDate = $derived(recordDate ? weekOfYearSince(new Date(recordDate)) : null);
    let targetForm: HTMLFormElement;

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */

    /*-- Reactives (functional) */

    /*-- Other */

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        console.log('e:', e);
        const formData = new FormData(targetForm);
        console.log('formDate:', formData);
        formData.append('tzOffset', new Date().getTimezoneOffset().toString());

        try {
            const response = await fetch(targetForm.action, {
                method: targetForm.method,
                body: formData,
            });

            const rd = await response.json();
            console.log(rd.status);
            if (rd.status === 200) {
                const rdata = JSON.parse(rd.data);
                console.log(rdata[rdata[0].id]);
                let siteDateId = rdata[rdata[0].id];
                goto('/api/sitedates/' + siteDateId);
            }
        } catch {}
    };

    setTimeout(() => {
        (() => {
            if (typeof document === 'object') {
                (document.getElementById('recorder') as HTMLInputElement).value = 'Mortimer Snerd';
                (document.getElementById('recordDate') as HTMLInputElement).value = '2024-06-12';
                (document.getElementById('week') as HTMLInputElement).value = weekOfYearSince(new Date('2024-06-12'))?.toString() ?? '';
                (document.getElementById('startTime') as HTMLInputElement).value = '10:15';
                (document.getElementById('endTime') as HTMLInputElement).value = '13:30';
                (document.getElementById('startTemp') as HTMLInputElement).value = '82';
                (document.getElementById('endTemp') as HTMLInputElement).value = '90';
                (document.getElementById('startClouds') as HTMLInputElement).value = '5';
                (document.getElementById('endClouds') as HTMLInputElement).value = '0';
                (document.getElementById('startWindDir') as HTMLInputElement).value = 'E';
                (document.getElementById('endWindDir') as HTMLInputElement).value = 'SE';
                (document.getElementById('startWindMPH') as HTMLInputElement).value = '3';
                (document.getElementById('endWindMPH') as HTMLInputElement).value = '4';
                (document.getElementById('weather1') as HTMLInputElement).value = 'S';
                (document.getElementById('weather2') as HTMLInputElement).value = 'O';
                (document.getElementById('weather3') as HTMLInputElement).value = 'S';
                (document.getElementById('weather4') as HTMLInputElement).value = 'S';
                (document.getElementById('weather5') as HTMLInputElement).value = 'O';
                (document.getElementById('weather6') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather7') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather8') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather9') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather10') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather11') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather12') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather13') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather14') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('weather15') as HTMLSelectElement).selectedIndex = 1;
                (document.getElementById('larvalEnergy1') as HTMLInputElement).value = 'Clover';
                (document.getElementById('larvalEnergy2') as HTMLInputElement).value = 'Baptisia';
                (document.getElementById('larvalEnergy3') as HTMLInputElement).value = 'Sedges';
                (document.getElementById('larvalEnergy4') as HTMLInputElement).value = 'Clover, Grasses and sedges';
                (document.getElementById('larvalEnergy5') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy6') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy7') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy8') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy9') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy10') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy11') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy12') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy13') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy14') as HTMLInputElement).value = '';
                (document.getElementById('larvalEnergy15') as HTMLInputElement).value = '';
                (document.getElementById('larvaObservedA') as HTMLInputElement).value = 'none';
                (document.getElementById('larvaObservedB') as HTMLInputElement).value = 'none';
                (document.getElementById('larvaObservedC') as HTMLInputElement).value = 'some on clover';
                (document.getElementById('larvaObservedD') as HTMLInputElement).value = '';
                (document.getElementById('energySource1') as HTMLInputElement).value = 'vibernum';
                (document.getElementById('energySource2') as HTMLInputElement).value = 'rose';
                (document.getElementById('energySource3') as HTMLInputElement).value = 'nicotiana';
                (document.getElementById('energySource4') as HTMLInputElement).value = '';
                (document.getElementById('flowersInBloom') as HTMLInputElement).value = '';
                (document.getElementById('fieldNotes') as HTMLInputElement).value = 'Test by me.';
            }
        })();
    }, 3000);
</script>

{#snippet head()}
    <div class="flex flex-row gap-1 md:gap-2">
        <button type="button" class="btn variant-filled" form="addSiteDate" onclick={handleSubmit}>
            Save Site Date
            <span class="pl-2">✎</span>
        </button>
        <button type="button" class="btn variant-filled" form="addSiteDate">
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

{#snippet entryInput(fullId, fullLabel, inputType, classesOuter, classesInner)}
    <label class={`label ${classesOuter}`}>
        <span>{fullLabel}:</span>
        {#if inputType === 'number'}
            <input type="number" class={`input ${classesInner}`} id={fullId} name={fullId} min="0" />
        {:else if inputType === 'input'}
            <input type="input" class={`input pl-2.5 ${classesInner}`} id={fullId} name={fullId} />
        {:else}
            <input type={inputType} class={`input ${classesInner}`} id={fullId} name={fullId} />
        {/if}
    </label>
{/snippet}

{#snippet entryInputForSets(rootId, idKey, rootLabel, inputType)}
    <label class="label">
        <span>{rootLabel} {idKey}:</span>
        <input type={inputType} class="input pl-2.5" id="{rootId}{idKey}" name="{rootId}{idKey}" title="{rootLabel} {idKey}" />
    </label>
{/snippet}

{#snippet entryTemperature(fullId, fullLabel, classesOuter, classesInner)}
    <label class={`label ${classesOuter}`}>
        <span>{fullLabel} &deg;{useCelcius ? 'C' : 'F'}:</span>
        <input type="number" class={`input ${classesInner}`} min={minTemp} max={maxTemp} step="0.1" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet entryTextarea(fullId, fullLabel, rows)}
    <label class="label">
        <span>{fullLabel}:</span>
        <textarea class="textarea" id={fullId} name={fullId} {rows} title={fullLabel}></textarea>
    </label>
{/snippet}

{#snippet body()}
    <form method="POST" action="?/addSiteDate" id="addSiteDate" name="addSiteDate" bind:this={targetForm} use:enhance>
        <input type="hidden" id="siteId" name="siteId" value={data.siteId} />
        <div class="w-[37em]">
            <div class="content">
                {@render entryInput('recorder', 'Recorder', 'input', '', '')}

                <div class="flex flex-row justify-between">
                    <label class="label w-1/2">
                        <span>Record Date:</span>
                        <input type="date" class="input" id="recordDate" name="recordDate" title="Record date" bind:value={recordDate} />
                    </label>

                    <label class="label w-1/4 text-right">
                        <span>Week of Year:</span>
                        <input class="input text-right w-16" id="week" name="week" readonly title="Calculated period week of the year for the record" value={rxRecordDate} />
                    </label>
                </div>

                <div class="flex flex-row justify-between">
                    {@render entryInput('startTime', 'Start Time', 'time', '', '')}
                    {@render entryInput('endTime', 'End Time', 'time', '', '')}
                </div>

                <div class="flex flex-row justify-between">
                    {@render entryTemperature('startTemp', 'Start Temperature', 'w-1/4 text-center', 'w-24')}
                    {@render entryTemperature('endTemp', 'End Temperature', 'w-1/4 text-center', 'w-24')}

                    {@render entryInput('startClouds', 'Start Clouds', 'input', 'w-1/4 px-2 py-3 text-center', 'w-24')}
                    {@render entryInput('endClouds', 'End Clouds', 'input', 'w-1/4 px-2 py-3 text-center', 'w-24')}
                </div>

                <div class="flex flex-row justify-between">
                    {@render entryInput('startWindDir', 'Start Wind Direction', 'input', '', '')}
                    {@render entryInput('endWindDir', 'End Wind Direction', 'input', '', '')}
                </div>

                <div class="flex flex-row justify-between">
                    {@render entryInput('startWindMPH', `Start Wind Speed (${useMph ? 'mph' : 'km'})`, 'number', '', '')}
                    {@render entryInput('endWindMPH', `End Wind Speed (${useMph ? 'mph' : 'km'})`, 'number', '', '')}
                </div>

                <div class="flex flex-row justify-between"></div>
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
                    {@render entryInput('flowersInBloom', 'Flowers In Bloom', 'input', '', '')}
                    {@render entryTextarea('fieldNotes', 'Field Notes', '4')}
                </div>
            </div>
        </div>
    </form>
{/snippet}

<Container {head} {body} bodyClasses={''} tail={null} />
