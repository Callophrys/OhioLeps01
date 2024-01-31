<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
</script>

<!-- siteDateObservations -->
<StandardContainer>
    <svelte:fragment slot="standardBody">
        <div class="bg-red">SiteDateObservation Count: data.siteDateObservations.length</div>
        <section>
            <ul class="siteDateObservations">
                #each data.siteDateObservations as siteDateObservation
                <li class="">
                    <a href="javascript:void(0)" class="flex justify-start">
                        <!--<span>{siteDateObservation.siteDate?.site?.siteName}</span>
                        <span>{siteDateObservation.siteDate.year}</span>
                        <span>{siteDateObservation.siteDate.week}</span>-->
                        <span>siteDateObservation.total ?? ''</span>
                        <span>siteDateObservation.checklist.scientificName</span>
                        <span>siteDateObservation.checklist.commonName</span>
                    </a>
                </li>
                /each
            </ul>
        </section>
    </svelte:fragment>
</StandardContainer>
