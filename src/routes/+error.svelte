<script>
    import Container from '$lib/components/layouts/Container.svelte';
    import { page } from '$app/stores';
</script>

{#snippet body()}
    <div class="error h-full grid place-content-center">
        <h1>{$page.status}: {$page.error?.message}</h1>
        <p>Uh oh...</p>
    </div>
{/snippet}

<Container head={null} {body} tail={null} />

