<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    let { data } = $props();
</script>

{#snippet head()}
    <div class="bg-red">Name-Address Count: {data.nameAddresses.length}</div>
{/snippet}
{#snippet body()}
    <ul class="nameAddresses">
        {#each data.nameAddresses as nameAddress}
            <li class="nameAddress">
                <a href="javascript:void(0);" title="nameAddress.slug" class="title">{nameAddress.fullName}</a>
                <span class="bg-red-600">{nameAddress.organization ?? ''}</span>
            </li>
        {/each}
    </ul>
{/snippet}
<Container {head} {body} tail={null} />
