<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    let { data } = $props();
</script>

{#snippet head()}
    <div><span>Name-Address Count:</span><span class="ml-2">{data.nameAddresses.length}</span></div>
{/snippet}

{#snippet body()}
    <ul class="nameAddresses">
        {#each data.nameAddresses as nameAddress}
            <li class="nameAddress flex flex-row space-x-4">
                <button title="nameAddress.slug" class="w-72 text-right">{nameAddress.fullName}</button>
                <div>{nameAddress.organization ?? ''}</div>
            </li>
        {/each}
    </ul>
{/snippet}

<Container {head} {body} tail={null} />
