<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
</script>

{#snippet body()}
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
{/snippet}

<Container head={null} {body} bodyClasses={null} tail={null} />
