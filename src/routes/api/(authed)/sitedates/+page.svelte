<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    export let data;
    //console.log(data);
</script>

{#snippet body()}
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
{/snippet}

<Container head={null} {body} tail={null} />
