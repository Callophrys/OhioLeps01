<script lang="ts">
    import { showAppBar, showFooter } from '$lib/config';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    
    const cHeadClasses: CssClasses = 'pr-4';
    const cTailClasses: CssClasses = 'pr-4';
    const cBodyClasses: CssClasses = 'space-y-2 h-full overflow-y-auto';

    // Should be 144 (with footer) or 128 but added 4px for just in case
    // Should do this for show/hide avatar and for show/hide app bar
    let heightAdjust = 4 + (showAppBar ? 132 : 0) + (showFooter ? 16 : 0);
    let configOuterBody: CssClasses = showFooter
        ? `flex flex-col space-y-2 h-[calc(100vh_-_${heightAdjust}px)] px-8 pt-8 pb-4`
        : `flex flex-col space-y-2 h-[calc(100vh_-_${heightAdjust}px)] p-8`;

    const cBaseCard: CssClasses = "card py-4 pl-4 h-full flex flex-col space-y-2";
    
    $: classesOuterBody = `${configOuterBody}`;
    
</script>

<div class={classesOuterBody}>
    <div class={cBaseCard}>
        {#if $$slots.standardHead}
        <div class={cHeadClasses}>
            <slot name="standardHead" />
        </div>
        {/if}

        <div class={cBodyClasses}>
            <slot name="standardBody" />
        </div>

        {#if $$slots.standardTail}
        <div class={cTailClasses}>
            <slot name="standardTail" />
        </div>
        {/if}
    </div>
</div>
