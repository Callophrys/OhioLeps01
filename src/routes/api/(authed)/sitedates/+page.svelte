<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { formatDate } from '$lib/utils';
    export let data;
</script>

<!-- siteDates -->
<StandardContainer>
    <div class="">SiteDate Count: {data.siteDates.length}</div>
    <section>
        <ul>
            {#each data.siteDates as siteDate}
                <li class="flex">
                    <div class="w-56">{siteDate.site?.siteName}</div>
                    <div class="w-20">Year {siteDate.year}</div>
                    <div class="w-20">Week {siteDate.week}</div>
                    <div class="w-36">
                        {siteDate.recordDate ? formatDate(siteDate.recordDate.toString()) : ''}
                    </div>
                    <div class="w-48">{siteDate.recorder}</div>
                </li>
            {/each}
        </ul>
    </section>
</StandardContainer>
