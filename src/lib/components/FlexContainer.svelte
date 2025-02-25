<script lang="ts">
  import { Pane, Splitpanes } from "$lib/components/splitpanes";

  let {
    outerPane,
    leftPane,
    centerPane,
    rightPane,
  }: {
    children: Snippet | null;
    children: Snippet | null;
    children: Snippet | null;
    children: Snippet | null;
  } = $props();

  const cPageContent = "flex-auto overflow-hidden";
</script>

{#if outerPane}
  {@render outerPane()}
{/if}

<Splitpanes style="height: 100%">
  {#if leftPane}
    <Pane minSize={5}>
      <main class={`${cPageContent} pl-8`}>
        {@render leftPane()}
      </main>
    </Pane>
  {/if}
  {#if centerPane}
    <Pane size={65} minSize={3}>
      <main class={`${cPageContent}`}>
        {@render centerPane()}
      </main>
    </Pane>
  {/if}
  {#if rightPane}
    <Pane minSize={3}>
      <main class={`${cPageContent} pr-8`}>
        {@render rightPane()}
      </main>
    </Pane>
  {/if}
</Splitpanes>
