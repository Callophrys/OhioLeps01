<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    import { page } from '$app/stores';
</script>

{#snippet body()}
    <div class="mx-auto p-8">
        <div class="card p-8 space-x-2 space-y-2">
            <a href="/api/query" class="btn variant-filled"> Search Database </a>
            {#if $page.data.user}
                <a href="/entry" class="btn variant-filled"> Reports and lists </a>
                {#if $page.data.user.role === 'ADMIN' || $page.data.user.role === 'SUPER'}
                    <a href="/admin" class="btn variant-filled"> Administrate Database </a>
                {/if}
            {/if}
        </div>
    </div>
{/snippet}

<Container head={null} {body} tail={null} />
