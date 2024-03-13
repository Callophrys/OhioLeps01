<script lang="ts">
    /*-- Imports */
    import { page } from '$app/stores';

    /*-- -- Data -- */
    /*-- Exports */
    export let showRecentEdits = true;
    export let showDeletedData = false;

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
    /*-- onMount, beforeNavigate, afterNavigate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
</script>

<div class="flex flex-row space-x-2 text-sm fixed top-[134px] right-10">
    <label class="flex items-center space-x-2" title="Highlight recently added/updated data">
        <p>Recently updated</p>
        <input class="checkbox" type="checkbox" bind:checked={showRecentEdits} />
    </label>
    {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER' || $page.data.user.role === 'ENTRY')}
        <label class="flex items-center space-x-2" title="Disply deleted data">
            <p>Deleted data</p>
            <input class="checkbox" type="checkbox" bind:checked={showDeletedData} />
        </label>
    {:else}
        <label class="flex items-center space-x-2" title="Display my deleted data">
            <p>My deleted data</p>
            <input class="checkbox" type="checkbox" bind:checked={showDeletedData} />
        </label>
    {/if}
</div>
