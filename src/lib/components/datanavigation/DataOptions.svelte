<script lang="ts">
    /*-- Imports */
    import { ROLE } from '$lib/types';
    import { page } from '$app/stores';

    /*-- -- Data -- */
    /*-- Exports */
    let {
        showMultipleRows = $bindable(false),
        showRecentEdits = $bindable(false),
        showDeletedData = $bindable(false),
        showMyDataOnly = $bindable(false),
        showUnreviewedOnly = $bindable(false),
        isEditing = $bindable(false),
    }: {
        showMultipleRows: boolean;
        showRecentEdits: boolean;
        showDeletedData: boolean;
        showMyDataOnly: boolean;
        showUnreviewedOnly: boolean;
        isEditing: boolean;
    } = $props();

    const cLabel = 'flex items-center space-x-2';
    let cControlDisabled = $derived(isEditing ? 'hover:cursor-not-allowed opacity-30' : '');
    let cCheckboxClasses = $derived(`checkbox ${isEditing ? cControlDisabled : ''}`);

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

<div class="flex flex-row space-x-2 text-sm fixed top-[102px] right-10">
    <!-- Single or multiple -->
    <label class={cLabel} title="Toggle between single or mutilple rows for viewing or editing">
        <!-- TODO Make label message toggle and convert checkbox to toggle switch -->
        <span class={cControlDisabled}>View Multiple</span>
        <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showMultipleRows} />
    </label>
    {#if $page.data?.user}
        <!-- Highlight recent created, edited and reviewed data (and deletes if option to show is on) -->
        <label class={cLabel} title="Highlight recently added/updated data">
            <span class={cControlDisabled}>Highlight Recent</span>
            <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showRecentEdits} />
        </label>
        <!-- Filter for only data only -->
        {#if $page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN || $page.data.user.role === ROLE.REVIEWER}
            <label class={cLabel} title="Display only records that I created, edited or reviewed">
                <span class={cControlDisabled}>My Data</span>
                <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showMyDataOnly} />
            </label>
        {:else if $page.data.user.role === ROLE.ENTRY}
            <label class={cLabel} title="Display only records that I created or edited">
                <span class={cControlDisabled}>My Data</span>
                <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showMyDataOnly} />
            </label>
        {/if}
        <!-- Filter for unreviewed -->
        {#if $page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN || $page.data.user.role === ROLE.REVIEWER}
            <label class={cLabel} title="Display unreviewed data only">
                <span class={cControlDisabled}>Unreviewed</span>
                <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showUnreviewedOnly} />
            </label>
        {/if}
        <!-- Show deleted -->
        {#if $page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN || $page.data.user.role === ROLE.REVIEWER}
            <label class={cLabel} title="Display deleted data">
                <span class={cControlDisabled}>Show Deleted</span>
                <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showDeletedData} />
            </label>
        {:else if $page.data.user.role === ROLE.ENTRY}
            <label class={cLabel} title="Display my deleted data">
                <span class={cControlDisabled}>My Deleted</span>
                <input class={cCheckboxClasses} type="checkbox" disabled={isEditing} bind:checked={showDeletedData} />
            </label>
        {/if}
    {/if}
</div>
