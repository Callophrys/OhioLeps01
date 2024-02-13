<script lang="ts">
    import type { County } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    export let currentCounty: County;

    const popupCounties: PopupSettings = {
        event: 'focus-click',
        target: 'popupCounties',
        placement: 'bottom',
    };
</script>

{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2">◀</button>
    <button class="min-w-24 max-w-36" use:popup={popupCounties}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentCounty.name}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2">▶</button>
</div>

<div data-popup="popupCounties">
    <div class="card w-48 shadow-xl py-2">
        <div class="content-center flex justify-between px-2 pb-1">
            <div class="pl-2">Monitored Only</div>
            <!-- toggle hide instead of show -->
            <SlideToggle name="medium" size="sm" />
        </div>

        <hr />

        <slot />
    </div>
</div>
