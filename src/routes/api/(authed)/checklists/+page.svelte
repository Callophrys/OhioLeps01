<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    let { data } = $props();
    // console.log(data);
</script>

<!-- Checklists -->
{#snippet head()}
    <div>Checklist (species) Count: {data.checklists.length}</div>
{/snippet}

{#snippet body()}
    <ul class="w-1/2 pl-4">
        {#each data.checklists as checklist}
            <li class="checklist">
                <div class="flex flex-row justify-start space-x-2">
                    <span class="basis-1/5">{checklist.hodges}</span>
                    <span class="basis-2/5">{checklist.scientificName}</span>
                    <span class="basis-2/5">{checklist.commonName ?? ''}</span>
                </div>
            </li>
        {/each}
    </ul>
{/snippet}

<Container {head} {body} tail={null} />
