<script>
    let { children } = $props();
</script>

{#if children}
    {@render children()}
{/if}
