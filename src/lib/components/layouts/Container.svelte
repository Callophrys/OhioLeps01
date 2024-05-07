<script lang="ts">
    import type { Snippet } from 'svelte';
    import Head from './Head.svelte';
    import Body from './Body.svelte';
    import Tail from './Tail.svelte';

    const cOuterBody = 'container flex flex-row gap-8 p-8';
    const cBaseCard = 'card py-4 pl-4 h-full w-full flex flex-col space-y-2';

    let { head, body, tail }: { head: Snippet; body: Snippet; tail: Snippet } = $props();
</script>

{#snippet Container(head, body, tail)}
    <div class={cOuterBody}>
        <div class={cBaseCard}>
            <!-- <Head>
                {@render head()}
            </Head> -->
            <Body>
                {@render body()}
            </Body>
            <!-- <Tail>
                {@render tail()}
            </Tail> -->
        </div>
    </div>
{/snippet}
