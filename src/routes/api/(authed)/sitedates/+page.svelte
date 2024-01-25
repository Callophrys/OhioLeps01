<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
    console.log(data);
</script>

<StandardContainer>
	<svelte:fragment slot="standardContent">
    {#each data.siteDates as siteDate}
        <div>
            <div>
                recordDate: {siteDate.recordDate}
            </div>
            <div>
                year: {siteDate.year}&nbsp;&nbsp;week: {siteDate.week}
            </div>
            <div>
                recorder: {siteDate.recorder}
            </div>
        </div>
    {/each}
    </svelte:fragment>
</StandardContainer>
