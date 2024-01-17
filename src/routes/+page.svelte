<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { page } from '$app/stores';
</script>

<StandardContainer>
    <div class="container h-full mx-auto p-8">
        <div class="card h-full p-8 space-x-2 space-y-2">
            <a href="/api/query" class="btn variant-filled"> Search Database </a>
            {#if $page.data.user}
                <a href="/entry" class="btn variant-filled"> Enter/Update Database </a>
                {#if $page.data.user.role === 'ADMIN'}
                    <a href="/admin" class="btn variant-filled"> Administrate Database </a>
                {/if}
            {/if}
        </div>
    </div>
</StandardContainer>
