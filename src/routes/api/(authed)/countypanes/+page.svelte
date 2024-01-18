<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import CCounty from '$lib/components/CCounty.svelte';
    export let data;
</script>

<StandardContainer>
    <div class="">Root page</div>
    <section>
        <!-- div class="grid grid-cols-6 content-start"-->
        <div class="flex flex-wrap gap-2">
            {#each data.counties as county}
                {#if county.sites.length > 0}
                    <CCounty {county} />
                {/if}
            {/each}
        </div>
    </section>
</StandardContainer>
