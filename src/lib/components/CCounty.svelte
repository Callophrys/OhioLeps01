<script lang="ts">
    /*-- Imports */
    import { goto } from '$app/navigation';

    /*-- -- Data -- */
    /*-- Exports */
    export let county: any;
    console.log(county);

    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
</script>

<div class="p-2 rounded-sm bg-slate-400 size-28">
    <label for={`ctyId${county.id}`} class="hover:cursor-pointer">
        <h2>{county.state.name}</h2>
        <p>{county.name}</p>
        <input id={`ctyId${county.id}`} type="button" class="btn" on:click={() => (county.sites.length === 1 ? goto(`/api/sites/${county.sites[0].siteId}`) : goto(`/api/countysites/${county.id}`))} value={`See ${county.sites.length !== 1 ? 'sites' : 'site'}`} />
    </label>
</div>
