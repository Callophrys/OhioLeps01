<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
</script>

<!-- siteObservations -->
<StandardContainer>
    <div class="bg-red">SiteObservation Count: {data.siteObservations.length}</div>
    <section>
        <ul class="siteObservations">
            {#each data.siteObservations as siteObservation}
                <li class="siteObservation">
                    <a href="siteObservation.slug" class="title">{siteObservation.idCode ?? '__'}</a
                    >
                    <span class="bg-red-600">{siteObservation.total ?? ''}</span>
                </li>
            {/each}
        </ul>
    </section>
</StandardContainer>
