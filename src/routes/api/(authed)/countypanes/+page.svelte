<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import CCounty from '$lib/components/CCounty.svelte';
    export let data;
</script>

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="">Counties with monitored sites</div>
    </svelte:fragment>

    <svelte:fragment slot="standardBody">
        <!-- div class="grid grid-cols-6 content-start"-->
        <div class="flex flex-wrap gap-2">
            {#each data.counties as county}
                {#if county.sites.length > 0}
                    <CCounty {county} />
                {/if}
            {/each}
        </div>
    </svelte:fragment>
</StandardContainer>
