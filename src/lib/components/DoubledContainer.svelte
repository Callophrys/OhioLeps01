<!--
    See: 
    https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/components/AppShell/AppShell.svelte
-->
<script lang="ts">
    import { showAppBar, showFooter } from '$lib/config';
    import type { CssClasses } from '@skeletonlabs/skeleton';

    export let basisLeft = 'basis-1/2';
    export let basisRight = 'basis-1/2';

    // Should be 144 (with footer) or 128 but added 4px for just in case
    // Should do this for show/hide avatar and for show/hide app bar
    let heightAdjust = 4 + (showAppBar ? 132 : 0) + (showFooter ? 16 : 0);
    let configOuterBody: CssClasses = showFooter
        ? `container flex flex-row gap-8 px-8 pt-8 pb-4 has-footer`
        : `container flex flex-row gap-8 p-8`;
    /*
    const configOuterBody = "container flex flex-row gap-8"
    */

    const cBaseCard = 'card py-4 pl-4 h-full flex flex-col space-y-2';
    //const cBaseLeftHead = '';
    const cBaseLeftBody = 'space-y-2 h-full';
    //const cBaseLeftTail = '';
    //const cBaseRightHead = '';
    const cBaseRightBody = 'space-y-2 h-full';
    //const cBaseRightTail = '';

    export let leftHeadClasses: CssClasses = 'pr-4';
    export let leftBodyClasses: CssClasses = 'overflow-y-auto';
    export let leftTailClasses: CssClasses = '';

    export let rightHeadClasses: CssClasses = 'pr-4';
    export let rightBodyClasses: CssClasses = 'overflow-y-auto';
    export let rightTailClasses: CssClasses = '';

    $: classesOuterBody = `${configOuterBody}`;

    $: classesLeftCard = `${cBaseCard} ${basisLeft}`;
    $: classesRightCard = `${cBaseCard} ${basisRight}`;

    $: classesLeftHead = `${leftHeadClasses}`;
    $: classesLeftBody = `${cBaseLeftBody} ${leftBodyClasses}`;
    $: classesLeftTail = `${leftTailClasses}`;

    $: classesRightHead = `${rightHeadClasses}`;
    $: classesRightBody = `${cBaseRightBody} ${rightBodyClasses}`;
    $: classesRightTail = `${rightTailClasses}`;
</script>

<div class={classesOuterBody}>
    <div class={classesLeftCard}>
        {#if $$slots.leftHead}
            <div class={classesLeftHead}>
                <slot name="leftHead" />
            </div>
        {/if}

        <div class={classesLeftBody}>
            <slot name="leftBody" />
        </div>

        {#if $$slots.leftTail}
            <div class={classesLeftTail}>
                <slot name="leftTail" />
            </div>
        {/if}
    </div>

    <div class={classesRightCard}>
        {#if $$slots.rightHead}
            <div class={classesRightHead}>
                <slot name="rightHead" />
            </div>
        {/if}

        <div class={classesRightBody}>
            <slot name="rightBody" />
        </div>

        {#if $$slots.rightTail}
            <div class={classesRightTail}>
                <slot name="rightTail" />
            </div>
        {/if}
    </div>
</div>

<!--
    the h and calc works in StandardContainer, but had to do below to make work
    - might be a thunderbird thing
-->
<style>
    .container.has-footer {
        height: calc(100vh - 144px);
    }
    .container {
        height: calc(100vh - 128px);
    }
</style>
