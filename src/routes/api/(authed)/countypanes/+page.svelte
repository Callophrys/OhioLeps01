<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    import CCounty from '$lib/components/CCounty.svelte';
    let { data } = $props();
</script>

{#snippet head()}
    <div class="">Counties with monitored sites</div>
{/snippet}
{#snippet body()}
    <!-- div class="grid grid-cols-6 content-start"-->
    <div class="flex flex-wrap gap-2">
        {#each data.counties as county}
            {#if county.sites.length > 0}
                <CCounty {county} />
            {/if}
        {/each}
    </div>
{/snippet}
<Container {head} {body} tail={null} />
