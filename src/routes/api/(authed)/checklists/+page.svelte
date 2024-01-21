<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
    console.log(data);
</script>

<!-- Checklists -->
<StandardContainer>
    <div class="bg-red">Checklist (species) Count: {data.checklists.length}</div>
    <section>
        <ul class="w-1/2">
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
    </section>
</StandardContainer>
