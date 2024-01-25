<script lang="ts">
    import { showAppBar, showFooter } from '$lib/config';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    export let basisLeft = 'basis-1/2';
    export let basisRight = 'basis-1/2';
    let hAdjust = 4 + (showAppBar ? 128 : 0) + (showFooter ? 16 : 0);
    const configClass = "container flex flex-row gap-8"
    /* showFooter //should be 144 (with footer) or 128
        ? `container flex flex-row gap-8 h-[calc(100vh_-_${hAdjust}px)] px-8 pt-8 pb-4 has-footer`
        : `container flex flex-row gap-8 h-[calc(100vh_-_${hAdjust}px] p-8`;
        */

    const cBaseCards = "card py-4 pl-4 h-full flex flex-col space-y-2";
    const cBaseLeftHead = '';
    const cBaseLeftBody = 'space-y-2 h-full';
    const cBaseLeftTail = '';
    const cBaseRightHead = '';
    const cBaseRightBody = 'space-y-2 h-full';
    const cBaseRightTail = '';

    export let leftHeadClasses: CssClasses = 'pr-4';
    export let leftBodyClasses: CssClasses = 'overflow-y-auto';
    export let leftTailClasses: CssClasses = '';

    export let rightHeadClasses: CssClasses = 'pr-4';
    export let rightBodyClasses: CssClasses = 'overflow-y-auto';
    export let rightTailClasses: CssClasses = '';

    $: classesLeftCard = `${cBaseCards} ${basisLeft}`;
    $: classesRightCard = `${cBaseCards} ${basisRight}`;

    $: classesLeftHead = `${cBaseLeftHead} ${leftHeadClasses}`;
    $: classesLeftBody = `${cBaseLeftBody} ${leftBodyClasses}`;
    $: classesLeftTail = `${cBaseLeftTail} ${leftTailClasses}`;

    $: classesRightHead = `${cBaseRightHead} ${rightHeadClasses}`;
    $: classesRightBody = `${cBaseRightBody} ${rightBodyClasses}`;
    $: classesRightTail = `${cBaseRightTail} ${rightTailClasses}`;
</script>

<div class={configClass}>
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
    @apply px-8 pt-8 pb-4;
    height: calc(100vh - 144px);
}
.container {
    @apply p-8;
    height: calc(100vh - 128px);
}
</style>
