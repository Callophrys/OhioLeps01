<script lang="ts">
    /*-- Imports */
    import { page } from '$app/stores';
    import AppConfigControl from '../AppConfigControl.svelte';
    import CCounty from '../CCounty.svelte';

    /*-- -- Data -- */
    /*-- Exports */
    let {
        showMultipleRows = $bindable(false),
        showMultipleRowsDisabled = $bindable(false),
        showRecentEdits = $bindable(false),
        showDeletedData = $bindable(false),
    }: {
        showMultipleRows: boolean;
        showMultipleRowsDisabled: boolean;
        showRecentEdits: boolean;
        showDeletedData: boolean;
    } = $props();

    // TODO: Implement swapping for Hodges, P3, and phylogenic identifiers
    // export let showHodges: boolean = true;
    // export let showP3: boolean = true;

    let cLabel = 'flex items-center space-x-2';

    let cControlDisabled = $derived(showMultipleRowsDisabled ? ' hover:cursor-not-allowed opacity-30' : '');
    let cCheckboxMultiple = $derived(`checkbox${showMultipleRowsDisabled ? cControlDisabled : ''}`);

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

<div class="flex flex-row space-x-2 text-sm fixed top-[134px] right-10">
    <!-- <label class={cLabel} title="Highlight recently added/updated data"> -->
    <!--     <p>Show Hodges</p> -->
    <!--     <input class="checkbox" type="checkbox" bind:checked={showHodges} /> -->
    <!-- </label> -->
    <!-- <label class={cLabel} title="Highlight recently added/updated data"> -->
    <!--     <p>Show P3</p> -->
    <!--     <input class="checkbox" type="checkbox" bind:checked={showP3} /> -->
    <!-- </label> -->
    <label class={cLabel} title="Toggle between single or mutilple rows for viewing or editing">
        <!-- TODO Make label message toggle and convert checkbox to toggle switch -->
        <span class={cControlDisabled}>View Multiple/Single</span>
        <input class={cCheckboxMultiple} type="checkbox" disabled={showMultipleRowsDisabled} bind:checked={showMultipleRows} />
    </label>
    <label class={cLabel} title="Highlight recently added/updated data">
        <span>Recently updated</span>
        <input class="checkbox" type="checkbox" bind:checked={showRecentEdits} />
    </label>
    {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER' || $page.data.user.role === 'ENTRY')}
        <label class={cLabel} title="Display deleted data">
            <span>Deleted data</span>
            <input class="checkbox" type="checkbox" bind:checked={showDeletedData} />
        </label>
    {:else}<!-- TODO: Show my deleted (or other actioned on) data is not supported at this time; Roadmapped; -->
        <label class={cLabel} title="Display my deleted data">
            <span>My deleted data</span>
            <input class="checkbox" type="checkbox" bind:checked={showDeletedData} />
        </label>
    {/if}
</div>
