<script lang="ts">
    import { Pane, Splitpanes } from '$lib/components/splitpanes';

    let {
        childrenOuter,
        childrenLeft,
        childrenCenter,
        childrenRight,
    }: {
        children: Snippet;
        children: Snippet;
        children: Snippet;
        children: Snippet;
    } = $props();

    const cPageContent = 'flex-auto overflow-hidden';
</script>

{@render childrenOuter()}

<Splitpanes style="height: 100%">
    <Pane minSize={5}>
        <main class={`${cPageContent} pl-8`}>
            {@render childrenLeft()}
        </main>
    </Pane>
    <Pane size={65} minSize={3}>
        <main class={`${cPageContent}`}>
            {@render childrenCenter()}
        </main>
    </Pane>
    <!-- <Pane minSize={3}> -->
    <!--     <main class={`${cPageContent} pr-8`}> -->
    <!--         {@render childrenRight()} -->
    <!--     </main> -->
    <!-- </Pane> -->
</Splitpanes>
