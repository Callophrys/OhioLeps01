<script lang="ts">
    /*-- Imports */
    import Container from '$lib/components/layouts/Container.svelte';
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
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
        <CountyPicker bind:currentCountyId controlBody="scale-90" controlOuter="w-auto" />
        <button type="submit" class="btn variant-filled" form="addSite">
            Save New Site
            <span class="pl-2">✎</span>
        </button>
        <button type="button" class="btn variant-filled" form="addSite">
            Cancel
            <span class="pl-2">✎</span>
        </button>
    </div>
{/snippet}

{#snippet entryInput(fullId, fullLabel, inputType)}
    <label class="label">
        <span>{fullLabel}:</span>
        <input type={inputType} class="input" id={fullId} name={fullId} title={fullLabel} />
    </label>
{/snippet}

{#snippet entryTextarea(fullId, fullLabel, rows)}
    <label class="label">
        <span>{fullLabel}:</span>
        <textarea class="textarea" id={fullId} name={fullId} {rows} title={fullLabel}></textarea>
    </label>
{/snippet}

{#snippet body()}
    <form method="POST" action="?/addSite" id="addSite" name="addSite">
        <input type="hidden" id="countyId" name="countyId" bind:value={currentCountyId} />
        <input type="hidden" id="stateId" name="stateId" bind:value={currentStateId} />
        <div class="w-[37em]">
            <div class="content">
                {@render entryInput('siteName', 'Site Name', 'text')}
                {@render entryInput('township', 'Township', 'text')}
                {@render entryInput('locationZip', 'Location Zip', 'text')}
                {@render entryInput('siteAddress', 'Site Address', 'text')}
                {@render entryInput('siteAddress2', 'Site Address 2', 'text')}
                {@render entryInput('siteCity', 'Site City', 'text')}
                {@render entryInput('siteState', 'Site State', 'text')}
                {@render entryInput('siteZip', 'Site Zip', 'text')}
                {@render entryInput('person', 'Person', 'text')}
                {@render entryInput('personAddress', 'Person Address', 'text')}
                {@render entryInput('personAddress2', 'Person Address 2', 'text')}
                {@render entryInput('personCity', 'Person City', 'text')}
                {@render entryInput('personState', 'Person State', 'text')}
                {@render entryInput('personZip', 'Person Zip', 'text')}
                {@render entryInput('personPhone', 'Person Phone', 'text')}
                {@render entryInput('personPhone2', 'Person Phone 2', 'text')}
                {@render entryInput('personEmail', 'Person Email', 'text')}
                {@render entryInput('latitudeStart', 'Latitude Start', 'text')}
                {@render entryInput('latitudeEnd', 'Latitude End', 'text')}
                {@render entryInput('longitudeStart', 'Longitude Start', 'text')}
                {@render entryInput('longitudeEnd', 'Longitude End', 'text')}
                {@render entryInput('altPerson', 'Alt Person', 'text')}
                {@render entryInput('altPersonAddress', 'Alt Person Address', 'text')}
                {@render entryInput('altPersonAddress2', 'Alt Person Address 2', 'text')}
                {@render entryInput('altPersonCity', 'Alt Person City', 'text')}
                {@render entryInput('altPersonState', 'Alt Person State', 'text')}
                {@render entryInput('altPersonZip', 'Alt Person Zip', 'text')}
                {@render entryInput('altPersonPhone', 'Alt Person Phone', 'text')}
                {@render entryInput('altPersonPhone2', 'Alt Person Phone 2', 'text')}
                {@render entryInput('altPersonEmail', 'Alt Person Email', 'text')}
                {@render entryInput('otherParticipants', 'Other Participants', 'text')}
                {@render entryTextarea('description', 'description', '4')}
            </div>
        </div>
    </form>
{/snippet}

<Container {head} {body} tail={null} />
