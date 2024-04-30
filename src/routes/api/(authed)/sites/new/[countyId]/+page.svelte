<script lang="ts">
    /*-- Imports */
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { setContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let data;
    // export let data../$types.js;
    console.log(data);

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
    let currentCountyId: number = data?.refCountyId ?? -1;

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */

    /*-- Reactives (functional) */
    $: currentCountyId, console.log('local currentCountyId:', currentCountyId);

    /*-- Other */
</script>

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="flex flex-row justify-between gap-1 md:gap-2">
            <CountyPicker bind:currentCountyId controlBody="scale-90" class="w-auto" />
        </div>
    </svelte:fragment>

    <svelte:fragment slot="standardBody">
        <form id="addSite" name="addSite">
            <input type="hidden" id="countyId" name="countyId" bind:value={currentCountyId} />
            <div class="max-w-[600px]">
                <div class="content">
                    <label class="label">
                        <span>Site Name:</span>
                        <input type="text" class="input" id="siteName" name="siteName" title="Site Name:" placeholder="Site name" />
                    </label>
                    <label class="label"><span>Township:</span><input type="text" class="input" id="township" name="township" title="Township:" placeholder="Township" /></label>
                    <label class="label"><span>Location Zip:</span><input type="text" class="input" id="locationZip" name="locationZip" title="Location Zip:" placeholder="Location Zip" /></label>
                    <label class="label"><span>Site Address:</span><input type="text" class="input" id="siteAddress" name="siteAddress" title="Site Address:" placeholder="Site Address" /></label>
                    <label class="label"><span>Site Address 2:</span><input type="text" class="input" id="siteAddress2" name="siteAddress2" title="Site Address 2:" placeholder="Site Address 2:" /></label>
                    <label class="label"><span>Site City State Zip:</span><input type="text" class="input" id="siteCityStateZip" name="siteCityStateZip" title="Site City State Zip:" placeholder="Site City State Zip" /></label>
                    <label class="label"><span>Person:</span><input type="text" class="input" id="person" name="person" title="Person:" placeholder="Person" /></label>
                    <label class="label"><span>Address:</span><input type="text" class="input" id="address" name="address" title="Address:" placeholder="Address" /></label>
                    <label class="label"><span>Address 2:</span><input type="text" class="input" id="address2" name="address2" title="Address 2:" placeholder="Address 2" /></label>
                    <label class="label"><span>City State Zip:</span><input type="text" class="input" id="cityStateZip" name="cityStateZip" title="City State Zip:" placeholder="City State Zip" /></label>
                    <label class="label"><span>Phone:</span><input type="text" class="input" id="phone" name="phone" title="Phone:" placeholder="Phone" /></label>
                    <label class="label"><span>Email:</span><input type="text" class="input" id="email" name="email" title="Email:" placeholder="Email" /></label>
                    <label class="label"><span>Latitude Start:</span><input type="text" class="input" id="latitudeStart" name="latitudeStart" title="Latitude Start:" placeholder="Latitude Start" /></label>
                    <label class="label"><span>Latitude End:</span><input type="text" class="input" id="latitudeEnd" name="latitudeEnd" title="Latitude End:" placeholder="Latitude End" /></label>
                    <label class="label"><span>Alt Person:</span><input type="text" class="input" id="altPerson" name="altPerson" title="Alt Person:" placeholder="Alt Person" /></label>
                    <label class="label"><span>Alt Address:</span><input type="text" class="input" id="altAddress" name="altAddress" title="Alt Address:" placeholder="Alt Address" /></label>
                    <label class="label"><span>Alt Address 2:</span><input type="text" class="input" id="altAddress2" name="altAddress2" title="Alt Address 2:" placeholder="Alt Address 2" /></label>
                    <label class="label"><span>Alt City State Zip:</span><input type="text" class="input" id="altCityStateZip" name="altCityStateZip" title="Alt City State Zip:" placeholder="Alt City State Zip" /></label>
                    <label class="label"><span>Alt Phone:</span><input type="text" class="input" id="altPhone" name="altPhone" title="Alt Phone:" placeholder="Alt Phone" /></label>
                    <label class="label"><span>Alt Email:</span><input type="text" class="input" id="altEmail" name="altEmail" title="Alt Email:" placeholder="Alt Email" /></label>
                    <label class="label"><span>Other Participants:</span><input type="text" class="input" id="otherParticipants" name="otherParticipants" title="Other Participants:" placeholder="Other Participants" /></label>
                    <label class="label"><span>description:</span><textarea class="textarea" id="description" name="description" rows="4" title="Description" placeholder="Description"></textarea></label>
                </div>
            </div>
        </form>
    </svelte:fragment>
</StandardContainer>
