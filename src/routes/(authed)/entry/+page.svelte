<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
</script>

{#snippet body()}
    <div class="">
        <h1>Data Entry</h1>

        <p>this is the entry page</p>
    </div>
{/snippet}

<Container head={null} {body} tail={null} />
