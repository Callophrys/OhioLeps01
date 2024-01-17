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
                <li class="">
                    <a
                        href="/api/siteobservations/{siteObservation.siteObservationId}"
                        class="flex justify-start"
                    >
                        <!--<span>{siteObservation.siteDate?.site?.siteName}</span>
                        <span>{siteObservation.siteDate.year}</span>
                        <span>{siteObservation.siteDate.week}</span>-->
                        <span>{siteObservation.total ?? ''}</span>
                        <span>{siteObservation.checklist.scientificName}</span>
                        <span>{siteObservation.checklist.commonName}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</StandardContainer>
