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

{#snippet body()}
    <form method="POST" action="?/addSite" id="addSite" name="addSite">
        <input type="hidden" id="countyId" name="countyId" bind:value={currentCountyId} />
        <input type="hidden" id="stateId" name="stateId" bind:value={currentStateId} />
        <div class="w-[37em]">
            <div class="content">
                {@render entryInput('siteName', 'Site Name', 'text')}
                <label class="label">
                    <span>Site Name:</span>
                    <input type="text" class="input" id="siteName" name="siteName" title="Site Name:" />
                </label>
                <label class="label"><span>Township:</span><input type="text" class="input" id="township" name="township" title="Township:" /></label>
                <label class="label"><span>Location Zip:</span><input type="text" class="input" id="locationZip" name="locationZip" title="Location Zip:" /></label>
                <label class="label"><span>Site Address:</span><input type="text" class="input" id="siteAddress" name="siteAddress" title="Site Address:" /></label>
                <label class="label"><span>Site Address 2:</span><input type="text" class="input" id="siteAddress2" name="siteAddress2" title="Site Address 2:" /></label>
                <label class="label"><span>Site City:</span><input type="text" class="input" id="siteCity" name="siteCity" title="Site City:" /></label>
                <label class="label"><span>Site State:</span><input type="text" class="input" id="siteState" name="siteState" title="Site State:" /></label>
                <label class="label"><span>Site Zip:</span><input type="text" class="input" id="siteZip" name="siteZip" title="Site Zip:" /></label>
                <label class="label"><span>Person:</span><input type="text" class="input" id="person" name="person" title="Person:" /></label>
                <label class="label"><span>Person Address:</span><input type="text" class="input" id="personAddress" name="personAddress" title="Person Address:" /></label>
                <label class="label"><span>Person Address 2:</span><input type="text" class="input" id="personAddress2" name="personAddress2" title="Person Address 2:" /></label>
                <label class="label"><span>Person City:</span><input type="text" class="input" id="personCity" name="personCity" title="Person City:" /></label>
                <label class="label"><span>Person State:</span><input type="text" class="input" id="personState" name="personState" title="Person State:" /></label>
                <label class="label"><span>Person Zip:</span><input type="text" class="input" id="personZip" name="personZip" title="Person Zip:" /></label>
                <label class="label"><span>Person Phone:</span><input type="text" class="input" id="personPhone" name="personPhone" title="Person Phone:" /></label>
                <label class="label"><span>Person Phone 2:</span><input type="text" class="input" id="personPhone2" name="personPhone2" title="Person Phone 2:" /></label>
                <label class="label"><span>Person Email:</span><input type="text" class="input" id="personEmail" name="personEmail" title="Person Email:" /></label>
                <label class="label"><span>Latitude Start:</span><input type="text" class="input" id="latitudeStart" name="latitudeStart" title="Latitude Start:" /></label>
                <label class="label"><span>Latitude End:</span><input type="text" class="input" id="latitudeEnd" name="latitudeEnd" title="Latitude End:" /></label>
                <label class="label"><span>Longitude Start:</span><input type="text" class="input" id="longitudeStart" name="longitudeStart" title="Longitude Start:" /></label>
                <label class="label"><span>Longitude End:</span><input type="text" class="input" id="longitudeEnd" name="longitudeEnd" title="Longitude End:" /></label>
                <label class="label"><span>Alt Person:</span><input type="text" class="input" id="altPerson" name="altPerson" title="Alt Person:" /></label>
                <label class="label"><span>Alt Person Address:</span><input type="text" class="input" id="altPersonAddress" name="altPersonAddress" title="Alt Person Address:" /></label>
                <label class="label"><span>Alt Person Address 2:</span><input type="text" class="input" id="altPersonAddress2" name="altPersonAddress2" title="Alt Person Address 2:" /></label>
                <label class="label"><span>Alt Person City:</span><input type="text" class="input" id="altPersonCity" name="altPersonCity" title="Alt Person City:" /></label>
                <label class="label"><span>Alt Person State:</span><input type="text" class="input" id="altPersonState" name="altPersonState" title="Alt Person State:" /></label>
                <label class="label"><span>Alt Person Zip:</span><input type="text" class="input" id="altPersonZip" name="altPersonZip" title="Alt Person Zip:" /></label>
                <label class="label"><span>Alt Person Phone:</span><input type="text" class="input" id="altPersonPhone" name="altPersonPhone" title="Alt Person Phone:" /></label>
                <label class="label"><span>Alt Person Phone 2:</span><input type="text" class="input" id="altPersonPhone2" name="altPersonPhone2" title="Alt Person Phone 2:" /></label>
                <label class="label"><span>Alt Person Email:</span><input type="text" class="input" id="altPersonEmail" name="altPersonEmail" title="Alt Person Email:" /></label>
                <label class="label"><span>Other Participants:</span><input type="text" class="input" id="otherParticipants" name="otherParticipants" title="Other Participants:" /></label>
                <label class="label"><span>description:</span><textarea class="textarea" id="description" name="description" rows="4" title="Description"></textarea></label>
            </div>
        </div>
    </form>
{/snippet}

<Container {head} {body} tail={null} />
