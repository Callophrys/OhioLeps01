<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
</script>

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="bg-red">Name-Address Count: {data.nameAddresses.length}</div>
    </svelte:fragment>
    <svelte:fragment slot="standardBody">
        <ul class="nameAddresses">
            {#each data.nameAddresses as nameAddress}
                <li class="nameAddress">
                    <a href="javascript:void(0);" title="nameAddress.slug" class="title">{nameAddress.fullName}</a>
                    <span class="bg-red-600">{nameAddress.organization ?? ''}</span>
                </li>
            {/each}
        </ul>
    </svelte:fragment>
</StandardContainer>
