<script lang="ts">
    /*-- Imports */

    /*-- -- Data -- */
    /*-- Exports */
    let {
        county = $bindable(),
        site = $bindable(),
        filterByCounty = $bindable(),
    }: {
        county: string;
        site: string;
        filterByCounty: boolean;
    } = $props();

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

<div class="flex flex-row space-x-2 text-sm fixed top-[102px] pl-10">
    <div class="flex items-center space-x-2" title="Highlight recently added/updated data">
        <label for="filterByCounty">
            <input id="filterByCounty" class="checkbox" type="checkbox" bind:checked={filterByCounty} />
            <span>Filter by county</span>
        </label>
    </div>
    <div>
        County: {county}
    </div>
    <div>
        Site: {site}
    </div>
</div>
