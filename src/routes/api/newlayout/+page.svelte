<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
</script>

{#snippet head()}
    <div class="text-center">
        <h1>Verses for fun</h1>
    </div>
{/snippet}

{#snippet body()}
    <p>How now brown cow.</p>
    <p>The quick brown fox jumped over the lazy dog.</p>
{/snippet}

{#snippet tail()}
    <div class="text-center">
        <p>Nothing to see here.</p>
    </div>
{/snippet}

<Container {head} {body} {tail} outerBodyClasses="px-0" />
