<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import CCounty from '$lib/components/CCounty.svelte';
    export let data;
</script>

<StandardContainer>
    <div class="bg-red">Root page</div>
    <section>
        <div
            class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4"
            style="background-color: coral"
        >
            {#each data.counties as county}
                {#if county.sites.length > 0}
                    <CCounty {county} />
                {/if}
            {/each}
        </div>
    </section>
</StandardContainer>
