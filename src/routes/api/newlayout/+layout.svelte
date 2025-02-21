<script lang="ts">
    import { Pane, Splitpanes } from '$lib/components/splitpanes';
    // import { Pane, Splitpanes } from 'svelte-splitpanes';
    let { children }: { children: Snippet } = $props();
    let visibleLeft: boolean = $state(true);
    let visibleCenter: boolean = $state(true);
    let visibleRight: boolean = $state(true);
    const cPageContent = 'flex-auto overflow-hidden';
</script>

<Splitpanes style="height: 100%">
    {#if visibleLeft}
        <Pane minSize={5}>
            {@render bodyLeft()}
        </Pane>
    {/if}
    {#if visibleCenter}
        <Pane minSize={3}>
            {@render bodyCenter()}
        </Pane>
    {/if}
    {#if visibleRight}
        <Pane size={50} minSize={3}>
            {@render bodyRight()}
        </Pane>
    {/if}
</Splitpanes>

{#snippet bodyLeft()}
    <main class={`${cPageContent} pl-8`}>
        {@render children()}
    </main>
{/snippet}

{#snippet bodyCenter()}
    <main class={`${cPageContent}`}>
        {@render children()}
    </main>
{/snippet}

{#snippet bodyRight()}
    <main class={`${cPageContent} pr-8`}>
        {@render children()}
    </main>
{/snippet}
