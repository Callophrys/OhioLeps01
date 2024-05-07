<script lang="ts">
    import type { Snippet } from 'svelte';
    let { children }: { children: Snippet } = $props();
    const cHeadClasses = 'pr-4';
</script>

<div class={cHeadClasses}>
    {#if children()}
        {@render children()}
    {:else}
        <span>_</span>
    {/if}
</div>

<!-- {#snippet StandardHead()}{/snippet} -->
