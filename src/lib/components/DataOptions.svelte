<script lang="ts">
    import { page } from '$app/stores';

    export let showRecentEdits = true;
    export let showDeletedData = false;
</script>

<div class="flex flex-row space-x-2 text-sm">
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
