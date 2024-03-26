<script lang="ts">
    /*-- Imports */

    /*-- -- Data -- */
    /*-- Exports */
    export let county: string;
    export let site: string;
    export let filterByCounty: boolean;

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
    /*-- Other */
</script>

<div class="flex flex-row space-x-2 text-sm fixed top-[134px] pl-10">
    <label class="flex items-center space-x-2" title="Highlight recently added/updated data">
        <input class="checkbox" type="checkbox" bind:checked={filterByCounty} />
        <span>Filter sites by county</span>
    </label>
    &nbsp;&nbsp;County: {county}
    &nbsp;&nbsp;Site: {site}
</div>
