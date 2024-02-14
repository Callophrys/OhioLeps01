<script lang="ts">
    import type { Region } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    export let currentRegion: Region;

    const popupRegions: PopupSettings = {
        event: 'focus-click',
        target: 'popupRegions',
        placement: 'bottom',
    };
</script>

{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2">◀</button>
    <button class="w-24" use:popup={popupRegions}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentRegion.name}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2">▶</button>
</div>

<div data-popup="popupRegions">
    <div class="card w-48 shadow-xl py-2">
        <slot />
    </div>
</div>
