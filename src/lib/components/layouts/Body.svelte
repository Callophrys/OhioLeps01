<script lang="ts">
    import type { Snippet } from 'svelte';
    let { children }: { children: Snippet } = $props();
    const cBodyClasses = 'space-y-2 h-full overflow-y-auto';
</script>

<div class={cBodyClasses}>
    {#if children()}
        {@render children()}
    {:else}
        <span>_</span>
    {/if}
</div>

<!-- {#snippet StandardBody()} {/snippet} -->
