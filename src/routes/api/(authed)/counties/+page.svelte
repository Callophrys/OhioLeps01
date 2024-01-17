<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
</script>

<!-- Counties -->
<StandardContainer>
    <div class="bg-red">
        County count: {data.counties.length}
        &nbsp;&nbsp;Counties with monitored sites: counties.filter((c) => c.isMonitored).length
    </div>
    <section>
        <ul class="countys">
            {#each data.counties as county}
                <li class="border border-solid border-slate-900 pb-1 pl-6">
                    <a href="county.slug" class="title">{county.name}, {county.state.name}</a>
                    - {county.sites.length}
                    {county.sites.length !== 1 ? 'sites' : 'site'}
                </li>
            {/each}
        </ul>
    </section>
</StandardContainer>
