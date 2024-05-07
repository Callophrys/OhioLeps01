<script lang="ts">
    let { classes = '', children }: { classes: string; children: any } = $props();
</script>

{#if children}
    <div class={classes}>
        {@render children()}
    </div>
{/if}
