<script lang="ts">
    /*-- Imports */
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { showAppBar, showFooter } from '$lib/config';

    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    /*-- Constants (styles) */
    const cBaseCard: CssClasses = 'card py-4 pl-4 h-full w-full flex flex-col space-y-2';
    const cOuterBodyFooter = 'container flex flex-row gap-8 px-8 pt-8 pb-4 has-footer';
    const cOuterBodyNoFooter = 'container flex flex-row gap-8 p-8';
    const cHeadClasses: CssClasses = 'pr-4';
    const cTailClasses: CssClasses = 'pr-4';
    const cBodyClasses: CssClasses = 'space-y-2 h-full overflow-y-auto';

    /*-- Properties (styles) */
    // Should be 144 (with footer) or 128 but added 4px for just in case
    // Should do this for show/hide avatar and for show/hide app bar
    //let heightAdjust = 4 + (showAppBar ? 132 : 0) + (showFooter ? 16 : 0);
    let configOuterBody: CssClasses = showFooter ? cOuterBodyFooter : cOuterBodyNoFooter;

    /*-- Reactives (styles) */
    $: classesOuterBody = `${configOuterBody}`;

    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
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

<style>
    /* Calc and 100vh do not work as an
     * arbitrary valued Tailwind class.
     * Calc and 100% does work */
    .container.has-footer {
        height: calc(100vh - 6rem);
    }
    .container {
        height: calc(100vh - 7rem);
    }
</style>
