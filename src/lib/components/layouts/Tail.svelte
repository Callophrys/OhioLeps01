<script lang="ts">
    import type { Snippet } from 'svelte';
    let { children }: { children: Snippet } = $props();
    const cTailClasses = 'pr-4';
</script>

<div class={cTailClasses}>
    {#if children()}
        {@render children()}
    {:else}
        <span>_</span>
    {/if}
</div>

<!-- {#snippet StandardTail()}{/snippet} -->
